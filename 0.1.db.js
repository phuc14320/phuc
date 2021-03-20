
/// npm install mongodb --save

const MongoClient = require('mongodb').MongoClient;

const dbname = 'newshop';
const uri = 'mongodb://localhost:27017/' + dbname;

/// CÂU TRUY VẤN Ở ĐÂY !!!
// - { <field1>: <value>, <field2>: <value> ... }
// - operator:  
// 		 $in , $nin : { _id: { $in: [ 5, ObjectId("507c35dd8fada716c89d0013") ] }
// 		 $gt , $gte , $lt , $lte , $ne , $exists
// 		$regex : { "name.last": { $regex: /^N/ } }
// LINK:  https://docs.mongodb.com/manual/reference/operator/query/
const querysql = { id : "123" };

MongoClient.connect(uri, { useUnifiedTopology: true },
 function(err, dbconnection) {
  if (err) throw err;
  var dbo = dbconnection.db( dbname );
  
  dbo.collection("product").find( querysql  ).toArray(
	function(err, result) {
		if (err) throw err;
		console.log(result);
		dbconnection.close();
  });
});