const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SEND_EMAIL_API_KEY, {
	origin: "https://api.eu.sparkpost.com",
});

const SendEmail = async ({ to, from, subject, html }) => {
	console.log("Value from email is", to, from, subject, html)

	const response = await client.transmissions.send({
		content: {
			from,
			subject,
			html,
		},
		recipients: [{ address: to }],
	});

	return response;
};

module.exports = SendEmail;
