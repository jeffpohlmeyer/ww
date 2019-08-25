const { buildSchema } = require('graphql');

module.exports = buildSchema(`
		type Food {
			_id: ID!
			name: String!
			fat: Float!
			carbs: Float!
			fiber: Float!
			protein: Float!
			points: Int!
			quantity: Float!
			link: String
			notes: String
		}
		
		type Recipe {
			_id: ID!
			name: String!
			fat: Float!
			carbs: Float!
			fiber: Float!
			protein: Float!
			points: Int!
			quantity: Float!
			link: String
			notes: String
			creator: User
		}
		
		type User {
			_id: ID!
			email: String!
			username: String
			password: String
			startDay: Int
			flexPoints: Int
			height: Float
			birthDate: String
			createdRecipes: [Recipe!]
		}
				
		type AuthData {
			userId: ID!
			token: String!
			tokenExpiration: Int!
		}
		
		type Week {
			_id: ID!
			weight: Float!
			points: Int!
			flexPoints: Int!
			startDate: String!
			days: [Day!]!
		}
		
		type Day {
			_id: ID!
			points: Int!
			date: String!
			dayOfWeek: String!
			periods: [Period]!
		}
		
		type Period {
			_id: ID!
			timePeriod: String!
			foods: [Food]!
			recipes: [Recipe]!
		}
				
		input FoodInput {
			name: String!
			fat: Float!
			carbs: Float!
			fiber: Float!
			protein: Float!
			points: Int!
			quantity: Float!
			link: String
			notes: String
		}
		
		input RecipeInput {
			name: String!
			fat: Float!
			carbs: Float!
			fiber: Float!
			protein: Float!
			points: Int!
			quantity: Float!
			link: String
			notes: String
			foods: [String]!
			creator: String
		}
		
		input UserInput {
			email: String!
			password: String!
			username: String
			startDay: Int
			flexPoints: Int
		}
		
		input WeekInput {
			weight: Float!
			userId: String!
			startDate: String!
		}
		
		type RootQuery {
			foods: [Food!]!
			recipes: [Recipe!]!
			login(email: String!, password: String!): AuthData!
			getUsernames: [String]!
		}
		
		type RootMutation {
			createFood(foodInput: FoodInput): Food		
			createRecipe(recipeInput: RecipeInput): Recipe
			createUser(userInput: UserInput): User
			createWeek(weekInput: WeekInput): Week
		}
		
		schema {
			query: RootQuery
			mutation: RootMutation
		}	
	`);