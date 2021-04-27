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
      'Update departments',
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
      case 'Update departments':
        departmentUpdate();
        break;
      case 'Leave':
        endConnection();
        break;
    }
  });

};

const departmentAdd = () => {};

const departmentView = () => {
  console.log('Loading all departments...\n');
  connection.query("SELECT * FROM department;", (err,res) => {
    if (err) throw err;
    console.table(res);
  });
};

const departmentUpdate = () => {};

const endConnection = () => {
  console.log('Ending connection..... \n');
  console.log('|||||||||||||||||\n');
  console.log('Thanks for visting, have a great day!!!!\n');
  connection.end();
};




connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  menuPrompt();
});
