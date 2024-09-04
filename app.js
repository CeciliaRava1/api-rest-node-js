const EXPRESS = require('express');
const MYSQL = require('mysql');

const APP = EXPRESS();

APP.get('/', function(req, res){
    res.send('Init route')
})

const PORT = process.env.PORT || 3000;

APP.listen(PORT, function () {
    console.log('Server running correctly in port: ' + PORT)
});
