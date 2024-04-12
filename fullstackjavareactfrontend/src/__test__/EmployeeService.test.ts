import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { fetchEmployees, addEmployee } from '../services/EmployeeService'; // Assuming there's an addEmployee function

describe('EmployeeService', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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
