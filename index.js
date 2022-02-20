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


