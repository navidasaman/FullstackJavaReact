import "../index.css";
import React from "react";
import InputField from "./sub/InputField";
import TextAreaField from "./sub/TextAreaField";
import EmployeeList from "./sub/EmployeeList";
import EditEmployeeModal from "./sub/EditEmployeeModal";
import useEmployeeActions from "../hooks/useEmployeeActions";

const Form: React.FC = () => {
  const {
    handleEdit,
    handleDelete,
    handleSearch,
    searchTerm,
    setSearchTerm,
    filteredEmployees,
    employees,
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
    showModal,
    setShowModal,
    handleSubmit,
    handleEditInitiation,
  } = useEmployeeActions();

  return (
    <div className="w-screen h-5/6 flex flex-row items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-full bg-gradient-to-r from-teal-500 to-indigo-500 shadow-lg rounded px-4 pt-6 pb-8 mb-4 m-5"
      >
        <h1 className="text-2xl font-bold text-gray-800 pb-10 text-center">
          Add Employee
        </h1>
        <InputField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <InputField
          label="Age"
          type="date"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />

        <InputField
          label="Occupation"
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Enter occupation"
        />

        <InputField
          label="Department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Enter department"
        />

        <InputField
          label="Salary"
          type="number"
          value={salary ? salary.toString() : ""}
          onChange={(e) => setSalary(parseInt(e.target.value, 10))}
          placeholder="Enter salary"
        />

        <TextAreaField
          label="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter skills"
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white rounded-md px-4 py-2"
        >
          Submit
        </button>
      </form>
      <EmployeeList
        employees={employees}
        onEdit={handleEditInitiation}
        onDelete={handleDelete}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        filteredEmployees={filteredEmployees}
      />
      {showModal && currentEmployee && (
        <EditEmployeeModal
          employee={currentEmployee}
          onEdit={handleEdit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Form;
