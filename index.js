var express = require('express');
var app = express();

app.listen(process.env.PORT ||8080);

app.get('/', homePage );
function homePage(req,res){
    res.send("Home Page !");
}
/////------------------
app.get('/login', loginPage );
function loginPage(req,res){
    accsubmit = {
        username : req.query.username,
        password : req.query.password
    };
    console.log(accsubmit);
    res.sendfile(__dirname + "/views/login.html");
}
////------------
app.get('/product', productPage );
function productPage(req,res){
    res.sendfile(__dirname + "/views/product.html");
}
////----------
app.get('/order', orderPage );
function orderPage(req,res){
    res.send("Order Page!");
}
//////
app.get('/order/payment', paymentPage );
function paymentPage(req,res){
    res.send("Payment Page!");
}
  ////

