/// INSTALL
/// npm install qrcode  qrcode-svg --save

/// ------------------ Khai bao LIB de su dung
var express = require('express');
var app = express();
var os = require('os');
var QRCode = require('qrcode-svg');

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
   // console.log("\n\t ... connect from ", req.connection.remoteAddress);
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

/// ..................................................
app.get('/infor', inforPage);
function inforPage(req, res) {
    var inter = os.networkInterfaces();
    res.send(JSON.stringify( inter ));
    console.log('\t ... get INF ! ');
    for(var key in inter) {
        if (key.indexOf("Wi-Fi") >= 0) {            
            console.log( inter[key][1]["address"] );
        }
    }
}

/// ..................................................
app.get('/qr', qrPage);
function qrPage(req, res) {
    var inter = os.networkInterfaces();

    console.log('\t ... get QR INF ! ');
    for(var key in inter) {
        if (key.indexOf("Wi-Fi") >= 0) {             
            var str = "http://" + 
                inter[key][1]["address"] + ":"
                + PORT + "/";
            var sv = new QRCode({
                content: str,
                padding: 4,
                width: 512,
                height: 512,
                color: "#000000",
                background: "#ffffff",
                ecl: "M",
            }).svg();
            res.send( sv );
            console.log("\n\t", inter[key][1]["address"] );
        }
    }
}


/// ------------------ gọi SERVER thực thi
var server = app.listen( PORT , function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("\n... SERVER http://%s:%s", host, port)
});