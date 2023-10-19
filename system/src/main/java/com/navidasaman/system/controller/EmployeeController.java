package com.navidasaman.system.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navidasaman.system.model.Employee;
import com.navidasaman.system.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired; // To be able to automaitaclly inject

// To be able to get the response body and controller at the same time the class will be handling HTTP requests returning as json-data
@RestController

// To create a path
@RequestMapping("/employee")

//Controller is for mapping all HTTP parameters such as get/post etc whatever the cloud operation requires
public class EmployeeController {
	
	// injects the Employee service
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/add")
	public String add(@RequestBody Employee employee) {
		employeeService.insertEmployee(employee);
		return "Employee successfully added to database";
	}
	

}
