const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "",
  database: "employees"
});