const express = require('express');
const app = express();
const sequelize = require('./utils/database');
let Post = require('./models/posts');
let Email = require('./models/emails');
const { response } = require('express');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
	Post.findAll()
		.then((posts) => {
			console.log(posts);
			res.render('home', {
				posts: posts
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/admin', async (req, res) => {
	const posts = await Post.findAll();
	const mails = await Email.findAll();
	res.render('admin', {
		posts: posts,
		mails: mails
	});
});

// Creating Posts in db
app.post('/posts', (req, res) => {
	const title = req.body.title;
	const type = req.body.type;
	const imageURL = req.body.url;
	const text = req.body.text;
	const description = text.substring(0, text.indexOf('.') + 1);
	Post.create({
		title: title,
		description: description,
		text: text,
		type: type,
		imageURL: imageURL
	})
		.then(() => {
			console.log('Created');
			res.redirect('/admin');
		})
		.catch(() => {
			console.log(err);
		});
});

// Deleting Posts in db
app.delete('/posts/:id', (req, res) => {
	let id = Number(req.params.id);
	Post.findOne({
		where: {
			id: id
		}
	})
		.then((post) => {
			console.log('Deleting');
			return post.destroy();
		})
		.then((result) => {
			console.log('Deleted');
			res.redirect('/admin');
		});
});

// To fill previous values for updation
app.get('/posts/:id', (req, res) => {
	const id = req.params.id;
	Post.findOne({
		where: {
			id: id
		}
	}).then((post) => {
		res.send(post);
	});
});

// Updating values in db
app.put('/posts/:id', async (req, res) => {
	const id = req.params.id;
	const updatedValues = {
		title: req.body.title,
		text: req.body.text,
		description: req.body.description
	};
	const result = await Post.update(updatedValues, {
		where: {
			id: id
		}
	});
	console.log(result);
	res.send('Updated');
});

// Creating mails in db
app.post('/mails', (req, res) => {
	Email.create({
		email: req.body.email,
		name: req.body.name,
		text: req.body.message
	})
		.then((result) => {
			console.log('Created');
			res.redirect('/');
		})
		.catch((err) => {
			console.log(err);
		});
});

// Deleting mails in db
app.delete('/mails/:id', (req, res) => {
	const id = req.params.id;
	Email.findOne({
		where: {
			id: id
		}
	})
		.then((email) => {
			console.log('Deleting');
			return email.destroy();
		})
		.then((result) => {
			console.log(result);
			res.send('Deleted');
		});
});

// Handle requests on the details page
app.get('/detail/:id', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findOne({
		where: {
			id: id
		}
	});
	res.render('detail', {
		title: post.title,
		imageURL: post.imageURL,
		date: post.createdAt,
		text: post.text
	});
});

sequelize
	.sync()
	.then(() => {
		app.listen(3000, (req, res) => {
			console.log('Listening on port 3000');
		});
	})
	.catch((err) => {
		console.log(err);
	});
