import { http, HttpResponse } from 'msw';

const API_URL = process.env.REACT_APP_API_URL;

export const handlers = [
  // Handler for fetching employee data
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
        "occupation": "Administrator",
        "department": "Administration",
        "salary": 48000,
        "skills": "SRP"
      }
    ]);
  }),

  // Handler for adding an employee
  http.post("sensitive data edited out", ({ request }) => {
    const newEmployee = request.body; // Get the new employee data from the request body
    // Assuming a successful addition, return a 200 status code and the added employee data
    return new Response(JSON.stringify(newEmployee), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })
];
