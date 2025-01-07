const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// MySQL Connection
const conDB = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Ak553ss1B@L',
  database: 'birds'
});

// MySQL setup server
conDB.connect((err) => {
	if (err) {
    	console.error(`Error connecting to MySQL: ${err.stack}`);
    	return;
  	}
  	console.log(`Connected to MySQL with ID: ${conDB.threadId}.`);

	/*// create birds db
	conDB.query("CREATE DATABASE birds", (err, result) => {
    	if (err) throw err;
    	console.log("Database created");
	});*/

	/*var sql = "CREATE TABLE species (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
 	
 	conDB.query(sql, (err, result) => {
    	if (err) throw err;
    	console.log("Table created");
  	});*/

});

// Routes
app.get('/', (req,res) => {
	res.send('Welcome to the birds database.');
});

// Get specific bird by ID
app.get('/api/birds/:id', (req,res) => { // get specific bird by ID
	
	conDB.query('SELECT (name) FROM species WHERE id = (?)', [req.params.id], (err, results) => {
    	if (err) {
    		console.error(`Error executing query: ${err.stack}`);
    		res.status(500).send(`Error fetching bird with ID: ${req.params.id}.`);
    		return;
    	}
    	res.json(results);
	});
});

// Get table
app.get('/api/birds', (req, res) => {
	conDB.query('SELECT * FROM species', (err, results) => {
    	if (err) {
    		console.error(`Error executing query: ${err.stack}`);
    		res.status(500).send('Error fetching birds.');
    		return;
    	}
    	res.json(results);
	});
});

// Add a new bird
app.post('/api/birds/add_bird', (req, res) => {
 	const name = req.body.name;
	conDB.query('INSERT INTO species (name) VALUES (?)', [name], (err, result) => {
    	if (err) {
      		console.error(`Error executing query: ${err.stack}`);
      		res.status(400).send('Error adding species.');
      		return;
    	}
    	res.status(201).send('Species added successfully.');
	});
});


app.put('/api/birds/chng_bird/:id', (req,res) => {
	const name = req.body.name;
  	const birdId = req.params.id;
  	conDB.query('UPDATE species SET name = ? WHERE id = ?', [name, birdId], (err, result) => {
    	if (err) {
    		console.error(`Error executing query: ${err.stack}`);
    		res.status(400).send('Error updating species.');
      		return;
    	}
    	res.send('Species updated successfully.');
  	});
});

app.delete('/api/birds/del_bird/:id', (req,res) => {
  	const birdId = req.params.id;
  	conDB.query('DELETE FROM species WHERE id = ?', [birdId], (err, result) => {
    	if (err) {
    		console.error(`Error executing query: ${err.stack}`);
    		res.status(400).send('Error deleting species.');
      		return;
    	}
    	res.send('Species deleted successfully.');
  	});
});


const port = process.env.PORT;
app.listen(port, () => {console.log (`Server is running on port ${port}.`)});


// can be run by editing package.json like this:
//"scripts": {
//    "start":"node expressapp.js", // runs with npm start command
//		"dev":"node expressapp.js" // or this runs with npm run dev command
//  }