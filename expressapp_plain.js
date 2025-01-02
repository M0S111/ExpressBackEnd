const express = require('express');
const app = express();


app.use(express.json());

const birdDB = [
	{id:1,name:"Finch"},
	{id:2,name:"Robin"},
	{id:3,name:"Blackbird"}
];

app.get('/', (req,res) => {
	res.send('Welcome to the birds database.');
});

app.get('/api/birds/:id', (req,res) => { // get specific bird by ID
	const bird = birdDB.find(q => q.id === parseInt(req.params.id));
	if (!bird) res.status(404).send("No bird with this ID exists.");

	res.send(bird);
});


app.get('/api/birds', (req,res) => { // get birdDB object with all birds
    	res.json(birdDB);
});

app.post('/api/birds/add_bird', (req,res) => {
	const bird = {
		id: birdDB.length + 1,
		name: req.body.name
	};

	birdDB.push(bird);
	res.send(bird);
});

app.put('/api/birds/chng_bird/:id', (req,res) => {
	const bird = birdDB.find(q => q.id === parseInt(req.params.id));
	if (!bird) res.status(404).send("No bird with this ID exists.");

	bird.name = req.body.name;
	res.send(bird);
});

app.delete('/api/birds/del_bird/:id', (req,res) => {
	const bird = birdDB.find(q => q.id === parseInt(req.params.id));
	if (!bird) res.status(404).send("No bird with this ID exists.");

	const index = birdDB.indexOf(bird);
	birdDB.splice(index,1);

	res.send(bird);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {console.log (`Server is running on port ${port}.`)});
