const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const mg = require('nodemailer-mailgun-transport');

const User = require('../../models/user');
const { jwtToken } = require('./utils/auth');

const auth = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	}
};

module.exports = {

	createUser: async args => {
		try {
			const foundUser = await User.findOne({email: args.userInput.email});
			if (!!foundUser) {
				throw new Error('This email address is already registered.')
			}
			const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
			const token = randomstring.generate();
			const now = new Date;
			const tokenExpiration = new Date(now.getTime() + 30*60000);
			const user = new User({
				email: args.userInput.email,
				password: hashedPassword,
				token,
				tokenExpiration
			});

			await user.save();
			const nodemailerMailgun = nodemailer.createTransport(mg(auth));

			const link = `${process.env.CLIENT_URL}/user/register-confirm/${token}`;

			const mailOptions = {
				from: process.env.MAILGUN_SENDER,
				to: args.userInput.email,
				subject: "WW Registration Confirmation",
				generateTextFromHTML: true,
				html: `<h1>Email Confirmation Link</h1><div><p>Follow <a href='${link}' target="_blank">this link</a> to confirm your email address.</p><p>The link expires on ${tokenExpiration}.</p></div>`
			};

			await nodemailerMailgun.sendMail(mailOptions);

			return Promise.resolve();
		} catch (err) {
			throw err;
		}
	},
	validateEmail: async args => {
		try {
			const user = await User.findOne({token: args.token});
			if (!user) {
				throw new Error('The token provided is invalid.  Please try to re-send the validation email.');
			}
			user.isValidated = true;
			await user.save();
			const token = await jwtToken(user);
			return { userId: user.id, token, tokenExpiration: 1, email: user.email }
		} catch(err) {
			throw err;
		}
	},
	login: async ({email, password}) => {
		try {
			const user = await User.findOne({email});
			if (!user) {
				throw new Error('User does not exist!');
			}
			const isEqual = await bcrypt.compare(password, user.password);
			if (!isEqual) {
				throw new Error('The password is incorrect');
			}
			const token = await jwtToken(user);
			return { userId: user.id, token, tokenExpiration: 1 }
		} catch(err) {
			throw err;
		}
	},
	getUsernames: async (args, req) => {
		// if (!req.isAuth) {
		// 	throw new Error('You are not authorized to do this.');
		// }
		try {
			const names = await User.find();
			return names.map(e => e.username);
		} catch(err) {
			throw err;
		}
	}
};