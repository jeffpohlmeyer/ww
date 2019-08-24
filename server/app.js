const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true
	})
);

mongoose
	.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0-ymary.mongodb.net/${process.env.ATLAS_DB}?retryWrites=true&w=majority`,
	// .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}`,
		{
			useNewUrlParser: true
		})
	.then(() => {
		app.listen(3000);
	})
	.catch(err => {
		console.log(err)
	});


// mongoose
// 	.connect(
// 		`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}`
// 	).then(() => {
// 	app.listen(3000);
// })
// 	.catch(err => {
// 		console.log(err);
// 	});
