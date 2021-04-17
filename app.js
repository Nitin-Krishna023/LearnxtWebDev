const express = require('express');
const app = express();
const sequelize = require('./utils/database');
let Post = require('./models/posts');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/posts', (req, res) => {
	Post.findAll()
		.then((posts) => {
			console.log(posts);
			res.send(posts);
		})
		.catch((err) => {
			console.log(err);
		});
});

sequelize
	.sync()
	.then((result) => {
		return Post.findAll();
	})
	.then((posts) => {
		if (posts.length === 0) {
			return Post.create({
				title: 'Eiffel Tower',
				description: 'Some Description',
				text: 'Some Text',
				country: 'France',
				imageURL: './public/images/1.jpg'
			});
		}
	})
	.then(() => {
		app.listen(3000, (req, res) => {
			console.log('Listening on port 3000');
		});
	})
	.catch((err) => {
		console.log(err);
	});
