var express = require('express');
var router = express.Router();
var configHeader = require("../configs/config_Header");
var mongoose = require('mongoose');
var Product = require('../models/product');
var session = require('express-session');
var configHeader = require("../configs/config_Header");
var configDB = require("../configs/config_DB");
const { MongoClient } = require('mongodb');

const dbname = 'shopbebe';
const uri = 'mongodb+srv://toi:PwW6pKJvIID4Y12b@cluster0.fx1w6.mongodb.net/shopbebe?retryWrites=true&w=majority';

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product report - Time: ', Date.now());
    next();
})
router.post('/',reportPage);
router.get('/',reportPage);
function reportPage(req,res){
    require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;
    if (session.user) 
    {
        var name1 = "";
        var chucvu1 = "";
        var chinhanh1 = "";
        var banchay1 = ""
        var doanhthu1 = "";


if(req.query.name){
    name1 = req.query.fullname;
}
if(req.query.chucvu){
    chucvu1 = req.query.bophan;
}
if(req.query.chinhanh){
    chinhanh1 = req.query.chinhanh;
}
if(req.query.banchay){
    banchay1 = req.query.sanphambanchay;
}
if(req.query.soluong){
    soluong1 = req.query.soluong;
}
if(req.query.sanphambankhongchay){
    sanphambankhongchay1 = req.query.sanphambankhongchay;
}
if(req.query.doanhthu){
    doanhthu1 = req.query.total;
}
console.log(name1);
            if(name1 != ""){
                MongoClient.connect(uri, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("shopbebe");
                    array = {
                        name:name1,
                        chucvu:chucvu1,
                        chinhanh:chinhanh1,
                        banchay:banchay1,
                        doanhthu:doanhthu1
                    };
                    dbo.collection("Report").insertOne(array, function(err, res) {
                      if (err) throw err;
                      console.log("Report submit");
                      db.close();
                    });
                  });
                  let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'toi@gmail.com' , // 
                        pass: '123' // TODO: your gmail password 
                    }
                });
                let mailOptions = {
                    from: 'toi@gmail.com', // TODO: email sender
                    to: 'bienngoctoi@gmail.com' , // TODO: email receiver
                    subject: 'The director has a new announcement',
                    text: 'name: ' + name1 + ' Position :' + chucvu1 + 'report last month'
                };
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return log('Error occurs' + err);
                    }else{
                        return log('Email sent!!!');
                    }
                });
            }
            res.render("pages/report",  {
                title: "ATN-Shop report page", 
                username: session.user.username,
                 configHeader: configHeader , currpage: "Report"
                });
            
    }
    else{
        res.redirect('/login');
    }
        

    
}

module.exports = router;




