// src/mocks/handlers.ts
// mock request handlers for the API endpoints defining how the mock server should respond to incoming HTTP requests.
import { http, HttpResponse } from 'msw'

const API_URL = process.env.REACT_APP_API_URL;

export const handlers = [
  // Handler for fetching employee data
  http.get(`${API_URL}/employees/get`, () => {
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
  }),
]