const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "",
  database: "employees",
});

promptQuestions();

function promptQuestions() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View Employees by Department",
        "View Employees by Role",
        //   "View Employees by Manager",
        "Add Employee",
        "Update Employee's Role",
        "Update Employee's Manager",
        "Delete Employee",
        "Add Role",
        "Delete Role",
        "Add DEpartment",
        "Delete Department",
        "Quit",
      ],
    })
    .then(function (answer) {
      if (answer.begin === "View All Employees") {
        viewAllEmployees();
      } else if (answer.begin === "View Employees by Department") {
        viewEmpByDepartment();
      } else if (answer.begin === "View Employees by Role") {
        viewEmpByRole();
      } else if (answer.begin === "View Employees by Manager") {
        viewEmpRole();
      } else if (answer.begin === "Add Employee") {
        addEmployee();
      } else if (answer.begin === "Update Employee's Role") {
        updateRole();
      } else if (answer.begin === "Quit") {
        console.log("END");
      } else {
        connection.end();
      }
    });
}

function viewAllEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id)",
    function (err, result) {
      if (err) throw err;
      console.table(result);
      promptQuestions();
    }
  );
}

// viewAllEmployees();

// function viewAllEmp() {
//   connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id)", function (err, result) {
//       if (err) throw err;
//       console.table(result);
//       start();
//   });
// }

//View all employees by department
function viewEmpByDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to see employees for?",
      choices: ["Head", "Board", "Engineering", "Marketing", "Finance"],
    })
    .then(function (answer) {
      if (
        answer.department === "Head" ||
        "Board" ||
        "Engineering" ||
        "Marketing" ||
        "Finance"
      ) {
        connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE department = ?",
          [answer.department],
          function (err, result) {
            if (err) throw err;
            console.table(result);
            promptQuestions();
          }
        );
      }
    });
}

//View all employees by role
function viewEmpByRole() {
  inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "Which role would you like to see employees for?",
      choices: [
        "CEO",
        "CTO",
        "COO",
        "CFO",
        "Lead Engineer",
        "Engineer",
        "Marketing Manager",
        "Marketing Analyst",
        "Finance Manager",
        "Finance Analyst",
      ],
    })
    .then(function (answer) {
      if (
        answer.role === "CEO" ||
        "CTO" ||
        "COO" ||
        "CFO" ||
        "Lead Engineer" ||
        "Engineerr" ||
        "Marketing Manager" ||
        "Marketing Analyst" ||
        "Finance Manager" ||
        "Finance Analyst"
      ) {
        connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE title = ?",
          [answer.role],
          function (err, result) {
            if (err) throw err;
            console.table(result);
            promptQuestions();
          }
        );
      }
    });
}

//Add new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is your employee's first name?",
      },
      {
        name: "last",
        type: "input",
        message: "What is your employee's last name?",
      },
      {
        name: "title",
        type: "list",
        message: "What is your employee's role?",
        choices: [
          "CEO",
          "CTO",
          "COO",
          "CFO",
          "Lead Engineer",
          "Engineer",
          "Marketing Manager",
          "Marketing Analyst",
          "Finance Manager",
          "Finance Analyst",
        ],
      },
      {
        name: "salary",
        type: "input",
        message: "What is your employee's salary?",
      },
      {
        name: "dept",
        type: "list",
        message: "What is your employee's department?",
        choices: ["Head", "Board", "Engineering", "Marketing", "Finance"],
      },
      {
        name: "manager",
        type: "list",
        message: "Who is your employee's manager?",
        choices: [
          "Jason",
          "David",
          "Olivia",
          "Kevin",
          "Paul",
          "Helen",
          "Janet",
          "Hans",
          "None",
        ],
      },
    ])
    .then(function (answer) {
      let dept_id;
      if (answer.dept === "Head") {
        dept_id = 1;
      } else if (answer.dept === "Board") {
        dept_id = 2;
      } else if (answer.dept === "Engineering") {
        dept_id = 3;
      } else if (answer.dept === "Marketing") {
        dept_id = 4;
      } else if (answer.dept === "Finance") {
        dept_id = 5;
      }

      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: dept_id,
        },
        function (err, result) {
          if (err) throw err;
        }
      );

      let manager_id;
      if (answer.manager === "Jason") {
        manager_id = 1;
      } else if (answer.manager === "David") {
        manager_id = 2;
      } else if (answer.manager === "Olivia") {
        manager_id = 3;
      } else if (answer.manager === "Kevin") {
        manager_id = 4;
      } else if (answer.manager === "Paul") {
        manager_id = 5;
      } else if (answer.manager === "Helen") {
        manager_id = 6;
      } else if (answer.manager === "Janet") {
        manager_id = 7;
      } else if (answer.manager === "Hans") {
        manager_id = 8;
      } else if (answer.manager === "None") {
        manager_id = null;
      }

      let role_id;
      if (answer.title === "CEO") {
        role_id = 1;
      } else if (answer.title === "CTO") {
        role_id = 2;
      } else if (answer.title === "COO") {
        role_id = 3;
      } else if (answer.title === "CFO") {
        role_id = 4;
      } else if (answer.title === "Lead Engineer") {
        role_id = 5;
      } else if (answer.title === "Engineer") {
        role_id = 7;
      } else if (answer.title === "Marketing Manager") {
        role_id = 11;
      } else if (answer.title === "Marketing Analyst") {
        role_id = 12;
      } else if (answer.title === "Finance Manager") {
        role_id = 14;
      } else if (answer.title === "Finance Analyst") {
        role_id = 15;
      }

        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: role_id,
            manager_id: manager_id,
          },
          function (err, result) {
            if (err) throw err;
            console.log("=== New Employee Added ===");
            promptQuestions();
          }
        );
    });
}
