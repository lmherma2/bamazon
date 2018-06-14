var inquirer = require("inquirer");
var mysql = require("mysql");
var id;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "sexycheese",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  ShowAllProducts();
  runSearch();
});

function ShowAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }

  function runSearch() {
    inquirer
      .prompt({
        name: "item_id",
        type: "input",
        message: "What would you like to buy?",
      })
      .then(function(answer) {
        inquirer.prompt({
                 name: "Quantity",
                 type: "input",
                 message: "How many would you like to buy?",
                })
                .then(function(Quantity) {

                     console.log(Quantity);
                     doSQL(answer.item_id, Quantity.Quantity);
                });
             });

        }

  function doSQL(id, Quantity) {
        console.log(id);
        console.log(Quantity);
        connection.query( "update products set stock_quantity = stock_quantity - ? where item_id = ?", [Quantity, id], function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            ShowAllProducts();
            connection.end();
  });
}