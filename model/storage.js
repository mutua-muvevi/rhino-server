const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema({
	fullname: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Fullname is required"],
	},
	email: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true,
		required: [true, "Email is required"],
	},
	telephone: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Telephone is required "],
	},
	company: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Company is required "],
	},

	trackno: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Track number is required "],
		trim: true,
		unique: true
	},
	product: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Product name is required "],
	},
	weight: {
		type: Number,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Product weight is required "],
	},
	description: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Description is required "],
	},

	storageaddress: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Storage address is required "],
	},

	datein: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Date in is required "],
	},
	dateout: {
		type: String,
		default: "In Storage"
	},
	timein: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Time in is required "],
	},
	timeout: {
		type: String,
		default: "In Storage"
	},

	
	notes: {
		type: String,
		minlength: [20, "The minimum length required is 20"],
		maxlength: [1000, "The maximum length required is 1000"],
		required: [true, "Notes is required"]
	},
	
	date: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: true,
	collection: "storage records"
})

const Storage = mongoose.model("storage", StorageSchema)
module.exports = Storage