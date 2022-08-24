const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
const logger = require("../utils/logger");

const { userCreated } = require("../view/usercreated");
const { forgotPasswordMailView } = require("../view/forgotpassword");

//resiter
exports.register = async (req, res, next) => {
	const { firstname, lastname, email, telephone, city, country, password, authorization } = req.body

	try {

		const emailExist = await User.findOne({email})

		if(emailExist){
			return next(new ErrorResponse("Invalid Email", 400))
		}
		
		const authorizationCheck = authorization.includes("user") || authorization.includes("admin")

		if(!authorizationCheck){
			return next(new ErrorResponse("Invalid user authorization", 400))
		}

		const user = await User.create({ firstname, lastname, email, telephone, city, country, password, authorization })
		
		sendToken(user, 201, res)

		try {
			sendEmail({
				to: user.email,
				subject: "Account created successfuly",
				html: userCreated(firstname, lastname, email, telephone, city, country, password, authorization)
			})
			logger.info(`Account creation email from ${email} was sent successfully`)

		} catch (error) {
			logger.error("Send mail error")
		}

	} catch (error) {
		next(error)
	}
}


// login
exports.login = async (req, res, next) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({email})
			.select("+password")

		if(!user){
			return next(new ErrorResponse("Invalid credentials", 400))
		}

		const matchPassword = await user.comparePasswords(password)

		if(!matchPassword){
			return next(new ErrorResponse("Invalid credentials", 400))
		}

		sendToken(user, 200, res)

	} catch (error) {
		next(error)
	}
}

// forgot password
exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body

	try {
		const user = await User.findOne({email})

		if(!user){
			return next(new ErrorResponse("Invalid user", 400))
		}

		const resetToken = user.genResetToken()
		user.save()

		// sending email part
		const resetUrl = `https://rhinojonprimemetals.com/auth/resetpassword/${resetToken}`
		const resetUrlDev = `http://localhost:3000/auth/resetpassword/${resetToken}`


		try {
			sendEmail({
				to: user.email,
				subject: "Password reset requested",
				html: forgotPasswordMailView(resetUrl)
			})

			res.status(200).json({
				success: true,
				data: "The Email was sent successfully"
			})

		} catch (error) {
			user.resetPasswordToken = undefined
			user.resetPasswordExpiry = undefined

			user.save()
			return next(new ErrorResponse("Email couldn't be sent", 500))
		}

	} catch (error) {
		next(error)
	}
}


// resetpassword
exports.resetpassword = async (req, res, next) => {

	const resetToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex")
	
	try {
		const user = await User.findOne({
			resetPasswordToken: resetToken,
			resetPasswordExpiry: { $gt : Date.now() }
		})
		
		if(!user){
			return next(new ErrorResponse("Invalid token", 400))
		}

		user.password = req.body.password

		user.resetPasswordToken = undefined
		user.resetPasswordExpiry = undefined

		await user.save()

		res.status(200).json({
			success: true,
			data: "Password updated successfully"
		})

	} catch (error) {
		next(error)
	}

}

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
		next(error)
	}
}

// fetch users
exports.fetchAllUsers = async (req, res, next) => {
	try {
		const users = await User.find()
			.sort({createdAt: -1})
			.select("-authorization -password")
			.limit(10)
			
		res.status(200).json({
			success: true,
			data: users
		})
	} catch (error) {
		next(error)
	}
}

// fetch admins
exports.fetchAllAdmins = async (req, res, next) => {
	try {
		const admins = await User.find({authorization: "admin"})
			.sort({createdAt: -1})
			.select("-authorization -password")
			.limit(10)
		
		res.status(200).json({
			success: true,
			data: admins
		})
	} catch (error) {
		next(error)
	}
}

// fetch single user
exports.fetchSingleUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
			.select("-authorization -password")
			.limit(10)

		if(!user){
			return next(new ErrorResponse("Invalid user", 404))
		}

		
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