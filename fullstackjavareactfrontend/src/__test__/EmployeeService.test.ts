import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { fetchEmployees } from '../services/EmployeeService';

const API_URL = process.env.REACT_APP_API_URL || "sensitive data edited out";

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
            "occupation": "Admnin",
            "department": "Admin",
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
});