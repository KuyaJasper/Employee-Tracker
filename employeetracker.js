const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
// Insert your MySQL password here between the tick marks, otherwise the application will not work!!!!!
  password: 'Oem212726!',
  database: 'employee_trackerDB',
});

// Menu prompt to navigate you through the application via inquirer.

const menuPrompt = () => {
inquirer
  .prompt({
    name: 'menu',
    type: 'rawlist',
    message: 'What would you like to do?',
    choices: [
      'Add departments',
      'View departments',
      'Remove department',
      'Add a role',
      'View all roles',
      'Remove a role',
      'View all employees',
      'Add an employee',
      'Remove an employee',
      'Update employee roles',
      'Search for an employee by manager',
      'Update employee manager',
      'Leave',
    ],
  })
  .then((answer) => {
    switch (answer.menu) {
      case 'Add departments':
        departmentAdd();
        break;
      case 'View departments':
        departmentView();
        break;
      case 'Remove department':
        departmentRemove();
        break;
      case 'Add a role':
        roleAdd();
        break;
      case 'View all roles':
        roleView();
        break;
      case 'Remove a role':
        roleRemove();
        break;
      case 'View all employees':
        employeeView();
        break;
      case 'Add an employee':
        employeeAdd();
        break;
      case 'Remove an employee':
        employeeRemove();
        break;
      case 'Update employee roles':
        UpdateEmployeeRoles();
        break;
      // TO DO - FINSIH THISE TWO FUNCTIONS 
        case 'Search for an employee by manager':
        addTHISfunction();
        break;
      case 'Update employee manager':
        addTHISfunction();
        break;


      case 'Leave':
        endConnection();
        break;
    }
  });

};


/* ---------- DEPARTMENT SECTION ---------- */


// VIEW ALL DEPARTMENTS 
const departmentView = () => {
  console.log('Loading all departments...\n');
  connection.query("SELECT * FROM department;", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
};




// ADD A DEPARTMENT
const departmentAdd = () => {
  inquirer
  .prompt([
    {
      name: "addDepartment",
      type: "input",
      message: "Please enter your New Department name.",
    },
  ])
  .then((answer) => {
    connection.query('INSERT INTO department SET?;',{
      name: answer.addDepartment,
    }, (err, res) => {
        if (err) throw err;
        console.log(` \n The "${answer.addDepartment}" department has been added!!!\n`);
       menuPrompt();
      }
    );
  });
};






// REMOVE A DEPARMENT
const departmentRemove = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    let deleteDepartment = res.map((department) => ({
      name: `${department.name}`,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          name: "department",
          type: "rawlist",
          message: "What department would you like to remove? (USE ID NUMBER)",
          choices: deleteDepartment,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM department WHERE ?",
          {
            id: answer.department,
          },

          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} department deleted!\n`);
            menuPrompt();
          }
        );
      });
  });
}


/* ----------  ROLES SECTION ---------- */

// VIEW ALL ROLES 
const roleView = () => {
  console.log('Loading all employee roles...\n');
  connection.query("SELECT * FROM roles;", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
};






// ADD A DEPARTMENT
const roleAdd = () => {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) throw err;
    let newDepartment = departments.map((department) => ({
      name: `${department.name}`,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          name: "roleName",
          type: "input",
          message: "Please enter your Role name.",
        },
        {
          name: "salary",
          type: "input",
          message: "Please enter salary.",
        },
        {
          name: "department",
          type: "rawlist",
          message: "What department is your role in?",
          choices: newDepartment,
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.roleName,
            salary: answer.salary,
            department_id: answer.department,
          },

          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role inserted!\n`);
            menuPrompt();
          }
        );
      });
  });
};






// REMOVE A ROLE
const roleRemove = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    let deleteroles = res.map((department) => ({
      name: `${roles.name}`,
      value: roles.id,
    }));
    inquirer
      .prompt([
        {
          name: "roles",
          type: "rawlist",
          message: "What role would you like to remove? (USE ID NUMBER)",
          choices: deleteDepartment,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM roles WHERE ?",
          {
            id: answer.roles,
          },

          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role deleted!\n`);
            menuPrompt();
          }
        );
      });
  });
}





/* ---------- EMPLOYEE SECTION ---------- */


//VIEW EMPLOYEES

const employeeView = () => {
  console.log('Loading all employees...\n');
  connection.query("SELECT * FROM employee;", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
};






// ADD EMPLOYEE

const employeeAdd = () => {
  connection.query("SELECT * FROM roles", (err, roles) => {
    if (err) throw err;
    let newRoles = roles.map((role) => ({ name: role.title, value: role.id }));

    connection.query("SELECT * FROM employee", (err, managers) => {
      if (err) throw err;
      let newManager = managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
      }));
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "Please enter employees first name.",
          },
          {
            name: "lastName",
            type: "input",
            message: "Please enter employees last name.",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the employees role?",
            choices: newRoles,
          },
          {
            name: "manager",
            type: "rawlist",
            message: "What is the employees managers name?",
            choices: newManager,
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              manager_id: answer.manager,
              role_id: answer.role,
            },

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} employee added!\n`);
              menuPrompt();
            }
          );
        });
    });
  });
};






// REMOVE AN EMPLOYEE

const employeeRemove = () => {
  connection.query("SELECT * FROM employee", (err, employees) => {
    if (err) throw err;
    let deleteEmployee = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
          message: "Which employee would you like to remove?",
          choices: deleteEmployee,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            id: answer.employee,
          },

          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} deleted from database!\n`);
            menuPrompt();
          }
        );
      });
  });
};









// UPDATE EMPLOYEE ROLES

const UpdateEmployeeRoles = () => {
  connection.query("SELECT * FROM roles", (err, roles) => {
    if (err) throw err;
    let newRoles = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    connection.query("SELECT * FROM employee", (err, employees) => {
      if (err) throw err;
      let newEmployee = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      inquirer
        .prompt([
          {
            name: "employee",
            type: "rawlist",
            message: "Which employee do you want to update?",
            choices: newEmployee,
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the employees new role?",
            choices: newRoles,
          },
        ])
        .then((answer) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.role,
              },
              {
                id: answer.employee,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} new role's inserted!\n`);
              menuPrompt();
            }
          );
        });
    });
  });
};










/* ---------- ENDS CONNECTION TO DB ---------- */
//End Connection to DB
const endConnection = () => {
  console.log('Ending connection..... \n');
  console.log('Connection ceased, have a great day!!!!\n');
  connection.end();
};




connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  menuPrompt();
});
