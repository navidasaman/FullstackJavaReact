package com.navidasaman.system.service;

import java.util.List;

import com.navidasaman.system.model.Employee;

public interface EmployeeService {
	// Takes an "Employee" object as a parameter to further be able to save the "employee" object into a database.
	public Employee insertEmployee(Employee employee);
	
	// To list all employees from list
	public List<Employee> retrieveEmployees();
}
