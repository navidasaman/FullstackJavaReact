package com.navidasaman.system.service;

import java.util.List;

import com.navidasaman.system.model.Employee;
import com.navidasaman.system.repository.EmployeeRepository;

public interface EmployeeService {
	public static final EmployeeRepository employeeRepository = null;

	// Takes an "Employee" object as a parameter to further be able to save the "employee" object into a database.
	public Employee insertEmployee(Employee employee);
	
	// To list all employees from list
	public List<Employee> retrieveEmployees();
	
	// To edit employees
    public Employee getEmployeeId(Long id);
    
    // To delete an employee by ID
    public void deleteEmployee(Long id);
    
    // To search for employees
	public List<Employee> searchEmployees(String name);

}
