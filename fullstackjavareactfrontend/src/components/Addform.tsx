import { useState, useEffect } from 'react';
import { BsXLg, BsFillPencilFill } from 'react-icons/bs'
import '../index.css'
import React from 'react'

interface Employee {
	id: number;
	name: string;
	age: number;
	occupation: string;
	department: string;
	salary: number;
	skills: string;
}

const Addform: React.FC = () => {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [occupation, setOccupation] = useState('');
	const [department, setDepartment] = useState('');
	const [salary, setSalary] = React.useState<number>();
	const [skills, setSkills] = useState('');
	const [employees, setEmployees] = useState<Employee[]>([]);

	const [editName, setEditName] = useState('');
	const [editAge, setEditAge] = useState('');
	const [editOccupation, setEditOccupation] = useState('');
	const [editDepartment, setEditDepartment] = useState('');
	const [editSalary, setEditSalary] = React.useState<number>();
	const [editSkills, setEditSkills] = useState('');
	const [showModal, setShowModal] = useState(false);

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const employee = { name, age, occupation, department, salary, skills };
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL_REGISTER_EMPLOYEE_ENDPOINT}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(employee)
			});
			if (response.ok) {
				console.log("New employee successfully added!");
				window.location.reload();
			} else {
				throw new Error("Error adding employee");
			}
		} catch (error) {
			console.error('Error adding employee:', error);
		}
	};

	useEffect(() => { 
		const fetchData = async () => { 
			try { 
				const response = await fetch(process.env.REACT_APP_API_URL_RETRIEVE_EMPLOYEES_ENDPOINT as string);
				const result = await response.json(); 
				setEmployees(result);
			} 
			catch (error) { 
				console.error("Error fetching employees:", error); 
			} 
		}; 
		fetchData();
	}, []);
 
	const handleDelete = async (id: number) => { 
		try { 
			await fetch(`${process.env.REACT_APP_API_URL_DELETE_EMPLOYEE_ENDPOINT}/${id}`, { 
				method: "DELETE", 
				headers: { "Content-Type": "application/json" }, 
			}); console.log("Employee successfully deleted!"); 
			// Update the employee list after successful deletion 
			setEmployees(employees.filter((employee) => employee.id !== id)); 
			setFilteredEmployees(filteredEmployees.filter((filteredEmployee) => filteredEmployee.id !== id)); 
		} catch (error) { 
			console.error("Error deleting employee:", error); 
		} 
	};

	const handleEdit = async (id: number) => { 
		const editedEmployee = { name: editName, age: editAge, occupation: editOccupation, department: editDepartment, salary: editSalary, skills: editSkills, }; 
		setShowModal(true); 
		try { 
			await fetch(`${process.env.REACT_APP_API_URL_EDIT_EMPLOYEE_ENDPOINT}/${id}`, { 
				method: "PUT", 
				headers: { "Content-Type": "application/json", }, 
				body: JSON.stringify(editedEmployee), 
			}); 
			alert("After employee has been edited and save button been pressed, please press close. Remember, all fields must be filled correctly before saving. Do not leave empty fields or close modal without filling all fields first.");
		
		} catch (error) { 
			console.error("Error updating employee:", error); 
		} 
	};
	const handleSearch = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL_SEARCH_EMPLOYEE_ENDPOINT}/${searchTerm}`);
			const data = await response.json();
			setFilteredEmployees(data);
    if (data.length == 0) {
				alert("No employees found with this name.")
			}
		} catch (error) {
			console.log(error);
		}

		if (searchTerm == '') {
			alert("Please enter full name.")
		}
	}

	const handleCloseModal = () => {
		setShowModal(false);
		window.location.reload();
	};

	return (
		<div className="w-screen h-4/5 flex flex-row items-center justify-center">
			<form onSubmit={handleSubmit} className="w-1/2 h-full bg-gradient-to-r from-teal-500 to-indigo-500 shadow-lg rounded px-4 pt-6 pb-8 mb-4 m-5">
				<h1 className="text-2xl font-bold text-gray-800 pb-10 text-center">Add Employee</h1>
				<div className="mb-4">
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full border-gray-300 rounded-md px-3 py-2"
						placeholder='Name'
					/>
				</div>

				<div className="mb-4">
					<input
						type="date"
						id="age"
						name="age"
						value={age}
						onChange={(e) => setAge((e.target.value))}
						className="w-full border-gray-300 rounded-md px-3 py-2"
						placeholder='Age'
					/>
				</div>

				<div className="mb-4">
					<input
						type="text"
						id="occupation"
						name="occupation"
						value={occupation}
						onChange={(e) => setOccupation(e.target.value)}
						className="w-full border-gray-300 rounded-md px-3 py-2"
						placeholder='Occupation'
					/>
				</div>

				<div className="mb-4">
					<input
						type="text"
						id="department"
						name="department"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						className="w-full border-gray-300 rounded-md px-3 py-2"
						placeholder='Department'
					/>
				</div>

				<div className="mb-4">
					<input
						type="number"
						id="salary"
						name="salary"
						value={salary}
						onChange={(e) => setSalary(parseInt(e.target.value))}
						className="w-full border-gray-300 rounded-md px-3 py-2"
						placeholder='Salary'
					/>
				</div>

				<div className="mb-4">
					<textarea
						id="skills"
						value={skills}
						onChange={(e) => setSkills(e.target.value)}
						className="w-full border-gray-300 rounded-md px-3 py-2"
						placeholder='Skills'
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-gray-800 text-white rounded-md px-4 py-2"
				>
					Submit
				</button>
			</form>

			{/* maps through employees array */}
			<div className="w-1/2 h-full bg-gradient-to-r from-teal-500 to-indigo-500 shadow-lg rounded px-4 pt-6 pb-8 mb-4 m-5 overflow-y-auto">
				<div>
					{filteredEmployees && (
						<form>
							<div className='w-full flex mb-3'>
								<input type="text" placeholder="Search Name" className='w-full p-1 border-gray-900 border-2'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<button type='submit' onClick={handleSearch} className='w-1/5 bg-gray-900 text-white p-1.5'>Search</button>
							</div>
						</form>
					)}
					{filteredEmployees.map((filteredEmployee) => (
						<div key={filteredEmployee.id}>
							<h1 className='mt-4 lowercase tracking-widest text-1xl font-thin text-white opacity-75 select-none mb-2'>Search result for {filteredEmployee.name}</h1>
							<ul className='p-4 mt-3 mb-3  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-300'>
							<h2 className='font-bold flex items-center justify-between'>
								<span className="flex items-center">
									• {filteredEmployee.name} •
								</span>
								<div className="flex items-center">
									<BsFillPencilFill onClick={() => handleEdit(filteredEmployee.id)} className="text-green-600 font-extrabold cursor-pointer mr-7" title="Edit" />
									<BsXLg onClick={() => handleDelete(filteredEmployee.id)} className="text-red-600 font-extrabold cursor-pointer" title="Delete" />
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
					))}
				</div>

				<h1 className="text-2xl font-bold text-center text-gray-800 pb-10">Employee Registry</h1>
				{employees.map((employee) => (
					<div key={employee.id} className='bg-slate-100 rounded-md p-5 mb-2'>
						<h2 className='font-bold flex items-center justify-between'>
							<span className="flex items-center">
								• {employee.name} •
							</span>
							<div className="flex items-center">
								<BsFillPencilFill onClick={() => handleEdit(employee.id)} className="text-green-600 font-extrabold cursor-pointer mr-7" title="Edit" />
								<BsXLg onClick={() => handleDelete(employee.id)} className="text-red-600 font-extrabold cursor-pointer" title="Delete" />
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
			</div>
			{showModal && employees.map((employee) => (
				<form key={employee.id} onSubmit={() => handleEdit(employee.id)}>
				<div key={employee.id} className="fixed w-full top-0 left-0 h-full  bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div key={employee.id} className="bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg rounded border border-gray-200 border-opacity-20 p-8 min-w-[calc(100%-1100px)] min-h-[fit-content]">
						<h2 className="mt-0 lowercase tracking-widest text-3xl font-thin text-white opacity-75 select-none mb-2">Edit Employee</h2>
						<input
							type="text"
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
							placeholder="Name"
							className='flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0 mb-2'
						/>
						<input
							type="date"
							value={editAge}
							onChange={(e) => setEditAge((e.target.value))}
							placeholder="Age"
							className='flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0  mb-2'
						/>
						<input
							type="text"
							value={editOccupation}
							onChange={(e) => setEditOccupation(e.target.value)}
							placeholder="Occupation"
							className='flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0  mb-2'
						/>
						<input
							type="text"
							value={editDepartment}
							onChange={(e) => setEditDepartment(e.target.value)}
							placeholder="Department"
							className='flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0  mb-2'
						/>
						<input
							type="number"
							value={editSalary}
							onChange={(e) => setEditSalary(parseInt(e.target.value))}
							placeholder="Salary"
							className='flex w-full h-9 p-1 m-auto bg-white border-b-0 border-l-0 border-r-0 mb-2'
						/>
						<textarea
							value={editSkills}
							onChange={(e) => setEditSkills(e.target.value)}
							placeholder="Skills"
							className='overflow-y-scroll h-48 w-full'
						>
						</textarea>
						<button onClick={() => handleEdit(employee.id)} className='mr-2.5 h-7 w-full bg-gray-800 text-white border-0 mt-1 tracking-widest lowercase font-thin cursor-pointer'>Save</button>
						<button onClick={handleCloseModal} className='mr-2.5 h-7 w-full bg-gray-800 text-white border-0 mt-1 tracking-widest lowercase font-thin cursor-pointer'>Close</button>
					</div>
				</div>
				</form>
			))}
		</div>
	);
};

export default Addform;