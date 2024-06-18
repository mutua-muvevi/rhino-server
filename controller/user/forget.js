const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../model/user");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendMail");
const logger = require("../../utils/logger");

const { forgotPasswordMailView  } = require("../../view/forgotpassword");

//forgot password request that sends email
exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if(!user){
			return next(new ErrorResponse("Invalid user", 400))
		}

		const resetToken = user.genResetToken();

		await user.save();

		// sending email part
		const resetUrl = `https://rhinojonprimemetals.com/auth/resetpassword/${resetToken}` 
		const resetUrlDev = `http://localhost:3000/auth/resetpassword/${resetToken}`

		const emailData = {
			to: email,
			from: process.env.SEND_EMAIL_FROM,
			subject: "Account Activation Link",
			html: forgotPasswordMailView(resetUrlDev)
		}

		try {
			const send = await sendEmail(emailData)

			logger.info(`Send Email: ${JSON.stringify(send)}`)
			
			res.status(200).json({
				success: true,
				message: "An email with instructions has been sent to your email"
			})
		} catch (err) {
			user.resetPasswordToken = undefined
			user.resetPasswordExpiry = undefined

			await user.save()
			logger.error(`Send Email Error: ${JSON.stringify(err)}`)
			return next(new ErrorResponse("Email couldn't be sent", 500))
		}


	} catch (error) {
		logger.error(`Catch forgot password error: ${JSON.stringify(error)}`)
		next(error)
	}
}