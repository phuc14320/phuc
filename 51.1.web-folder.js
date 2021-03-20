/// ------------------ Khai bao LIB de su dung
var express = require('express');
var app = express();
var os = require('os');

/// ------------------ CONFIG
const PORT = 8081;

/// ------------------ Khai bao LIB tự viết


/// ------------------ Khai bao cac Folder Tĩnh
app.use(express.static('public'));

/// ------------------ Khai bao cac Control, hàm , ... 
/// ..................................................
app.get('/', homePage);
function homePage(req, res) {
    res.sendFile(__dirname + '/views/home.html');
    //console.log("\n\t ... connect from ", req.connection.remoteAddress);
}

/// ..................................................
app.get('/login', loginPage);
function loginPage(req, res) {    
    res.sendFile(  __dirname + '/views/login.html');
}

/// ..................................................
app.get('/quit', quitPage);
function quitPage(req, res) {
    res.send(' shutdown SERVER !!! ... ');
    console.log('\t shutdown SERVER !!! ... ');
    process.exit(0);
}

/// ------------------ gọi SERVER thực thi
var server = app.listen( PORT , function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("\n... SERVER http://%s:%s", host, port)
});