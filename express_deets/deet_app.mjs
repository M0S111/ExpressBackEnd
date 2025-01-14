// Express is unopinionated/microframework for NodeJS runtime env; like Flask for Python

import express from 'express';

const app = express();

app.get('/',(req,res) => {
	res.send(`<h1 align='center' style='color:orange'>The server is serving on port ${process.env.PORT} &#128516;</h1><hr>`);
});

app.get('/ftw',(req,res) => {
	res.sendFile('C:/Users/storm/Desktop/JS_Basix/simplepage.html');
});

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}...`));