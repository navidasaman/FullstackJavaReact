package com.navidasaman.system.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

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
}