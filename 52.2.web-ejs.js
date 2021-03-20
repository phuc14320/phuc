/// INSTALL
/// npm install express  body-parser  cookie-parser multer ejs mongodb mongoose  express-session cookie-session qrcode  qrcode-svg  --save

/// ------------------ Khai bao LIB de su dung
var express = require('express');
var session = require('express-session');
var cookieSession = require('cookie-session');

var app = express();

var os = require('os');
var path = require('path');
var QRCode = require("qrcode-svg");


/// ------------------ CONFIG
const PORT = 8081;

/// ------------------ Khai bao LIB tự viết


/// ------------------ Khai bao cac Folder Tĩnh, Session
app.use(express.static('public'));
/// session
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'ASQ.AdTekDev', 
    cookie: { 
        maxAge: 600000,
        views: 1,
        }
        })
    );
/// engine
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

/// ------------------ Khai bao cac Control, hàm , ... 
/// ..................................................
app.get('/', homePage);
function homePage(req, res) {
    if (session.user) 
    {
        res.render("pages/home", {title: "ATN-Shop Home page", username: session.user.username });
    } else {
        res.render("pages/home", {title: "ATN-Shop Home page", username: null });
    }    
    console.log("\n\t ... connect from ", req.connection.remoteAddress, req.headers.host);
}


/// ..................................................
app.get('/login', loginPage);
function loginPage(req, res) {
    if (session.user) {
        res.redirect('/');
    } else {
        if (req.query.username && req.query.username.trim() != "") {
            accsubmit = {
                username : req.query.username.trim(),
                password : req.query.password.trim()
            };
            session.user = accsubmit;
            res.redirect('/');
            console.log(accsubmit);
        } else {
            res.render("pages/login", {title: "ATN-Shop LOGIN page" });
        }
        console.log("\t login ", req.session);
    }
}

/// ..................................................
app.get('/logout', logoutPage);
function logoutPage(req, res) {
    session.user = null;
    res.redirect('/');
}

/// ..................................................
app.get('/quit', quitPage);
function quitPage(req, res) {
    res.send(' shutdown SERVER !!! ... ');
    console.log('\t shutdown SERVER !!! ... ');
    process.exit(0);
}

/// ..................................................
app.get('/music', musicPage);
function musicPage(req, res) {
    res.send('<html><body>'
    +
    '<embed name="GoodEnough" src="clsmusic.mp3" loop="true" hidden="true" autostart="true">'
    // <audio src="clsmusic.mp3" loop=infinite> </audio> 
    + '</body></html>');
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
    var xcontent = "";

    console.log('\t ... get QR INF ! ');
    for(var key in inter) {
        if (key.indexOf("Wi-Fi") >= 0) {             
            var str = "http://" + 
                inter[key][1]["address"] + ":"
                + PORT; // + "/qr";
            var sv = new QRCode({
                content: str,
                padding: 4,
                width: 512,
                height: 512,
                color: "#000000",
                background: "#ffffff",
                ecl: "M",
            }).svg();
            
            xcontent += "<br>" + sv;

            console.log("\n\t", inter[key][1]["address"] );

            str = "https://www.facebook.com/profile.php?id=100009760747422";
            sv = new QRCode({
                content: str,
                padding: 4,
                width: 512,
                height: 512,
                color: "#000000",
                background: "#ffffff",
                ecl: "M",
            }).svg();
            xcontent += "<br>" + sv;

            res.render("pages/qr", {title: "ATN-Shop QR-Code page", content: xcontent });

        }
    }
}

/// ------------------ gọi SERVER thực thi
var server = app.listen( PORT , function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("SERVER http://%s:%s", host, port)
});