const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema({
	fullname: {
		type: String,
		minlength: [3, "The minimum length required for fullname is 3"],
		maxlength: [100, "The maximum length required for fullname is 100"],
		required: [true, "Fullname is required"],
	},
	email: {
		type: String,
		minlength: [3, "The minimum length required for email is 3"],
		maxlength: [100, "The maximum length required for email is 100"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true,
		required: [true, "Email is required"],
	},
	telephone: {
		type: String,
		minlength: [3, "The minimum length required for telephone is 3"],
		maxlength: [100, "The maximum length required for telephone is 100"],
		required: [true, "Telephone is required "],
	},
	company: {
		type: String,
		minlength: [3, "The minimum length required for company is 3"],
		maxlength: [100, "The maximum length required for company is 100"],
		required: [true, "Company is required "],
	},

	trackno: {
		type: String,
		minlength: [3, "The minimum length required for track number is 3"],
		maxlength: [100, "The maximum length required for track number is 100"],
		required: [true, "Track number is required "],
		trim: true,
		unique: true
	},
	product: {
		type: String,
		minlength: [3, "The minimum length required product is 3"],
		maxlength: [100, "The maximum length required product is 100"],
		required: [true, "Product name is required "],
	},
	weight: {
		type: Number,
		maxlength: [100, "The maximum length required for weight is 100"],
		required: [true, "Product weight is required "],
	},
	description: {
		type: String,
		minlength: [3, "The minimum length required for description is 3"],
		maxlength: [100, "The maximum length required for description is 100"],
		required: [true, "Description is required "],
	},

	storageaddress: {
		type: String,
		minlength: [3, "The minimum length required for storage address is 3"],
		maxlength: [100, "The maximum length required for storage address is 100"],
		required: [true, "Storage address is required "],
	},

	datein: {
		type: String,
		minlength: [3, "The minimum length required for date in is 3"],
		maxlength: [100, "The maximum length required for date in is 100"],
		required: [true, "Date in is required "],
	},
	dateout: {
		type: String,
		default: ""
	},
	timein: {
		type: String,
		minlength: [3, "The minimum length required for time in is 3"],
		maxlength: [100, "The maximum length required for time in is 100"],
		required: [true, "Time in is required "],
	},
	timeout: {
		type: String,
		default: ""
	},

	
	notes: {
		type: String,
		minlength: [20, "The minimum length required for notes is 20"],
		maxlength: [1000, "The maximum length required for notes is 1000"],
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