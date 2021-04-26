const express = require('express');
const app = express();
const sequelize = require('./utils/database');
let Post = require('./models/posts');
let Email = require('./models/emails');
let User = require('./models/users');
const bcrypt = require('bcrypt');
const auth = require('./controllers/auth');
const cookieParser = require('cookie-parser');
const { response } = require('express');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Handling homepage
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

// Handling admin and login
app.get('/admin', async (req, res) => {
	let token = req.cookies['auth_token'];
	if (token && auth.checkToken(token)) {
		const posts = await Post.findAll();
		const mails = await Email.findAll();
		res.render('admin', {
			posts: posts,
			mails: mails
		});
	} else {
		res.redirect('/login');
	}
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

app.get('/login', (req, res) => {
	res.render('login', {});
});

// Handling Login
app.post('/users/login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const user = await User.findOne({
		where: {
			email: email
		}
	});
	if (user) {
		const result = await bcrypt.compare(password, user.password);
		if (result) {
			let token = auth.generateToken(user);
			res.cookie('auth_token', token);
			res.send({
				redirectURL: '/admin'
			});
		} else {
			res.status(400);
			res.send('Rejected');
		}
	} else {
		res.send('No such user exists');
	}
});

// Handling Registration
app.post('/users/register', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const user = await User.findOne({
		where: {
			email: email
		}
	});
	if (!user) {
		const encryptedPass = await bcrypt.hash(password, 12);
		const response = await User.create({
			email: email,
			password: encryptedPass
		});
		console.log(response);
		res.send('User Created');
	} else {
		res.send('User already exists');
	}
});

sequelize
	.sync()
	.then(() => {
		app.listen(process.env.PORT || 3000, (req, res) => {
			console.log(`Listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
