var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  
  getAll();
});


function getAll() {
  var sql = "SELECT * FROM products;";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    for (i = 0; i < result.length; i++) {
      console.log("Result: " + result[i].id + ' productName ' + result[i].productName + ' departmentName ' + result[i].departmentName + ' price ' + result[i].price + ' stockQuantity' + result[i].stockQuantity);
    }


  });

}

var questions = [
  {
    name: "action",
    message: "What is the ID number of the product you would like to buy?",
    response: 'INTEGER'
  },
  {
    name: "Quantity",
    message: "How many of those do you want to buy?",
    response: 'INTEGER'
  }
];

inquirer.prompt(questions).then(function (response) {
  console.log(response);
  var sql = "SELECT * FROM products WHERE id=" + parseInt(response.action);
  connection.query(sql, function (err, result) {
    if (err) throw err;
    // for(i = 0; i < result.length; i++){
    //     console.log("Result: " + result [i].productName+ "id: " + result[i].id);
    // }
    if (result[0].stockQuantity < parseInt(response.Quantity)) {
      console.log("Insuficient Quantity")
    }
    else {
      var total = parseInt(response.Quantity) * result[0].price;
      console.log(total)

      var updateSql = "update products set stockQuantity = stockQuantity - ? WHERE id = ?";
      connection.query(updateSql, [parseInt(response.Quantity), parseInt(response.action)], function (err, res) {
        console.log("Updated")
      })
    }
  })
});