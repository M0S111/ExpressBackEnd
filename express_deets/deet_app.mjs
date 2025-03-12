//jshint esversion:11
// Express is unopinionated/microframework for NodeJS runtime env; like Flask for Python

import express from 'express';
import path from 'path';

const app = express();

// doing a static Express server with a staic folder/dir
// no need for seperate routes; this points to a dir with all the HTML pages
//app.use(express.static(import.meta.dirname));

let things = [
	{id:1, name:'Bat'},
	{id:2, name:'Rat'},
	{id:3, name:'Cat'}
];


app.get('/',(req,res) => {
	res.send(`<h1 align='center' style='color:red'>The server is serving on port ${process.env.PORT} &#128516;</h1><hr>`);
});

app.get('/ftw',(req,res) => {
	res.sendFile('C:/Users/storm/Desktop/JS_Basix/simplepage.html'); // instead of async (req,res) => res.send(await readFile()) callback func
});

app.get('/things',(req,res) => {
	res.json(things); // express method for sending json data instead of JSON.stringify
});

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}...`));