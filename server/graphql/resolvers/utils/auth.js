const jwt = require('jsonwebtoken');

const jwtToken = async user => {
	return jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
};

exports.jwtToken = jwtToken;