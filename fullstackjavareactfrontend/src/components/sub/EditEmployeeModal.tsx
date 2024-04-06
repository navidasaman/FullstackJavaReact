import React from "react";
import InputField from "./InputField";
import { Employee } from "../../types/Employee";

interface EditEmployeeModalProps {
  employee: Employee;
  onEdit: (employee: Employee) => Promise<void>;
  onClose: () => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, onEdit, onClose, }) => {
  const [editName, setEditName] = React.useState(employee.name);
  const [editAge, setEditAge] = React.useState(String(employee.age));
  const [editOccupation, setEditOccupation] = React.useState(
    employee.occupation,
  );
  const [editDepartment, setEditDepartment] = React.useState(
    employee.department,
  );
  const [editSalary, setEditSalary] = React.useState<number>(employee.salary);
  const [editSkills, setEditSkills] = React.useState(employee.skills);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onEdit({
      ...employee,
      name: editName,
      age: editAge,
      occupation: editOccupation,
      department: editDepartment,
      salary: editSalary,
      skills: editSkills,
    });
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg rounded p-8 min-w-[calc(100%-1100px)]">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="date"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
            placeholder="Age"
            className="flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0  mb-2"
          />
          <input
            type="text"
            value={editOccupation}
            onChange={(e) => setEditOccupation(e.target.value)}
            placeholder="Occupation"
            className="flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0  mb-2"
          />
          <input
            type="text"
            value={editDepartment}
            onChange={(e) => setEditDepartment(e.target.value)}
            placeholder="Department"
            className="flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0  mb-2"
          />
          <input
            type="number"
            value={editSalary}
            onChange={(e) => setEditSalary(parseInt(e.target.value))}
            placeholder="Salary"
            className="flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0 mb-2"
          />
          <textarea
            value={editSkills}
            onChange={(e) => setEditSkills(e.target.value)}
            placeholder="Skills"
            className="overflow-y-scroll h-48 w-full"
          />

          <button
            type="submit"
            className="bg-gray-800 text-white rounded px-4 py-2"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            type="button"
            className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
