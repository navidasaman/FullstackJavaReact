package com.navidasaman.system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; // To be able to automaitaclly inject
import org.springframework.stereotype.Service;

import com.navidasaman.system.model.Employee;
import com.navidasaman.system.repository.EmployeeRepository;

// Class EmployeeServiceImplementation implements the interface named EmployeeService and annoted with that it is a Service
@Service 
public class EmployeeServiceImplementation implements EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepository;
	
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
}
