var express = require('express');
var mysql = require('mysql');
var inquirer = require('inquirer')

var orderId = null;
var itemCost = null;
let stock = null;
var amount = null;

var connection = mysql.createConnection({
    //properties...

  host: "localhost",
  user: "tomi",
  password: "password",
  database: "bamazon",
  port: 3306
});





// function displayProducts() {
//   console.log("Showing all product...\n");
  connection.query("SELECT * FROM products", function (err, rows) {
    if (err) {
      console.log(err)
      return;
    }

    rows.forEach(function(result) {
      console.log(result.item_id, result.product_name, result.departmaent_name, result.price, result.stock_quantity)
    })



    inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Please enter the Item ID which you would like to purchase.',
        //validate: validateInput,
        filter: Number
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        //validate: validateInput,
        filter: Number
      }
    
    ]).then(answers => {
      id = answers.id;
      quantity = answers.quantity;
      checkStock();
      //console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);
      //console.log(id,quantity);
      
    })
  });
  function checkStock() {
    connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
      if (err) throw err;
    if (quantity == quantity && id == id) {
      console.log('price:' + res[0].price,'stock:' +  res[0].stock_quantity );
      itemCost = res[0].price;
      stock = res[0].stock_quantity
      placeOrder();

    } else if (quantity < res[0].stock_quantity) {
        console.log("Insufficient Quantity");
      
      // if (quantity < res[0].stock_quantity) {
      //   console.log("Insufficient Quantity");
      
      // } else {
      // console.log('price:' + res[0].price,'stock:' +  res[0].stock_quantity );
      }
    });
  }
  function placeOrder() {
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: JSON.stringify(stock - quantity)
        },
        {
          item_id: parseInt(orderId)
        }
      ],
      function (err, res) {
        console.log('Inventory Updated\n');
        console.log("Your total will be " + (itemCost * quantity));
        data = [
          ['Item ID', 'Product', 'Department', 'Price (USD)', 'Stock']
        ];
        connection.end();
      }
    );
  }
  
  
  
  









