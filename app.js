const EXPRESS = require('express');
const MYSQL = require('mysql');

const APP = EXPRESS();
APP.use(EXPRESS.json());


//Establish parameters of connection
const CONNECTION = MYSQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productsdb'
});

//Test the connection
CONNECTION.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log('Connected with the database');
    }
});


APP.get('/', function(req, res){
    res.send('Init route')
});


//Show all the products
APP.get('/api/products', (req,res) => {
    CONNECTION.query('SELECT * FROM products', (error, rows) => {
        if(error){
            throw error;
        } else {
            res.send(rows);
        }
    })
});

//Show a particular product
APP.get('/api/products/:id', (req,res) => {
    CONNECTION.query('SELECT * FROM products WHERE id = ?', [req.params.id], (error, row) => {
        if(error){
            throw error;
        } else {
            res.send(row);
        }
    })
});

//Create a product
APP.post('/api/products/', (req,res) => {
    let data = {description:req.body.description, price:req.body.price, stock:req.body.stock};
    let sql = 'INSERT INTO products SET ?';
    CONNECTION.query(sql, data, function (error, results){
        if(error){
            throw error;
        } else {
            res.send(results);
        }
    });
});

//Modify a product
APP.put('/api/products/:id', (req, res) =>{
    let id = req.params.id;
    let description = req.body.description;
    let price = req.body.price;
    let stock = req.body.stock;
    let sql = "UPDATE products SET description = ?, price = ?, stock = ? WHERE id = ?";
    CONNECTION.query(sql, [description, price, stock, id], function (error, results){
        if(error){
            throw error;
        } else {
            res.send(results);
        }
    });
});

//Delete a product
APP.delete('/api/products/:id', (req, res) =>{
    CONNECTION.query('DELETE FROM products WHERE id = ?', [req.params.id], function(error, rows){
        if(error){
            throw error;
        } else {
            res.send(rows);
        }
    });
});





const PORT = process.env.PORT || 3000;

APP.listen(PORT, function () {
    console.log('Server running correctly in port: ' + PORT)
});
