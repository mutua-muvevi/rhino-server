const mongoose = require("mongoose");

const StorageSchem = new mongoose.Schema({
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

const DepositorSchema = new mongoose.Schema({
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
	},
	telephone: {
		type: String,
		minlength: [3, "The minimum length required for telephone is 3"],
		maxlength: [100, "The maximum length required for telephone is 100"],
	},
	company: {
		type: String,
		minlength: [3, "The minimum length required for company is 3"],
		maxlength: [100, "The maximum length required for company is 100"],
	},
	address: {
		type: String,
		minlength: [3, "The minimum length required for depositor address is 3"],
		maxlength: [100, "The maximum length required for depositor address is 100"],
	},
});

const AcceptanceSchema = new mongoose.Schema({
	from: new mongoose.Schema({
		date: {
			type: String,
			minlength: [3, "The minimum length required for date is 3"],
			maxlength: [100, "The maximum length required for date is 100"],
		},
		time: {
			type: String,
			minlength: [3, "The minimum length required for time is 3"],
			maxlength: [100, "The maximum length required for time is 100"],
		},
	}),
	to: new mongoose.Schema({
		date: {
			type: String,
			minlength: [3, "The minimum length required for date is 3"],
			maxlength: [100, "The maximum length required for date is 100"],
		},
		time: {
			type: String,
			minlength: [3, "The minimum length required for time is 3"],
			maxlength: [100, "The maximum length required for time is 100"],
		},
	}),
});

const OwnerSchema = new mongoose.Schema({
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
	},
	telephone: {
		type: String,
		minlength: [3, "The minimum length required for telephone is 3"],
		maxlength: [100, "The maximum length required for telephone is 100"],
	},
	address: {
		type: String,
		minlength: [3, "The minimum length required for depositor address is 3"],
		maxlength: [100, "The maximum length required for depositor address is 100"],
		required: [true, "Depositor address is required "],
	},
	company: {
		type: String,
		minlength: [3, "The minimum length required for company is 3"],
		maxlength: [100, "The maximum length required for company is 100"],
	},
	accountNo: {
		type: String,
		minlength: [3, "The minimum length required for account number is 3"],
		maxlength: [100, "The maximum length required for account number is 100"],
	},
});

const ProductDetailSchema = new mongoose.Schema({
	HSCode: {
		type: String,
		minlength: [3, "The minimum length required for HS code is 3"],
		maxlength: [100, "The maximum length required for HS code is 100"],
	},
	packagesNo: {
		type: String,
		maxlength: [100, "The maximum length required for number of packages is 100"],
	},
	netQuantity: {
		type: String,
		minlength: [3, "The minimum length required for net quantity is 3"],
		maxlength: [100, "The maximum length required for net quantity is 100"],
	},
	marketRate: {
		type: String,
		minlength: [3, "The minimum length required for market rate is 3"],
		maxlength: [100, "The maximum length required for market rate is 100"],
	},
	totalMarketValue: {
		type: String,
		minlength: [3, "The minimum length required for total market value is 3"],
		maxlength: [100, "The maximum length required for total market value is 100"],
	},
	description: {
		type: String,
		minlength: [20, "The minimum length required for description is 20"],
		maxlength: [1000, "The maximum length required for description is 1000"],
		required: [true, "Description is required "],
	},
});

const StorageSchema = new mongoose.Schema({
	depositor: DepositorSchema,
	acceptance: AcceptanceSchema,
	owner: OwnerSchema,
	productDetails: [ProductDetailSchema],

	privateMarks: {
		type: String,
		minlength: [3, "The minimum length required for private marks is 3"],
		maxlength: [100, "The maximum length required for private marks is 100"],
	},
	handlingCharges: {
		type: String,
		minlength: [3, "The minimum length required for handling charges is 3"],
		maxlength: [100, "The maximum length required for handling charges is 100"],
	},
	assuredFor: {
		type: String,
		minlength: [3, "The minimum length required for assured for is 3"],
		maxlength: [100, "The maximum length required for assured for is 100"],
	},
	receiptNumber: {
		type: String,
		minlength: [3, "The minimum length required for receipt number is 3"],
		maxlength: [100, "The maximum length required for receipt number is 100"],
		required: [true, "Receipt number is required"]
	},
	receiptValidUpTo: {
		type: String,
		minlength: [3, "The minimum length required for receipt validation period is 3"],
		maxlength: [100, "The maximum length required for receipt validation period is 100"],
	},
	productOrigin: {
		type: String,
		minlength: [3, "The minimum length required for product origin is 3"],
		maxlength: [100, "The maximum length required for product origin is 100"],
	},
	trackno: {
		type: String,
		minlength: [3, "The minimum length required for track number is 3"],
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