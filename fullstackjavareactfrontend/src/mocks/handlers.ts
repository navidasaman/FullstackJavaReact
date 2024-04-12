import { http, HttpResponse, ResponseResolver  } from 'msw';

const API_URL = process.env.REACT_APP_API_URL;

export const handlers = [
  // Handler for fetching employee data
  http.get("edited out sensitive data", () => {
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
  http.post("edited out sensitive data", ({ request }) => {
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

// Handler for editing an employee
http.put(`edited out sensitive data/:id`, ({ request, params }) => {
  const { id } = params; // Extract the employee ID from the request parameters
  const editedEmployee = request.body; // Get the edited employee data from the request body

  // Assuming the employee is found and updated successfully
  const editedEmployeeFound = {
    "id": id,
    ...editedEmployee,
  };

  return new Response(JSON.stringify(editedEmployeeFound), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
})

http.get(`edited out sensitive data/:id`, ({ request, params }) => {
  const { name } = params;
  // Mocked employee data (assuming we have a single employee for simplicity)
  const employees = [
    {
      id: 3,
      name: "Alice Johnson",
      age: '1993-03-12',
      occupation: "Engineer",
      department: "Engineering",
      salary: 52000,
      skills: "Sharp"
    }
  ];

  // Filter employees by name
  const foundEmployees = employees.filter(employee => employee.name === name);

  return new Response(JSON.stringify(foundEmployees), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });


})
