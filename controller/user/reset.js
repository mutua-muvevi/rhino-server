const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../model/user");
const crypto = require("crypto");
const logger = require("../../utils/logger");

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
			message: "Password updated successfully"
		})

	} catch (error) {
		logger.error(`Catch reeset password error: ${JSON.stringify(error)}`)
		next(error)
	}

}