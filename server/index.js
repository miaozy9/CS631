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

app.post("/checkout", (req, res) => {
	let DocId = req.body.DocId;
	let CopyNo = req.body.CopyNo;
	let BId = req.body.BId;
	let ReaderId = req.body.ReaderId;

	db.query('INSERT INTO BORROWS (DocId,CopyNo,BId,ReaderId) VALUES(?, ?, ?, ?)', [DocId, CopyNo, BId, ReaderId], function (error, result, fields) {
		if (error) throw error;
		res.end();
	});
})

app.post("/getsetting", (req, res) => {
	let username = req.body.username;
	db.query('SELECT * FROM user WHERE username = ?', [username], function (err, result) {
		let normalResults = result.map((mysqlObj) => {
			return Object.assign({}, mysqlObj);
		});
		let arr = {};
		arr[0] = normalResults[0].general;
		arr[1] = normalResults[0].business;
		arr[2] = normalResults[0].entertainment;
		arr[3] = normalResults[0].health;
		arr[4] = normalResults[0].science;
		arr[5] = normalResults[0].sports;
		arr[6] = normalResults[0].technology;
		res.status(200).send(arr);
	});
})

app.post("/setting", (req, res) => {
	let data = req.body.check;
	let username = req.body.username;
	console.log(data)
	let text = JSON.stringify(data)
	text = text.substring(1, text.length - 1);
	const arr = text.split(",");
	console.log(username)

	db.query('UPDATE user SET general = ? WHERE username = ?', [arr[0], username], function (err, result) {
		if (err) throw err;
	});

	db.query('UPDATE user SET business = ? WHERE username = ?', [arr[1], username], function (err, result) {
		if (err) throw err;
	  });

	  db.query('UPDATE user SET entertainment = ? WHERE username = ?', [arr[2], username], function (err, result) {
		if (err) throw err;
	  });

	  db.query('UPDATE user SET health = ? WHERE username = ?', [arr[3], username], function (err, result) {
		if (err) throw err;
	  });

	  db.query('UPDATE user SET science = ? WHERE username = ?', [arr[4], username], function (err, result) {
		if (err) throw err;
	  });

	  db.query('UPDATE user SET sports = ? WHERE username = ?', [arr[5], username], function (err, result) {
		if (err) throw err;
	  });

	  db.query('UPDATE user SET technology = ? WHERE username = ?', [arr[6], username], function (err, result) {
		if (err) throw err;
	  });

})

app.post("/signup", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	db.query('SELECT * FROM user WHERE username = ? ', [username], function (error, results, fields) {
		if (error) throw error;

		if (results.length > 0) {
			res.writeHead(400);
			res.write('Duplicate username!');
		}
		else {
			db.query('INSERT INTO user(username, password, general, business, entertainment, health, science, sports, technology) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
			, [username, password, 1, 0, 0, 0, 0, 0, 0])
			res.writeHead(200);
			res.write('Successfully registered');
		}
		res.end();
	});
})

app.get("/news/:user", (request, response) => {
	const username = request.params.user;
	let statusCode = 200;
	let msg = ''


	db.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {
		if (error) throw error;
		//no user found
		if (results.length == 0) {
			statusCode = 401;
			msg = "User is not recognized, general articles are returned"
			axios.get(`http://newsapi.org/v2/top-headlines?country=us&pageSize=100&sortBy=publishedAt&category=general&apiKey=${apiKey}`)
			.then(res => {
				//response general news
				response.status(statusCode).send({
					message: msg,
					articles: res.data.articles
				})
			})
		}
		//user found
		else {
			statusCode = 200;
			msg = "Articles according to user preferences have been returned"
			//get user setting from database
			axios.post('http://localhost:8080/getsetting', {username: request.params.user})
			.then(res => {
				//callback function
				storeResults(res.data)
			})

			//callback function to load the setting and store in the result array
			function storeResults(data){
				console.log(data)
				let result = [];
				let map = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
				for(let i = 0; i < 7; i++){
					if(data[i] > 0){
						result.push(map[i])
					}
				}
				//result should be the checked setting in array eg. [[ 'general', 'entertainment', 'health', 'science' ]]
				getShuffledNews(result)
			}

			async function getShuffledNews(settingList){
				try {
					let endpoints = []
					let combinedArticles = []

					//call APIs multiple times to get articles in multiple categories
					//store the articles and shuffle and then send the response back
					for(let i in settingList){
						endpoints.push(`http://newsapi.org/v2/top-headlines?country=us&?sortBy=publishedAt&category=${settingList[i]}&pageSize=100&apiKey=${apiKey}`)
					}
					axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
					.then((responseList) => {
							for(let i in responseList){
								for(let j in responseList[i].data.articles){
									combinedArticles.push(responseList[i].data.articles[j])
								}
							}

							combinedArticles.sort(function (first, second) {
								if (Date.parse(first.publishedAt) > Date.parse(second.publishedAt)) {
								   return -1;
								}
								if (first < second) {
								   return 1;
								}
								return 0;
							 });
							
							//send the response
							response.status(statusCode).send({
								message: msg,
								articles: combinedArticles
							})
						}
					)
				  } catch {
					throw Error("Promise failed");
				  }
			}

		}
	});
})

app.get("/category/:category", async(req, res) => {
	let category = req.params.category;
	let statusCode = 200;
	let news_get;

	var url = `http://newsapi.org/v2/top-headlines?country=us&pageSize=100&sortBy=publishedAt&category=${category}&apiKey=${apiKey}`;
	console.log(url);
	news_get = await axios.get(url);

	res.status(statusCode).send({
		articles: news_get.data.articles
	})
})

app.post("/signout", (req, res) => {
	res.redirect('/');
	res.end();
})

app.listen(8080, () => {
    console.log("Server is running!")
})


///



