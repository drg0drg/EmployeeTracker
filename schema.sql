DROP DATABASE IF EXISTS Employees_db;

CREATE DATABASE Employees_db;

USE Employees_db;

CREATE TABLE department_table (
id INT NOT NULL AUTO_INCREMENT,
department VARCHAR(30) UNIQUE NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles_table (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,0) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department_table(id)
);

CREATE TABLE employee_table (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles_table(id),
FOREIGN KEY (manager_id) REFERENCES employee_table(id)
);


INSERT INTO department_table (department)
VALUES ('Head'), ('Board'), ('Engineering'), ('Marketing'),('Finance');

INSERT INTO roles_table (title, salary, department_id)
VALUES 
	('CEO', 200000, 1),
	('CTO', 100000, 2),
	('COO', 100000, 2),
	('CFO', 100000, 2),
	('Lead Engineer', 70000, 3),
  ('Lead Engineer', 70000, 3),
  ('Engineer', 50000, 3),
  ('Engineer', 50000, 3),
  ('Engineer', 50000, 3),
  ('Engineer', 50000, 3),
	('Marketing Manager', 75000, 4),
  ('Marketing Analyst', 35000, 4),
	('Marketing Analyst', 35000, 4),
	('Finance Manager', 100000, 5),
	('Finance Analyst', 40000, 5),
	('Finance Analyst', 40000, 5);



INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES
  ('Jason', 'Osborne', 1, NULL),
  ('David', 'Williams', 2, 1),
  ('Olivia', 'Bonn', 3, 1),
  ('Kevin', 'Marlow', 4, 1),
  ('Paul', 'Cooper', 5, 2),
  ('Helen', 'Gibson', 6, 2),
  ('Alex', 'Carter', 7, 5),
  ('Ellie', 'Graham', 8, 5),
	('Joe', 'Redington', 9, 6),
  ('Matt', 'Hopkins', 10, 6),
	('Janet', 'Cox', 11, 3),
	('Colin', 'Parker', 12, 11),
	('Ana', 'Parton', 13, 11),
	('Hans', 'Diess', 14, 4),
	('Dan', 'Mckinney', 15, 14),
	('Graham', 'Parker', 16, 14);
    
