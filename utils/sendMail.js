const nodemailer = require("nodemailer");
const logger = require("./logger");

const sendEmail = (options) => {

	// the transporter that will send the mail
	const transporter = nodemailer.createTransport({
		service : process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	})

	// mail options
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: options.to,
		subject: options.subject,
		html: options.html
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error){
			logger.error(`Send Mail Error : ${error}`)
		} else {
			logger.info(`Transporter: Email sent successfully`)
		}
	})
}

module.exports = sendEmail