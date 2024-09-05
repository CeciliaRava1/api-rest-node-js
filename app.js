const EXPRESS = require('express');
const MYSQL = require('mysql');

const APP = EXPRESS();

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


const PORT = process.env.PORT || 3000;

APP.listen(PORT, function () {
    console.log('Server running correctly in port: ' + PORT)
});
