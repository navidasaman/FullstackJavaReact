import { useState, useEffect } from 'react';

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
	const [age, setAge] = useState(0);
	const [occupation, setOccupation] = useState('');
	const [department, setDepartment] = useState('');
	const [salary, setSalary] = useState(0);
	const [skills, setSkills] = useState('');
	const [employees, setEmployees] = useState<Employee[]>([]);


	const handleSubmit = (e: any) => {
		e.preventDefault()
		const employee = { name, age, occupation, department, salary, skills }
		fetch("http://localhost:8080/employee/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(employee)

		}).then(() => {
			console.log("New employee successfully added!")
		}).catch((error) => {
			console.error('Error adding employee:', error);
		});
	}

	// Fetch data through HTTP GET request to the specified endpoint
	useEffect(() => {
		fetch('http://localhost:8080/employee/get')
			.then(res => res.json())
			.then((result) => {
				setEmployees(result);
			})
	}, [])

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
						type="number"
						id="age"
						name="age"
						value={age}
						onChange={(e) => setAge(parseInt(e.target.value))}
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
				<h1 className="text-2xl font-bold text-center text-gray-800 pb-10">Employee Registry</h1>
				{employees.map((employee) => (
					<div key={employee.id} className='bg-slate-100 rounded-md p-5 mb-2'>
						<h2 className='font-bold'>• {employee.name} •</h2>
						<p>Age: {employee.age}</p>
						<p>Occupation: {employee.occupation}</p>
						<p>Department: {employee.department}</p>
						<p>Salary: {employee.salary}</p>
						<p>Skills: {employee.skills}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Addform;