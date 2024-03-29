package com.navidasaman.system.model; // Model package will contain all entities, constructors and getter/setters

// javax.persistence.Entity annotation is used to declare a class as an entity which represents a row in a db table in a relational database. 
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

//indicating that it is an entity to be persisted.
@Entity 
public class Employee {
		
	    @Id // "@Id" annotation is used to mark the "id" field as the primary key of the entity.
	    @GeneratedValue(strategy = GenerationType.IDENTITY) // to auto-increment value in db
	    private Long id;
	    private String name;
	    private LocalDate age;
	    private String occupation;
	    private String department;
	    private int salary;
	    private String skills;

	    // Constructor
	    public Employee() {
	    	
	    }
	    
	    // Getters
		public Long getId() {
			return id;
		}

		public String getName() {
			return name;
		}

		public LocalDate getAge() {
			return age;
		}

		public String getOccupation() {
			return occupation;
		}
		
		public String getDepartment() {
			return department;
		}
		
		public int getSalary() {
			return salary;
		}

		public String getSkills() {
			return skills;
		}

	    // Setters
		public void setId(Long id) {
			this.id = id;
		}

		public void setName(String name) {
			this.name = name;
		}

		public void setAge(LocalDate age) {
			this.age = age;
		}

		public void setOccupation(String occupation) {
			this.occupation = occupation;
		}

		public void setDepartment(String department) {
			this.department = department;
		}

		public void setSalary(int salary) {
			this.salary = salary;
		}

		public void setSkills(String skills) {
			this.skills = skills;
		}	    
}
