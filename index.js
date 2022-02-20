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


