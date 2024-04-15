package com.navidasaman.system.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.navidasaman.system.model.Employee;
import com.navidasaman.system.repository.EmployeeRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class EmployeeServiceTest {
    // Mocking the dependency
    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImplementation employeeService; 

    // Initilize mocks before the test
    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Retrieve employees test
    @Test
    public void testGetAllEmployees() {
        LocalDate dateOfBirth = LocalDate.of(1990, 9, 22);

        // Mock the behavior of the employeeRepository
        Employee employee1 = new Employee(1L, "John Doe", dateOfBirth, "Engineer", "Engineering", 45000, "Problem solving");
        Employee employee2 = new Employee(2L, "Jane Smith", dateOfBirth, "Developer", "IT", 40000, "Java");
        List<Employee> mockEmployees = Arrays.asList(employee1, employee2);

        when(employeeRepository.findAll()).thenReturn(mockEmployees);

        // Call the method under test
        List<Employee> result = employeeRepository.findAll();

        // Verify the result
        assertEquals(2, result.size());
        assertEquals("John Doe", result.get(0).getName());
        assertEquals("Jane Smith", result.get(1).getName());

        // Print out the mock employee data
        System.out.println("Mock Employee Data:");
        for (Employee employee : result) {
            System.out.println(employee);
        }
    }

    // Add employee test
    @Test
    public void testAddEmployee() {
        LocalDate DOB = LocalDate.of(1993, 5, 4);

        // Create a mock employee
        Employee newEmployee = new Employee(3L, "Pablo", DOB, "UX-Designer", "IT", 50000, "Figma");

        // Mock the behavior of the repository when saving the employee
        when(employeeRepository.save(any(Employee.class))).thenReturn(newEmployee);

        // Call the method under test to add the employee
        Employee savedEmployee = employeeService.insertEmployee(newEmployee);

        // Verify that the employee was added correctly
        assertEquals("Pablo", savedEmployee.getName());
        
        // Print out the employee
        System.out.println(savedEmployee);
    }

    // Edit employee test
    @Test
    public void testEditEmployee() {
        // Create a mock employee
        Employee originalEmployee = new Employee(4L, "Unedited Employee", LocalDate.of(1990, 1, 1), "Occupation", "Department", 50000, "Skills");

        // Print out the original unedited employee details
        System.out.println("Unedited employee data:");
        System.out.println(originalEmployee + "\n");

        // Mock the behavior of the repository when finding an employee by ID
        when(employeeRepository.findById(anyLong())).thenReturn(Optional.of(originalEmployee));

        // Define the updated details for the employee
        Employee updatedEmployeeData = new Employee(4L, "Edited Employee", LocalDate.of(1993, 6, 12), "Another occupation", "Another Department", 70000, "Other Skills");

        // Mock the behavior of the repository when saving the updated employee
        when(employeeRepository.save(any(Employee.class))).thenReturn(updatedEmployeeData);

        // Call the method under test to edit the employee
        Employee editedEmployee = employeeService.editEmployee(4L, updatedEmployeeData);

        // Verify that the employee was edited correctly
        assertEquals("Edited Employee", editedEmployee.getName());
        assertEquals(LocalDate.of(1993, 6, 12), editedEmployee.getAge());
        assertEquals("Another occupation", editedEmployee.getOccupation());
        assertEquals("Another Department", editedEmployee.getDepartment());
        assertEquals(70000, editedEmployee.getSalary());
        assertEquals("Other Skills", editedEmployee.getSkills());

        // Print out the edited employee data
        System.out.println("Edited Employee Data:");
        System.out.println(editedEmployee);
    }
}