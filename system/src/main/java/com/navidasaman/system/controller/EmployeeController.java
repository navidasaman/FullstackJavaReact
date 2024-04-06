package com.navidasaman.system.controller;

import com.navidasaman.system.exception.EmployeeErrorResponse;
import com.navidasaman.system.exception.EmployeeNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navidasaman.system.model.Employee;
import com.navidasaman.system.service.EmployeeService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired; // To be able to automaitaclly inject
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;

// To be able to get the response body and controller at the same time the class will be handling HTTP requests returning as json-data
@RestController

// To create a path
@RequestMapping("/employees")

// CORS
@CrossOrigin

//Controller is for mapping all HTTP parameters such as get/post etc whatever the cloud operation requires
public class EmployeeController {
	
	// injects the Employee service
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/add")
	public ResponseEntity<?>  add(@RequestBody Employee employee) {
		employeeService.insertEmployee(employee);
        return ResponseEntity.ok().body(Map.of("message", "Employee successfully added to database"));
	}
	
	@GetMapping("/get")
	public List<Employee> retrieveEmployees() {
		return employeeService.retrieveEmployees();
	}
	
    @GetMapping("/search/{name}")
    public List<Employee> searchEmployees(@PathVariable String name) {
        return employeeService.searchEmployees(name);
    }
	
	@PutMapping("/put/{id}")
    public ResponseEntity<?> editEmployee(@PathVariable Long id, @RequestBody Employee employeeData) {
        Employee employee = employeeService.getEmployeeId(id);

        if (employee != null) {
            // Update the employee data
            employee.setName(employeeData.getName());
            employee.setAge(employeeData.getAge());
            employee.setDepartment(employeeData.getDepartment());
            employee.setSalary(employeeData.getSalary());
            employee.setOccupation(employeeData.getOccupation());
            employee.setSkills(employeeData.getSkills());

            // Save the updated employee
            employeeService.insertEmployee(employee);
            // Return JSON when a user is succesfully updated
            return ResponseEntity.ok().body(Map.of("message", "Employee data updated successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Employee not found"));
        }
    }

	 @DeleteMapping("/delete/{id}")
	 public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
	        Employee employee = employeeService.getEmployeeId(id);
	        if (employee != null) {
	            employeeService.deleteEmployee(id);
	            return ResponseEntity.ok().body(Map.of("message", "Employee successfully deleted"));
	        } else {
	            return ResponseEntity.badRequest().body(Map.of("message", "Employee not found"));
	        }
	    }
}
