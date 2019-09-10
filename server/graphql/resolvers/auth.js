const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const User = require('../../models/user');

module.exports = {
	createUser: async args => {
		try {
			const foundUser = await User.findOne({email: args.userInput.email});
			if (!!foundUser) {
				throw new Error('This email address is already registered.')
			}
			const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
			const user = new User({
				email: args.userInput.email,
				password: hashedPassword
			});
			await user.save();
			return {...user._doc, password: null, _id: user._id.toString()}
		} catch (err) {
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
			const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
			return { userId: user.id, token, tokenExpiration: 1 }
		} catch(err) {
			throw err;
		}
	},
	getUsernames: async (args, req) => {
		const oauth2Client = new OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			"https://developers.google.com/oauthplayground"
		);
		oauth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN
		});
		const accessToken = oauth2Client.getAccessToken();
		const smtpTransport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "jeff.pohlmeyer@gmail.com",
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken
			}
		});
		const mailOptions = {
			from: "jeff.pohlmeyer@gmail.com",
			to: "jeffvp@protonmail.ch",
			subject: "Node.js Email with Secure OAuth",
			generateTextFromHTML: true,
			html: "<b>test</b>"
		};
		try {
			const response = await smtpTransport.sendMail(mailOptions);
			console.log('response', response)
			smtpTransport.close();
		} catch(err) {
			throw err;
		}
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