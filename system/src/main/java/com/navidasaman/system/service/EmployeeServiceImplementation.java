package com.navidasaman.system.service;

import java.util.List;
import java.util.Optional;

import com.navidasaman.system.exception.EmployeeNotFoundException;
import org.springframework.stereotype.Service;

import com.navidasaman.system.model.Employee;
import com.navidasaman.system.repository.EmployeeRepository;

// Class EmployeeServiceImplementation implements the interface named EmployeeService and annoted with that it is a Service
@Service 
public class EmployeeServiceImplementation implements EmployeeService {
    // will inject the employeerepository into our service class
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImplementation(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
	
	// To override the method from the interface
	@Override
	// Takes an "Employee" object as a parameter and uses the "employeeRepository" to save the "employee" object to a database and returns the saved "Employee" object
	public Employee insertEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	
	// Finds the list of all employees in the registry database
	@Override
	public List<Employee> retrieveEmployees() {
		return employeeRepository.findAll();
	}

    @Override
    public Employee getEmployeeId(Long id) {
        // Implementation to retrieve employee by ID from the database
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        return employeeOptional.orElse(null);
    }
    
    // To delete employee by their ID
    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Employee> searchEmployees(String name) {
        if(employeeRepository.findByName(name).isEmpty()) {
            throw new EmployeeNotFoundException("Employee not found with name: " + name);
        }
        return employeeRepository.findByName(name);
    }

    // Method to edit an employee's details in the database
    @Override
    public Employee editEmployee(Long id, Employee updatedEmployeeData) {
        // Retrieve the employee from the database
        Employee employeeToUpdate = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with ID: " + id));

        // Update the employee's details
        employeeToUpdate.setName(updatedEmployeeData.getName());
        employeeToUpdate.setAge(updatedEmployeeData.getAge());
        employeeToUpdate.setOccupation(updatedEmployeeData.getOccupation());
        employeeToUpdate.setDepartment(updatedEmployeeData.getDepartment());
        employeeToUpdate.setSalary(updatedEmployeeData.getSalary());
        employeeToUpdate.setSkills(updatedEmployeeData.getSkills());

        // Save the updated employee to the database
        return employeeRepository.save(employeeToUpdate);
    }
}
