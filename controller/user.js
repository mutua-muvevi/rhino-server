const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const sendEmail = require("../utils/sendMail");
const logger = require("../utils/logger");

const { accountEditedView } = require("../view/useredit");

// deleting a user
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		if(!user){
			return next(new ErrorResponse("Invalid User", 404))
		}

		res.status(200).json({
			success: true,
			data: "User was deleted successfully"
		})
	} catch (error) {
		logger.error(`Catch delete user error: ${JSON.stringify(error)}`)
		next(error)
	}
}

// fetch users
exports.fetchAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({authorization: "client"})
			.sort({createdAt: -1})
			.select("-password")
			.limit(10)
			
		res.status(200).json({
			success: true,
			data: users
		})
	} catch (error) {
		logger.error(`Catch fetch all user error: ${JSON.stringify(error)}`)
		next(error)
	}
}

// fetch admins
exports.fetchAllAdmins = async (req, res, next) => {
	try {
		const admins = await User.find({authorization: "admin"})
			.sort({createdAt: -1})
			.select("-password")
			.limit(10)
		
		res.status(200).json({
			success: true,
			data: admins
		})
	} catch (error) {
		logger.error(`Catch fetch all admin error: ${JSON.stringify(error)}`)
		next(error)
	}
}

// fetch single user
exports.fetchSingleUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
			.select("-password")
			.limit(10)

		if(!user){
			return next(new ErrorResponse("Invalid user", 404))
		}

		
		res.status(200).json({
			success: true,
			data: user
		})
		
	} catch (error) {
		logger.error(`Catch fetch single user error: ${JSON.stringify(error)}`)
		next(error)
	}
}

// edit user
exports.editUser = async (req, res, next) => {
	const { id } = req.params;
	const { firstname, lastname, email, telephone, city, country, authorization  } = req.body
	
	try {
		let user = await User.findById(id);

		if(!user){
			return next(new ErrorResponse("invalid user", 401))
		}

		user.firstname = firstname;
		user.lastname = lastname;
		user.email = email;
		user.telephone = telephone;
		user.city = city;
		user.country = country;
		user.authorization = authorization;
		
		await user.save()

		sendEmail({
			to: user.email,
			subject: "Account has been edited successful",
			html: accountEditedView(user)
		})

		res.status(200).json({
			success: true,
			data: user
		})

	} catch (error) {
		next(error)
	}
}

// send token
const sendToken = (user, statusCode, res) => {
	const token = user.genToken()

	res.status(statusCode).json({
		success: true,
		token
	})
}