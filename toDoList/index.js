const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine'); // to send back HTML page
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);
const pgp = require('./db')

app.get('/', (req, res) => {
    res.render('home');
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});