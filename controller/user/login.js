const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
const logger = require("../utils/logger");

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return next(new ErrorResponse("Invalid credentials", 400));
		}

		const matchPassword = await user.comparePasswords(password);

		if (!matchPassword) {
			return next(new ErrorResponse("Invalid credentials", 400));
		}

		const token = user.genToken();

		res.status(200).json({
			success: true,
			token,
			message: "User logged in successfully"
		});

	} catch (error) {
		logger.error(`Catch login error: ${JSON.stringify(error)}`)
		next(error)
	}
};
