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
const password = "20120461mm";
const database = "citylibrary";
// const password = "";
// const database = "LoginApp";


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
	password: password,
	database: database,
})

const pool = mysql.createPool({
	user: "root",
    host: "localhost",
    password: password,
	database: database,
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

// Get N borrowers
// app.post("/getBorrowers", (req, res) => {
// 	pool.query(
// 		'SELECT * FROM document WHERE DOCID = ?',[req.body],
// 		function(err, results, fields) {
// 			console.log(results); // results contains rows returned by server
// 			res.status(200).send(results);
// 		}
// 	);
// })

// Get N most borrowed books Branch
app.post("/getBorrowedBooks", (req, res) => {
	req.body.n = Number(req.body.n)
	if (req.body.mode == 0) {
		pool.query(
			`select R.READERID,R.ReadName,COUNT(*) as 'borrowed' FROM reader R, borrows B
			where B.ReaderId=R.ReaderId AND B.ReaderId in
			(SELECT ReaderId FROM borrows B1, authors A WHERE B1.BID=? AND B1.DocId=A.docId
			) GROUP BY ReaderId ORDER BY COUNT(*) DESC LIMIT ?`,
			[req.body.bid, req.body.n],
			function(err, results, fields) {
				console.log(results); // results contains rows returned by server
				res.status(200).send(results);
			}
		);
	} else {
		pool.query(
			`SELECT TITLE,COUNT(*) AS 'BORROWED' FROM borrows B, document D
			WHERE B.DOCID=D.DOCID AND B.DOCID IN
			(SELECT DOCID FROM BORROWS B1,book B2 WHERE B1.BID=? AND B1.DOCID=B2.book_docID)
			GROUP BY TITLE ORDER BY COUNT(*) DESC LIMIT ?`,
			[req.body.bid, req.body.n],
			function(err, results, fields) {
				if (err) console.log(err)
				console.log(results); // results contains rows returned by server
				res.status(200).send(results);
			}
		);
	}
})

// Get N in Library
app.post("/getLibraryBooks", (req, res) => {
	req.body.n = Number(req.body.n)
	if (req.body.mode == 2) {
		console.log("in mode 2")
		pool.query(
			`SELECT B.READERID,R.ReadName,B.BId,COUNT(*) as 'borrowed' 
			FROM reader R, borrows B where B.ReaderId=R.ReaderId AND B.ReaderId in 
			(SELECT ReaderId FROM borrows B1, authors A WHERE B1.DocId=A.docId)
			GROUP BY B.ReaderId,B.BId ORDER BY COUNT(*) DESC LIMIT ?`,
			[req.body.n],
			function(err, results, fields) {
				console.log(results); // results contains rows returned by server
				res.status(200).send(results);
			}
		);
	} else {
		console.log("in mode not 2")
		pool.query(
			`select count(*) As borrowed, document.DocId, document.title
			from borrows left join document on document.DocId = borrows.DocId
			group by DocId order by count(document.DocId) desc limit ?`,
			[req.body.n],
			function(err, results, fields) {
				if (err) console.log(err)
				console.log(results); // results contains rows returned by server
				res.status(200).send(results);
			}
		);
	}
})

// Get Average Fine
app.post("/getAvgFine", (req, res) => {
	pool.query(
		`select bid, fine_in_branch.Name, avg(fine_in_branch.BorrowedFine) * 0.2 as AvgFine from ( select branch.Name,
		branch.BId, datediff(bor_transaction.RetDateTime, bor_transaction.BorDateTime) - 10 as BorrowedFine
		from borrows left join bor_transaction on bor_transaction.BorNumber = borrows.BorNumber left join
		branch on branch.BId = borrows.BId inner join book on book.book_docId = borrows.DocId where
		bor_transaction.BorDateTime >= ? and bor_transaction.BorDateTime <
		? and datediff(bor_transaction.RetDateTime, bor_transaction.BorDateTime) - 20 > 0 )
		fine_in_branch group by fine_in_branch.BId`,
		[req.body.startDate, req.body.endDate],
		function(err, results, fields) {
			console.log(results); // results contains rows returned by server
			res.status(200).send(results);
		}
	);
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
	} else if(identifier == "title:"){
		pool.query(
			'SELECT * FROM document WHERE TITLE = ?',[content],
			function(err, results, fields) {
			  console.log(results); // results contains rows returned by server
			  res.status(200).send(results);
			}
		  );
	} else if(identifier == "publisher:"){
		pool.query(
			'SELECT * FROM document WHERE PUBLISHERID = ?',[content],
			function(err, results, fields) {
			  console.log(results); // results contains rows returned by server
			  res.status(200).send(results);
			}
		  );
	} else if(identifier == "bid:"){
		pool.query(
			'SELECT * FROM branch WHERE bid = ?',[content],
			function(err, results, fields) {
			  res.status(200).send(results);
			}
		  );
	} else if(identifier == "year:"){
		pool.query(
			`select count(*) As borrowed, document.DocId, document.title 
			from bor_transaction right join borrows on bor_transaction.BorNumber = borrows.BorNumber 
			left join document on document.DocId = borrows.DocId 
			inner join book on book.book_docid = borrows.DocId where year(bor_transaction.BorDateTime) = ?
			group by year(bor_transaction.BorDateTime), DocId
			order by count(document.DocId) desc limit 10`,
			[content],
			function(err, results, fields) {
			  res.status(200).send(results);
			}
		  );
	} else {
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
	let BorNumber = req.body.BorNumber;
	let DocId = req.body.DocId;
	let CopyNo = req.body.CopyNo;
	let BId = req.body.BId;
	let ReaderId = req.body.ReaderId;
	console.log(DocId)
	db.query('SELECT * FROM borrows WHERE BorNumber = ? AND DocId = ? AND CopyNo = ? AND BId = ? AND ReaderId = ? ', [BorNumber, DocId, CopyNo, BId, ReaderId], function (error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				res.writeHead(400);
				res.write('Duplicate entries');
			}
			else {
				db.query('INSERT INTO borrows(BorNumber,DocId,CopyNo,BId,ReaderId) VALUES (?, ?, ?, ?, ?)', [BorNumber, DocId, CopyNo, BId, ReaderId])
				res.writeHead(200);
				res.write('Successfully chekced out');
			}
			res.end();
		});
	}
)

app.post("/reserve", (req, res) => {
	let ResNumber = req.body.ResNumber;
	let Copy_DocId = req.body.Copy_DocId;
	let CopyNo = req.body.CopyNo;
	db.query('SELECT * FROM reserves WHERE ResNumber = ? AND Copy_DocId = ? AND CopyNo = ?', [ResNumber, Copy_DocId, CopyNo], function (error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				res.writeHead(400);
				res.write('Already reserved');
			}
			else {

				db.query('INSERT INTO reserves(ResNumber,Copy_DocId,CopyNo) VALUES (?, ?, ?)', [ResNumber, Copy_DocId, CopyNo])
				res.writeHead(200);
				res.write('Reserve success');
			}
			res.end();
		});
	}
)

app.post("/return", (req, res) => {
	let BorNumber = req.body.BorNumber;
	let DocId = req.body.DocId;
	let CopyNo = req.body.CopyNo;
	let BId = req.body.BId;
	let ReaderId = req.body.ReaderId;
	console.log(BorNumber)
	db.query('SELECT * FROM borrows WHERE BorNumber = ? AND DocId = ? AND CopyNo = ? AND BId = ? AND ReaderId = ? ', [BorNumber, DocId, CopyNo, BId, ReaderId], function (error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				db.query('DELETE FROM borrows WHERE BorNumber = ? AND DocId = ? AND CopyNo = ? AND BId = ? AND ReaderId = ? ', [BorNumber, DocId, CopyNo, BId, ReaderId])
				res.writeHead(200);
				res.write('Successfully deleted');
			}
			else {
				console.log("not found")
				res.writeHead(400);
				res.write('Not found');
			}
			res.end();
		});
	}
)

// Search for an item
app.get("/doclist/:readerID", async(req, res) => {
	let readerID = req.params.readerID;
	pool.query(
		'SELECT DocId, Title, PubName FROM (borrows NATURAL JOIN DOCUMENT NATURAL JOIN PUBLISHER) WHERE ReaderId = ?', [readerID],
		function(err, results, fields) {
		  console.log(results); // results contains rows returned by server
		  res.status(200).send(results);
		}
	  );
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

app.post("/signout", (req, res) => {
	res.redirect('/');
	res.end();
})

app.listen(8080, () => {
    console.log("Server is running!")
})


///



