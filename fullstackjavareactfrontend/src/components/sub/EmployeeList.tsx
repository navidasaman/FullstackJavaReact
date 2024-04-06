import React from "react";
import { BsXLg, BsFillPencilFill } from "react-icons/bs";
import { Employee } from "../../types/Employee";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  filteredEmployees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({employees, onEdit, onDelete, searchTerm, setSearchTerm, handleSearch, filteredEmployees,}) => {
  return (
    <div className="w-1/2 h-full bg-gradient-to-r from-teal-500 to-indigo-500 shadow-lg rounded px-4 pt-6 pb-8 mb-4 m-5 overflow-y-auto">
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='w-full flex mb-3'>
            <input
              type="text"
              placeholder="Search Name"
              className='w-full p-1 border-gray-900 border-2'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='button' onClick={handleSearch} className='w-1/5 bg-gray-900 text-white p-1.5'>Search</button>
          </div>
        </form>
        {searchTerm && filteredEmployees.length > 0 ? (
          filteredEmployees.map((filteredEmployee) => (
            <div key={filteredEmployee.id}>
              <h1 className='mt-4 lowercase tracking-widest text-1xl font-thin text-white opacity-75 select-none mb-2'>
                Search result for {filteredEmployee.name}
              </h1>
              <ul className='p-4 mt-3 mb-3  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-300'>
                <h2 className='font-bold flex items-center justify-between'>
                  <span className="flex items-center">
                    • {filteredEmployee.name} •
                  </span>
                  <div className="flex items-center">
                    <BsFillPencilFill onClick={() => onEdit(filteredEmployee.id)} className="text-green-600 font-extrabold cursor-pointer mr-7" title="Edit" />
                    <BsXLg onClick={() => onDelete(filteredEmployee.id)} className="text-red-600 font-extrabold cursor-pointer" title="Delete" />
                  </div>
                </h2>
                <li>ID: {filteredEmployee.id}</li>
                <li>Age: {filteredEmployee.age}</li>
                <li>Occupation: {filteredEmployee.occupation}</li>
                <li>Department: {filteredEmployee.department}</li>
                <li>Salary: {filteredEmployee.salary}</li>
                <li>Skills: {filteredEmployee.skills}</li>
              </ul>
            </div>
          ))
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-800 pb-10">Employee Registry</h1>
            {employees.map((employee) => (
              <div key={employee.id} className='bg-slate-100 rounded-md p-5 mb-2'>
                <h2 className='font-bold flex items-center justify-between'>
                  <span className="flex items-center">
                    • {employee.name} •
                  </span>
                  <div className="flex items-center">
                    <BsFillPencilFill onClick={() => onEdit(employee.id)} className="text-green-600 font-extrabold cursor-pointer mr-7" title="Edit" />
                    <BsXLg onClick={() => onDelete(employee.id)} className="text-red-600 font-extrabold cursor-pointer" title="Delete" />
                  </div>
                </h2>
                <p>ID: {employee.id}</p>
                <p>Age: {employee.age}</p>
                <p>Occupation: {employee.occupation}</p>
                <p>Department: {employee.department}</p>
                <p>Salary: {employee.salary}</p>
                <p>Skills: {employee.skills}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;