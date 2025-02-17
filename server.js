const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Predefined queries
const predefinedQueries = {
  "show me top selling products": {
    sql: "SELECT product_name, quantity_sold FROM products ORDER BY quantity_sold DESC LIMIT 5;",
    result: [
      { "product_name": "Milk", "quantity_sold": 150 },
      { "product_name": "Bread", "quantity_sold": 130 },
      { "product_name": "Eggs", "quantity_sold": 100 },
      { "product_name": "Apples", "quantity_sold": 90 },
      { "product_name": "Bananas", "quantity_sold": 70 }
    ]
  },
  "show me least-selling products": {
    sql: "SELECT product_name, quantity_sold FROM products ORDER BY quantity_sold ASC LIMIT 5;",
    result: [
      { "product_name": "Cereal", "quantity_sold": 10 },
      { "product_name": "Ketchup", "quantity_sold": 15 },
      { "product_name": "Mayonnaise", "quantity_sold": 20 },
      { "product_name": "Pickles", "quantity_sold": 25 },
      { "product_name": "Nuts", "quantity_sold": 30 }
    ]
  },
  "show me overstocked products": {
    sql: "SELECT product_name, stock_quantity FROM products WHERE stock_quantity > 100;",
    result: [
      { "product_name": "Milk", "stock_quantity": 150 },
      { "product_name": "Bread", "stock_quantity": 130 }
    ]
  },
  "show me understocked products": {
    sql: "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 20;",
    result: [
      { "product_name": "Cereal", "stock_quantity": 10 },
      { "product_name": "Ketchup", "stock_quantity": 15 }
    ]
  },
  "get total sales by category": {
    sql: "SELECT category, SUM(sales_amount) AS total_sales FROM sales GROUP BY category;",
    result: [
      { "category": "Dairy", "total_sales": 5000 },
      { "category": "Bakery", "total_sales": 4500 },
      { "category": "Produce", "total_sales": 3000 }
    ]
  },
  "show customers from New York": {
    sql: 'SELECT * FROM customers WHERE city = "New York";',
    result: [
      { "customer_name": "John Doe", "city": "New York" },
      { "customer_name": "Mary Smith", "city": "New York" }
    ]
  },
  "show all products": {
    sql: "SELECT * FROM products;",
    result: [
      { "product_name": "Milk", "category": "Dairy", "quantity_sold": 150, "price": 3.00 },
      { "product_name": "Bread", "category": "Bakery", "quantity_sold": 130, "price": 2.00 },
      { "product_name": "Eggs", "category": "Dairy", "quantity_sold": 100, "price": 2.50 },
      { "product_name": "Apples", "category": "Produce", "quantity_sold": 90, "price": 1.00 },
      { "product_name": "Bananas", "category": "Produce", "quantity_sold": 70, "price": 1.20 }
    ]
  },
  "show total sales for Eggs": {
    sql: 'SELECT product_name, sales_amount FROM sales WHERE product_name = "Eggs";',
    result: [{ "product_name": "Eggs", "sales_amount": 2500 }]
  },
  "show sales data": {
    sql: "SELECT * FROM sales;",
    result: [
      { "product_name": "Milk", "sales_amount": 4500 },
      { "product_name": "Bread", "sales_amount": 2600 },
      { "product_name": "Eggs", "sales_amount": 2500 },
      { "product_name": "Apples", "sales_amount": 900 },
      { "product_name": "Bananas", "sales_amount": 840 }
    ]
  },
  "get price of Bananas": {
    sql: 'SELECT product_name, price FROM products WHERE product_name = "Bananas";',
    result: [{ "product_name": "Bananas", "price": 1.20 }]
  },
  "list all customers": {
    sql: "SELECT * FROM customers;",
    result: [
      { "customer_name": "John Doe", "city": "New York" },
      { "customer_name": "Jane Doe", "city": "Los Angeles" },
      { "customer_name": "Mary Smith", "city": "New York" },
      { "customer_name": "Robert Brown", "city": "Chicago" }
    ]
  }
};

// Route to get the list of available queries
app.get('/available-queries', (req, res) => {
    res.json(Object.keys(predefinedQueries));
});

// Route to handle the incoming query
app.post('/query', (req, res) => {
    const { query } = req.body;

    if (predefinedQueries[query.toLowerCase()]) {
        res.json({
            sql: predefinedQueries[query.toLowerCase()].sql,
            result: predefinedQueries[query.toLowerCase()].result
        });
    } else {
        res.json({ 
            error: "Query not recognized. Please try one of the predefined queries.",
            availableQueries: Object.keys(predefinedQueries)
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});