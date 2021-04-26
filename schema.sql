/* Created schema */
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

/*  Creates department table*/
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (30),
    PRIMARY KEY (id)
)

/* Creates role table*/
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
)

/* Creates emplloyee table*/
CREATE TABLE employee(
    id INT NOT NULL  AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
)