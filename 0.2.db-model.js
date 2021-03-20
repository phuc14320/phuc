
/// npm install mongodb mongoose --save

var mongoose = require('mongoose');
var User = require('./models/user');

const dbname = 'newshop';
const uri = 'mongodb://localhost:27017/' + dbname;

const querysql = { 
	username: 'nguyenngtu777@gmail.com',
    password: 'acasc'
};

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, dbconnection) {
        if (err) throw handleError(err);
        ///
        console.log('Successfully connected');

        ///
        User.find( querysql ).exec( function(err, users) {
            if (err) throw handleError(err);
            ///
            console.log('User model - Successfully query');
            console.log(users);
        } );  
});