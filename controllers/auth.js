const jwt = require('jsonwebtoken');
const secret = 'hfshidbfhsbdhf3210';

const generateToken = (user) => {
	let payload = {
		email: user.email,
		password: user.password
	};
	return jwt.sign(payload, secret);
};

const checkToken = (token) => {
	return jwt.verify(token, secret);
};

module.exports = { generateToken, checkToken };
