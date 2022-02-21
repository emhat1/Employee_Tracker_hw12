// Setting up dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table')

// Connection of server and database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NOT2secure;',
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
 
// View all departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) {
            throw err
        } else {
            console.table(res)
        }
        beginPrompt();
    })
};

// View all roles
const viewRoles = () => {
    db.query('SELECT title FROM roles', (err, res) => {
        if (err) {
          throw err
        } else {
          console.table(res)
        }
        beginPrompt();
    })
};

// Add a department
const addDepartment = () => {
    inquirer.prompt([{
        name: 'newDepartment', 
        type: 'input', 
        message: 'Please enter the new department'
    }])
    .then((answers) => {
        db.query(`INSERT INTO department(name) values ('${answers.newDepartment}')`, (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
            }
            beginPrompt();
        });
    });
};

// Add a role
const addRole = () => {
    inquirer.prompt([{
        name: 'new_role',
        type: 'input', 
        message: "Please add the new role"
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Please add the salary for the role (numbers only)'
    },
    {
        type: "input",
        name: "newDepId",
            message: "Please enter the department ID",
    }
    ])
    .then((answers) => {
        db.query(`INSERT INTO roles(title, salary, department_id) values ('${answers.newRole}', '${answers.newSalary}', '${answers.newDepId}')`, (err, res) => {
            if (err) {
                throw err
            } else {
                console.table(res)
            }
        beginPrompt();
        });
    });
};

// Update employee
const updateRole = () => {
    connection.promise().query('SELECT * FROM employee')
        .then((res) => {
            return res[0].map(employee => {
                return {
                    name: employee.first_name,
                    value: employee.id
                }
            })
        })
        .then(async (employeeList) => {
            return inquirer.prompt([{
                type: 'list',
                name: 'employeeListId',
                choices: employeeList,
                message: 'Please select the employee you want to update'
            },
            {
                type: 'list',
                name: 'roleId',
                choices: await selectRole(),
                message: 'Please select the role'
            }])
        })
        .then(answer => {
            console.log(answer);
            return connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?",
                [
                    answer.roleId,
                    answer.employeeListId,
                ],
            );
        })
        .then(res => {
            console.log('Updated employee successfully')
            runList();
        })
        .catch(err => {
            throw err
        });
}

// Delete employee
const deleteEmployee = () => {
    connection.promise().query('SELECT * FROM employee')
        .then((res) => {
            return res[0].map(emp => {
                return {
                    name: employee.first_name,
                    value: employee.id
                }
            })
        })
        .then((employees) => {
            return inquirer.prompt([{
                type: 'list',
                name: 'employeeId',
                choices: employees,
                message: 'Please select the employee to delete'
            }])
        })
        .then(answer => {
            console.log(answer);
            return connection.promise().query('DELETE FROM Employee WHERE id = ?', answer.employeeId);
        })
        .then(res => {
            // console.log(res);
            console.log('Employee deleted successfully')
            runList();
        })
        .catch(err => {
            throw err
        });
}

// Exit the app
const quit = () => { 
    process.exit(); 
};

beginPrompt();