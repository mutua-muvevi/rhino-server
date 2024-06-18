const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../model/user");
const sendEmail = require("../../utils/sendMail");
const logger = require("../../utils/logger");

exports.register = async (req, res, next) => {
	const {
		firstname,
		lastname,
		email,
		telephone,
		city,
		country,
		password,

		authorization,
	} = req.body;

	try {
		const emailExist = await User.findOne({ email });

		if (emailExist) {
			return next(new ErrorResponse("User already exists", 400));
		}

		const authorizationCheck =
			authorization.includes("client") || authorization.includes("admin");

		if (!authorizationCheck) {
			return next(new ErrorResponse("Invalid user authorization", 400));
		}

		const user = await User.create({
			firstname,
			lastname,
			email,
			telephone,
			city,
			country,
			password,
			authorization,
		});

		const token = user.genToken();

		res.status(201).json({
			success: true,
			token,
			data: user,
			message: "User was created successfully"
		});
	} catch (error) {
		logger.error(`Catch registration error: ${JSON.stringify(error)}`);
		next(error);
	}
};
