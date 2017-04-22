//Requiring the necessary node packages

var mysql = require("mysql");
var prompt = require("prompt");

// Settings to connect to the Bamazon database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Javita01',
  database: 'bamazon_db'
});


// #executingthatcode



var execute = function(){

	// function to get all items available for bidding, and allow you to place a bid
var inventory = function() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
          }
          return choiceArray;
        };

	connection.query("SELECT * FROM products", function(err, result) {
		return (prettyTable(result));
	  
	  });

	setTimeout(function() {
	    prompt.get(['item_id', 'Quantity'], function (err, result) {
			    var shopperItem = result.item_id;
			    var shopperQuantity =result.Quantity;

			    inventoryCheck(shopperItem, shopperQuantity);
		    setTimeout(function() {execute();}, 3500);

		});
	}, 750);
}

// Can't sell what you don't have. Time to check the inventory with this handy function!

var inventoryCheck = function (id, quantity){
	connection.query('SELECT * FROM products WHERE item_id = ' + id, function (err, result){
		if (err) throw err;

		var total = result[0].price * quantity;

		var inventory = result[0].stock_quantity - quantity;

		if (inventory < 0){
			console.log('Insufficient stock. There are only '+ result[0].stock_quantity + 'item(s) left.');
		} else {
			console.log('User has bought ' + quantity + ' ' + result[0].product_name + ' for $' + total);
			console.log('There are ' + inventory + ' ' + result[0].product_name + ' remaining.')
			databaseUpdate(id, inventory)
		}
	});
}

// If you're not updating the database after a sale you're inventory will be off. Then you'll have to spend all holiday weekend manually checking the inventory as your fellow coworkers goof off leaving you with all the work. 

var databaseUpdate = function(id, quantity){
	connection.query('update products set stock_quantity = ' + quantity + ' where item_id = ' + id, function(err, result) {
        if (err) throw err;
    });
}

// Making that Bamazon Inventory look top notch! 

function prettyTable(products){
	for (var i = 0; i && products.length; i++) {
		console.log('------------------------');
		console.log('item_id: ' + products[i].item_id);
		console.log('Item: ' + products[i].product_name);
		console.log('Department: ' + products[i].department_name);
		console.log('Price: $' + products[i].price);
	}
	console.log('------------------------');
}


// Connecting to the Bamazon Database
connection.connect(function(err) {
    if (err) {
		console.error('error connecting: ' + err);
	    return;
	}
});

// INITIATE THE SPLINTER SEQUENCE
execute();