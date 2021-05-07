const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Oem212726!',
  database: 'employee_trackerDB',
});

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


      case 'Leave':
        endConnection();
        break;
    }
  });

};


/* ---------- DEPARTMENT SECTION ---------- */



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


// VIEW ALL DEPARTMENTS 
const departmentView = () => {
  console.log('Loading all departments...\n');
  connection.query("SELECT * FROM department;", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
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
