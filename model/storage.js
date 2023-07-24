const mongoose = require("mongoose");


const DepositorSchema = new mongoose.Schema({
	fullname: {
		type: String,
		maxlength: [100, "The maximum length required for fullname is 100"],
		required: [true, "Fullname is required"],
	},
	email: {
		type: String,
		maxlength: [100, "The maximum length required for email is 100"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true,
	},
	telephone: {
		type: String,
		maxlength: [100, "The maximum length required for telephone is 100"],
	},
	company: {
		type: String,
		maxlength: [100, "The maximum length required for company is 100"],
	},
	address: {
		type: String,
		maxlength: [100, "The maximum length required for depositor address is 100"],
	},
});

const AcceptanceSchema = new mongoose.Schema({
	from: new mongoose.Schema({
		date: {
			type: String,

			maxlength: [100, "The maximum length required for date is 100"],
		},
		time: {
			type: String,

			maxlength: [100, "The maximum length required for time is 100"],
		},
	}),
	to: new mongoose.Schema({
		date: {
			type: String,

			maxlength: [100, "The maximum length required for date is 100"],
		},
		time: {
			type: String,

			maxlength: [100, "The maximum length required for time is 100"],
		},
	}),
});

const OwnerSchema = new mongoose.Schema({
	fullname: {
		type: String,
		maxlength: [100, "The maximum length required for fullname is 100"],
	},
	email: {
		type: String,
		maxlength: [100, "The maximum length required for email is 100"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true,
	},
	telephone: {
		type: String,
		maxlength: [100, "The maximum length required for telephone is 100"],
	},
	address: {
		type: String,
		maxlength: [100, "The maximum length required for depositor address is 100"],
	},
	company: {
		type: String,
		maxlength: [100, "The maximum length required for company is 100"],
	},
	accountNo: {
		type: String,
		maxlength: [100, "The maximum length required for account number is 100"],
	},
	identificationNo: {
		type: String,
		maxlength: [100, "The maximum length required for identification number is 100"],
	},
});

const ProductDetailSchema = new mongoose.Schema({
	HSCode: {
		type: String,
		maxlength: [100, "The maximum length required for HS code is 100"],
	},
	packagesNo: {
		type: String,
		maxlength: [100, "The maximum length required for number of packages is 100"],
	},
	netQuantity: {
		type: String,
		maxlength: [100, "The maximum length required for net quantity is 100"],
	},
	marketRate: {
		type: String,
		maxlength: [100, "The maximum length required for market rate is 100"],
	},
	totalMarketValue: {
		type: String,
		maxlength: [100, "The maximum length required for total market value is 100"],
	},
	description: {
		type: String,
		maxlength: [1000, "The maximum length required for description is 1000"],
	},
});

const StorageSchema = new mongoose.Schema({
	depositor: DepositorSchema,
	acceptance: AcceptanceSchema,
	owner: OwnerSchema,
	productDetails: [ProductDetailSchema],

	privateMarks: {
		type: String,
		maxlength: [100, "The maximum length required for private marks is 100"],
	},
	handlingCharges: {
		type: String,
		maxlength: [100, "The maximum length required for handling charges is 100"],
	},
	assuredFor: {
		type: String,
		maxlength: [100, "The maximum length required for assured for is 100"],
	},
	receiptNumber: {
		type: String,
		maxlength: [100, "The maximum length required for receipt number is 100"],
	},
	receiptValidUpTo: {
		type: String,
		maxlength: [100, "The maximum length required for receipt validation period is 100"],
	},
	productOrigin: {
		type: String,
		maxlength: [100, "The maximum length required for product origin is 100"],
	},
	wareHouseLocation: {
		type: String,
		maxlength: [100, "The maximum length required for warehouse location is 100"],
	},
	receivedBy: {
		type: String,
		maxlength: [100, "The maximum length required for received by is 100"],
	},
	trackno: {
		type: String,
		maxlength: [100, "The maximum length required for track number is 100"],
		required: [true, "Track number is required "],
		trim: true,
		unique: true
	},

}, {
	timestamps: true,
	collection: "storage records"
})

const Storage = mongoose.model("storage", StorageSchema)
module.exports = Storage