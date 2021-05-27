-- USE DATABASE --
USE employee_trackerDB;

-- DEPARTMENTS--
INSERT INTO department(name)
VALUES("Operations"), ("Culinary"), ("Human Resources"), ("Sales");

-- EMPLOYEE ROLES --
INSERT INTO roles (title, salary, department_id)
VALUE ("Director of Operations", 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("Operations Manager", 75000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("Office Manager", 50000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ("Director of Sales", 100000, 4);
INSERT INTO roles (title, salary, department_id)
VALUE ("Head Chef", 80000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Sous Chef", 50000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Sales Manager", 75000, 4);

-- EMPLOYEES --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mr", "Krabs", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Leslie", "Knope", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jonah", "Jameson", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Michael", "Scott", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Spongebob", "Squarepants", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Squidward", "Tentacles", 1,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sandy", "Cheeks", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Patrick", "Star", 1, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Peter", "Parker", 3, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jim", "Halpert", 2, 7);
