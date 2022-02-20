// Setting up dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table')

// Connection of server and database
    // need to set up .env file stuff
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
})

// Initial enquiry

const beginPrompt = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome to the employee database.  Please select an option below:',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update an employee role',
            'Delete an employee',
            'EXIT'
        ]
    })
    .then((answers) => {
        switch (answers.beginPrompt) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Quit': 
                quit();
        }
    });
};


// Executing the options

// View all employees 
const viewAllEmployees = () => {
    db.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) {
          throw err
        } else {
          console.table(res)
        }
        beginPrompt();
    })
};

// Add an employee
const addEmployee = () => {
    inquirer.prompt([{
        name: 'first_name',
        type: 'input', 
        message: "Please enter the employee's first name",
    },
    {
        name: 'last_name',
        type: 'input', 
        message: "Please enter the employee's last name"
    },
    {
        name: 'manager_id',
        type: 'input', 
        message: "What is the employee's manager's ID? "
    },
    ])
    .then((answers) => {
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) values ('${answers.firstName}', '${answers.lastName}', '${answers.newRoleId}', '${answers.newManId}')`, (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
            }
            beginPrompt();
        });
    });
};
 
