

var express = require('express');
var router = express.Router();
var configHeader = require("../configs/config_Header");
var mongoose = require('mongoose');
var Product = require('../models/product');
var session = require('express-session');
var multer = require('multer');
const { query } = require('express');

const dbname = 'shopbebe';
const uri = 'mongodb+srv://toi:PwW6pKJvIID4Y12b@cluster0.fx1w6.mongodb.net/shopbebe?retryWrites=true&w=majority';

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product controller - Time: ', Date.now());
    next();
})

router.get('/', payment);
function payment(req,res){

    var all = req.query.all;


    var name = req.query.name;
    var sl = req.query.soluong;
    var pricee = req.query.pricee;
    var id = req.query.id;
    var img = req.query.img;
    var price = req.query.price;
    res.render("pages/payment", {title: "ATN-Shop Payment USER page", Notify: "",
    alls:all,_img:img,_id:id,prices:price,names:name,pricees:pricee,soluongs:sl, configHeader: configHeader , currpage: "Payment" });
}
module.exports = router;



