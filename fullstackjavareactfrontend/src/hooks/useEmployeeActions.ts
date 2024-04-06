// Hook files is meant for logic and state handling
import { useState, useEffect } from "react";
import { Employee } from "../types/Employee";
import { addEmployee, fetchEmployees, deleteEmployee, editEmployee, searchEmployee } from "../services/EmployeeService";

const useEmployeeActions = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // states for form inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState<number | undefined>(undefined);
  const [skills, setSkills] = useState("");

  // States for modal and current employee
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      console.log("Employee successfully deleted!");
      setEmployees(employees.filter((employee) => employee.id !== id));
      setFilteredEmployees(
        filteredEmployees.filter(
          (filteredEmployee) => filteredEmployee.id !== id,
        ),
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchEmployees();
      setEmployees(result);
    };
    fetchData();
  }, []);

  const handleEdit = async (editedEmployee: Employee) => {
    setShowModal(true);
    console.log(
      "Attempting to edit employee with ID and data:",
      editedEmployee.id,
      editedEmployee,
    );

    try {
      await editEmployee(editedEmployee.id, editedEmployee);
      console.log("Employee successfully edited:", editedEmployee.id);
      const updatedEmployees = await fetchEmployees();
      setEmployees(updatedEmployees);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating employee:", editedEmployee.id, error);
      // window.location.reload();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Please enter a full name.");
      return;
    }

    try {
      const data = await searchEmployee(searchTerm);
      setFilteredEmployees(data);
      if (data.length === 0) {
        alert("No employees found with this name.");
      }
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (salary) {
      const newEmployee: Partial<Employee> = {
        name,
        age,
        occupation,
        department,
        salary,
        skills,
      };

      await addEmployee(newEmployee as Employee);
      const updatedEmployees = await fetchEmployees();
      setEmployees(updatedEmployees);

      // Reset form fields
      setName("");
      setAge("");
      setOccupation("");
      setDepartment("");
      setSalary(undefined);
      setSkills("");
    }
  };

  const handleEditInitiation = (id: number) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    if (employeeToEdit) {
      setCurrentEmployee(employeeToEdit);
      setShowModal(true);
    }
  };

  return {
    employees,
    setEmployees,
    filteredEmployees,
    handleDelete,
    handleEdit,
    handleSearch,
    searchTerm,
    setSearchTerm,
    name,
    setName,
    age,
    setAge,
    occupation,
    setOccupation,
    department,
    setDepartment,
    salary,
    setSalary,
    skills,
    setSkills,
    currentEmployee,
    setCurrentEmployee,
    showModal,
    setShowModal,
    handleSubmit,
    handleEditInitiation,
  };
};

export default useEmployeeActions;
