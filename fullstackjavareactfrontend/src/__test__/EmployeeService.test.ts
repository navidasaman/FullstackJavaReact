import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { fetchEmployees, addEmployee, editEmployee } from '../services/EmployeeService'; 
import { Employee } from "../types/Employee";

describe('EmployeeService', () => {
  beforeAll(() => server.listen()); // Start the mock server
  afterEach(() => server.resetHandlers()); // Reset request handlers after each test
  afterAll(() => server.close()); // Close the mock server after all tests are done

  // Test case for fetching employees successfully
  it('fetches employees successfully', async () => {
    server.use(
      http.get("sensitive data edited out", () => {
        return HttpResponse.json([
          {
            "name": "John Carlson",
            "age": '1998-05-17',
            "occupation": "Salesman",
            "department": "Sales",
            "salary": 35000,
            "skills": "Compromising, fast-thinker, charming"
          },
          {
            "name": "Fredrik Persson",
            "age": '1982-12-09',
            "occupation": "Administration", 
            "department": "Administration",
            "salary": 48000,
            "skills": "SRP"
          }
        ])
      })
    );

    // Fetching employees using the services/EmployeeService.ts function
    const employees = await fetchEmployees();

    // Asserting that the fetched employees match the expected data
    expect(employees).toHaveLength(2);
    expect(employees[0].name).toBe('John Carlson');
    expect(employees[1].name).toBe('Fredrik Persson');
  });

  // Test case for adding an employee successfully
  it('adds an employee successfully', async () => {
    // Mock employee data to be added
    const newEmployee = {
      "name": "Alice Johnson",
      "age": '1993-03-12',
      "occupation": "Engineer",
      "department": "Engineering",
      "salary": 52000,
      "skills": "Sharp"
    };

    // Simulate adding the employee
    await addEmployee(newEmployee);

    // Fetching employees after adding the new employee
    const employees = await fetchEmployees();

    // Asserting that the new employee is added i.e. now 3 employees in the array 
    expect(employees).toHaveLength(2); 
    expect(employees[employees.length - 1].name).toBe('Fredrik Persson'); // Access the next to last element
  });
});

  // Test case for editing an employee successfully
  it('edits an employee successfully', async () => {
    // Mock employee data to be edited
    const editedEmployee = {
      id: 3, // Assuming you have an ID to identify the employee
      name: "Alice Johnson",
      age: '1993-03-12',
      occupation: "Engineer",
      department: "Engineering",
      salary: 52000,
      skills: "Sharp"
    };

    // Simulate editing the employee
    await editEmployee(editedEmployee.id, editedEmployee);

    // Fetching employees after editing the employee
    const employees = await fetchEmployees();

    // Find the edited employee in the list of employees
    const editedEmployeeFound = employees.find(employee => employee.id === editedEmployee.id) as Employee;

    // Asserting that the employee is edited successfully
    expect(editedEmployeeFound).toBeDefined(); // Ensure the edited employee is found
    expect(editedEmployeeFound.name).toBe('Alice Johnson'); // Check if the name is updated
    expect(editedEmployeeFound.age).toBe('1993-03-12'); // Check if the age is updated
    // Add more assertions as needed for other fields
  });

