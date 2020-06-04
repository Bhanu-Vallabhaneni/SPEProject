const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'database',
    user : 'root',
    password : 'rootpassword',
    database : 'IPL',
    port:3306
}); 

connection.connect(function(err) {
    if(!err)
        console.log('Connected to database with ID: ' + connection.threadId);
    else
        console.log('Error connecting to database: ' + err);
});

module.exports = connection;
