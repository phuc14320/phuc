

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/shopbebe';

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shopbebe");
  dbo.collection("product").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});