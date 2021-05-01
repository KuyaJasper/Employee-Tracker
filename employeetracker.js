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
      case 'Remove deaparment':
        departmentRemove();
        break;


      case 'Leave':
        endConnection();
        break;
    }
  });

};

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
      department_name: answer.addDepartment,
    }, (err, res) => {
        if (err) throw err;
        console.log(res);
       menuPrompt();
      }
    );
  });
};

const departmentView = () => {
  console.log('Loading all departments...\n');
  connection.query("SELECT * FROM department;", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
};


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
