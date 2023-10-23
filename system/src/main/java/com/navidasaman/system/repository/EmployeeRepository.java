package com.navidasaman.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository; // allows common database operations on the Employee entity working together with JPA java resistance (see Employee.java in model).
import org.springframework.stereotype.Repository; // To implement data, access logic and interact with the database, for injections.

import com.navidasaman.system.model.Employee; // To import employee from model 

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> { // Employee from .model and primary key type which is a Long (id)

	List<Employee> findByName(String name); 

}
