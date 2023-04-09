const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const logger = require("../utils/logger");

// login protection
exports.onlyLoggedIn = async (req, res, next) => {
	let token;

	// cheking if there is a header with Bearers
	const authorizationHeader = req.headers.authorization

	if(authorizationHeader && authorizationHeader.startsWith("Bearer")){
		token = authorizationHeader.split(" ")[1]
	}
	
	if(!token){
		return next(new ErrorResponse("You are not authorized to access this route", 401))
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findById(decoded.id)

		if (!user) {

			return next(new ErrorResponse("Access denied", 403))
		}

		req.user = user

		next()

	} catch (error) {
		logger.error(`Catch admin error: ${JSON.stringify(error)}`)
		return next(new ErrorResponse("Not authorized to access this route", 400))
	}
}

// only admin
exports.onlyAdmin = async (req, res, next) => {
	let adminToken;

	const authorizationHeader = req.headers.authorization


	if(authorizationHeader && authorizationHeader.startsWith("Bearer")){
		adminToken = authorizationHeader.split(" ")[1]
	}

	if (!adminToken){
		return next(new ErrorResponse("You are not authorized to access this route", 401))
	}

	try {
		const decoded = jwt.verify(adminToken, process.env.JWT_SECRET)
		
		const admin = await User.findById(decoded.id)

		if(!admin){
			return next(new ErrorResponse("Access denied", 403))
		}

		if(!admin.authorization === "admin"){
			return next(new ErrorResponse("This route is meant for admins only", 401))
		}

		req.user = admin

		next()

	} catch (error) {
		logger.error(`Catch admin error: ${JSON.stringify(error)}`)
		return next(new ErrorResponse("Not authorized to access this route", 401))
	}
}