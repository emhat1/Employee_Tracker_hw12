// Setting up dependencies
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Conection of server and database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
})


// Initial enquiry


