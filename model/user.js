const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt")

// the user schema
const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		minlength: [3, "The minimum length required for firstname is 3"],
		maxlength: [50, "The maximum length required for firstname is 50"],
		required: [true, "Firstname is required"],
		trim: true
	},
	lastname: {
		type: String,
		minlength: [3, "The minimum length required for lastname is 3"],
		maxlength: [50, "The maximum length required for lastname is 50"],
		required: [true, "Lastname is required"],
		trim: true
	},
	email: {
		type: String,
		minlength: [3, "The minimum length required for email is 3"],
		maxlength: [100, "The maximum length required for email is 100"],
		required: [true, "Email is required"],
		match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please add a valid email"],
		trim: true
	},
	telephone: {
		type: String,
		minlength: [7, "The minimum length required for telephone is 7"],
		maxlength: [25, "The maximum length required for telephone is 25"],
		required: [true, "Telephone is required"],
		trim: true
	},
	city: {
		type: String,
		minlength: [3, "The minimum length required for city is 3"],
		maxlength: [100, "The maximum length required for city is 100"],
		required: [true, "City is required"],
		trim: true
	},
	country: {
		type: String,
		minlength: [3, "The minimum length required for country is 3"],
		maxlength: [100, "The maximum length required for country is 100"],
		required: [true, "Country is required"],
		trim: true
	},
	password: {
		type: String,
		minlength: [5, "The minimum length required for password 5"],
		maxlength: [2500, "Too long password"],
		required: [true, "Password is required"]
	},
	authorization: {
		type: String,
		enum: ["admin", "client"],
		default: "user"
	},
	resetPasswordToken : String,
	resetPasswordExpiry : Date
}, {
	timestamps: true,
	collection: "user",
})

// hashing the passowrds
UserSchema.pre("save", async function(next){
	if(!this.isModified("password")){
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

// comparing passwords
UserSchema.methods.comparePasswords = async function(password){
	return await bcrypt.compare(password, this.password)
}

// generating json tokens
UserSchema.methods.genToken = function(){
	return jwt.sign(
		{id: this._id, authorization: this.authorization},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRY }
	)
}

// generating reset token
UserSchema.methods.genResetToken = function(){
	const resetToken = crypto.randomBytes(10).toString("hex")

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex")
	
	this.resetPasswordExpiry = Date.now() + 240 * (60 * 1000)
	return resetToken
}

// the model
const User = mongoose.model("User", UserSchema)
module.exports = User