var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
    getAll();
  });

function executeQuery(sql, cb) 
  bamazon_db.query(sql, function (err, result, fields
  ){
    if(err) throw err;
    cb(result);

  });


function getAll() {
  var sql ="SELECT * FROM products";
  connection.query(sql, function(err, result){
    if(err) throw err;
    console.log("Result: "+ result);
    
  });
  
}

// get the table of products to show in the command line

 fetchProducts();
 

function fetchProducts(res){
  executeQuery("SELECT * FROM products", function(result) {
    res.write("<table>");
    res.write("<tr");
    for(var column in result[0]) {
      res.write("<td><lable>" + column + "</table></td>");
    }
    res.write("</tr>");
    for(var row in result){
      res.write("tr>");
      for(var column in result[row]){
        res.write("<td><lable>" + result[row][column]+ "</lable></td>");
      }
      res.write("</td");
    }
  res.write("</table>")
  });
}
// get the questions to show back up
var questions = [
  {
        name: "action",
        message: "What is the ID number of the product you would like to buy?",
        response: 'INTEGER'
  },
  {
    name: "Quantitiy",
    message: "How many of those do you want to buy?",
    response: 'INTEGER'
  }
];

inquirer.prompt(questions), function(response) {
  console.log(response);
};


// once order is placed check the quantity

// IF the order quantity is MORE than the store quantity... tell the customer "Insufficient quantity!" and prevent order from processing


// ELSE fill the order
// get the total price for the products wanted by the customer
// update the SQL database to show the new  quantity to update in the table

// Show the customer the TOTAL cost of their purchase