import { Employee } from "../types/Employee";

const API_URL = process.env.REACT_APP_API_URL;

export const addEmployee = async (employee: Partial<Employee>) => {
  const response = await fetch("sensitive data edited out", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Error adding employee");
  }
  return await response.json();
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch("sensitive data edited out", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch employees.");
  }
  const result = await response.json(); 
  return result;
};

export const deleteEmployee = async (id: number) => {
  const response = await fetch(`${API_URL}/employees/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error deleting employee with ID ${id}`);
  }
};

export const editEmployee = async (id: number, employee: Partial<Employee>) => {
  const response = await fetch(`${API_URL}/employees/put/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });

  console.log(response.status);
  if (!response.ok) {
    throw new Error(`Error editing employee with ID ${id}`);
  }
  return await response.json();
};

export const searchEmployee = async (
  searchTerm: string,
): Promise<Employee[]> => {
  if (!searchTerm.trim()) {
    throw new Error("Search term is required.");
  }
  const response = await fetch(
    `${API_URL}/employees/search/${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to search employees.");
  }
  return response.json();
};
