 const express = require('express');
const mysql = require('mysql2');
var cors = require('cors')
var axios = require('axios');

const bodyParser = require('body-parser'); // Middleware 

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
const apiKey = "205babaf0f0c4a2ab812c5ec9b961270";
// const password = "20120461mm";
// const password = "";

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
	password: password,
	// database: "LoginApp",
	database: "citylibrary"
})

const pool = mysql.createPool({
	user: "root",
    host: "localhost",
    password: password,
	// database: "LoginApp",
	database: "citylibrary",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
  });

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// Add Document API
app.post("/addDoc", (req, res) => {
	db.query('INSERT INTO DOCUMENT VALUES (?, ?, ?, ?)', [req.body.docID, req.body.title, req.body.pDate, req.body.pubID], 
	function (error, result, fields) {
		if(error) {
			if(error.code == 'ER_DUP_ENTRY' || error.errno == 1062)
			{
				res.status(200).send("1062")
			}
			else{
				res.status(200).send("1063")
			}
		}
		res.status(200).send(result);
		res.end();
	});
})

// Add Reader API
app.post("/addReader", (req, res) => {
	let data = [req.body.ReaderId, req.body.Type, req.body.ReadName, 
		req.body.NumBorBooks, req.body.NumResBooks, req.body.PhoneNo, req.body.Address]
	db.query('INSERT INTO READER VALUES (?, ?, ?, ?, ?, ?, ?)', data,
	function (error, result, fields) {
		if(error) {
			if(error.code == 'ER_DUP_ENTRY' || error.errno == 1062)
			{
				res.status(200).send("1062")
			}
			else{
				res.status(200).send("1063")
			}
		}
		res.status(200).send(result);
		res.end();
	});
})

// Search for an item
app.get("/search/:search_item", async(req, res) => {
	let search=req.params.search_item;
	const words = search.split(' ');
	let identifier = words[0]
	let content = words[1]

	if(identifier == "id:"){
		pool.query(
			'SELECT * FROM document WHERE DOCID = ?',[content],
			function(err, results, fields) {
			  console.log(results); // results contains rows returned by server
			  res.status(200).send(results);
			}
		  );
	}
	else if(identifier == "title:"){
		pool.query(
			'SELECT * FROM document WHERE TITLE = ?',[content],
			function(err, results, fields) {
			  console.log(results); // results contains rows returned by server
			  res.status(200).send(results);
			}
		  );
	}
	else if(identifier == "publisher:"){
		pool.query(
			'SELECT * FROM document WHERE PUBLISHERID = ?',[content],
			function(err, results, fields) {
			  console.log(results); // results contains rows returned by server
			  res.status(200).send(results);
			}
		  );
	}
	else if(identifier == "bid:"){
		pool.query(
			'SELECT * FROM branch WHERE bid = ?',[content],
			function(err, results, fields) {
			  res.status(200).send(results);
			}
		  );
	}
	else{
		res.status(200).send({
			message: "Wrong input format",
			articles: []
		})
		res.end();
		return;
	}
})

// =======Sign in API
app.post("/readerSignin", (req, res) => {
	let readerID = req.body.readerID;

	console.log(readerID)
	db.query('SELECT * FROM reader WHERE READERID = ? ', [readerID], function (error, result, fields) {
		if (error) throw error;

		if (result.length > 0) {
			res.status(200).send(result);
		} else {
			res.status(401).send(result);
		}
		res.end();
	});
})

// Admin sign in 
app.post("/adminSignin", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	console.log(username, password)
	db.query('SELECT * FROM ADMIN WHERE ID = ? AND PASSWORD = ?', [username, password], function (error, result, fields) {
		if (error) throw error;
		console.log("error", error)
		console.log("result", result)
		if (result.length > 0) {
			res.status(200).send(result);
		} else {
			res.status(401).send(result);
		}
		res.end();
	});
})

app.post("/signout", (req, res) => {
	res.redirect('/');
	res.end();
})

app.listen(8080, () => {
    console.log("Server is running!")
})


///



