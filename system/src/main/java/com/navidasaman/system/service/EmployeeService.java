package com.navidasaman.system.service;

import com.navidasaman.system.model.Employee;

public interface EmployeeService {
	// Takes an "Employee" object as a parameter to further be able to save the "employee" object into a database.
	public Employee insertEmployee(Employee employee);
}
