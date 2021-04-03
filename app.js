const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.listen(3000, (req, res) => {
	console.log('Listening on port 3000');
});
