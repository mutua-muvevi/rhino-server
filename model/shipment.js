const mongoose = require("mongoose");

// the event schema
const EventSchema = new mongoose.Schema({
	timeevents: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Time is required"]
	},
	dateevents: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Date is required"]
	},
	currentlocation: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Current Location is required"]
	},
	shippingstatus: {
		type: String,
		minlength: [3, "The minimum length required is 3"],
		maxlength: [100, "The maximum length required is 100"],
		required: [true, "Shipping status is required"]
	},
	notes: {
		type: String,
		minlength: [20, "The minimum length required is 20"],
		maxlength: [1000, "The maximum length required is 1000"],
		required: [true, "Notes is required"]
	},
	number: {
		type: Number,
	},
})

// the shipping schema
const ShippingSchema = new mongoose.Schema({
	shippersfullname: {
		type: String,
		minlength: [3, "The minimum length required for shipper's fullname is 3"],
		maxlength: [100, "The maximum length required for shipper's fullname is 100"],
		required: [true, " is required"],
	},
	shippersemail: {
		type: String,
		minlength: [3, "The minimum length required for shipper's email is 3"],
		maxlength: [100, "The maximum length required for shipper's email is 100"],
		required: [true, "Shippers email is required"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true
	},
	shipperscompany: {
		type: String,
		minlength: [3, "The minimum length required for shipper's company is 3"],
		maxlength: [100, "The maximum length required for shipper's company is 100"],
		required: [true, "Shipper's company name is required"],
	},
	shipperstelephone: {
		type: String,
		minlength: [3, "The minimum length required for shipper's telephone is 3"],
		maxlength: [100, "The maximum length required for shipper's telephone is 100"],
		required: [true, "Shippers telephone number is required"],
	},
	shippersaddress: {
		type: String,
		minlength: [3, "The minimum length required for shipper's address is 3"],
		maxlength: [100, "The maximum length required for shipper's address is 100"],
		required: [true, "Shippers address is required"],
	},


	consignfullname: {
		type: String,
		minlength: [3, "The minimum length required for cosignee's fullname is 3"],
		maxlength: [100, "The maximum length required for cosignee's fullname is 100"],
		required: [true, "Consign fullname is required "],
	},
	consignemail: {
		type: String,
		minlength: [3, "The minimum length required for cosignee's email is 3"],
		maxlength: [100, "The maximum length required for cosignee's email is 100"],
		required: [true, "Consign email is required"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true
	},
	consigncompany: {
		type: String,
		minlength: [3, "The minimum length required for cosignee's company is 3"],
		maxlength: [100, "The maximum length required for cosignee's company is 100"],
		required: [true, "Consign company's name is required "],
	},
	consigntelephone: {
		type: String,
		minlength: [3, "The minimum length required for cosignee's telephone is 3"],
		maxlength: [100, "The maximum length required for cosignee's telephone is 100"],
		required: [true, "Consign telephone number is required "],
	},
	consignaddress: {
		type: String,
		minlength: [3, "The minimum length required for cosignee's address  is 3"],
		maxlength: [100, "The maximum length required for cosignee's address is 100"],
		required: [true, "Cosign address is required"],
	},


	
	collectorfullname: {
		type: String,
		minlength: [3, "The minimum length required for collector fullname is 3"],
		maxlength: [100, "The maximum length required for collector fullname is 100"],
		required: [true, "Collector fullname is required "],
	},
	collectoremail: {
		type: String,
		minlength: [3, "The minimum length required for collector email is 3"],
		maxlength: [100, "The maximum length required for collector email is 100"],
		required: [true, "Collector's email is required"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
		lowercase: true
	},
	collectortel: {
		type: String,
		minlength: [3, "The minimum length required for collector telephone is 3"],
		maxlength: [100, "The maximum length required for collector telephone is 100"],
		required: [true, "Collector telephone number is required "],
	},
	collectoraddress: {
		type: String,
		minlength: [3, "The minimum length required for collector address is 3"],
		maxlength: [100, "The maximum length required for collector address is 100"],
		required: [true, "Collector address is required"],
	},


	trackno: {
		type: String,
		minlength: [3, "The minimum length required for track number is 3"],
		maxlength: [100, "The maximum length required for track number is 100"],
		required: [true, "Track number is a required field"],
		unique: true
	},
	itemsname: {
		type: String,
		minlength: [3, "The minimum length required for product's name  is 3"],
		maxlength: [100, "The maximum length required for product's name is 100"],
		required: [true, "The product's name is required"],
	},
	itemsweight: {
		type: Number,
		min: [1, "The minimum length required for product's weight is 1"],
		max: [999999999, "The maximum length required for product's weight is 999999999"],
		required: [true, "Item weight is required"],
	},
	itemsweightunit: {
		type: String,
		minlength: [3, "The minimum length required for product's weight unit is 3"],
		maxlength: [100, "The maximum length required for product's weight unit is 100"],
		required: [true, "Item weight unit is required "],
	},
	itemspieces: {
		type: Number,
		min: [1, "The minimum length required for item pieces is 1"],
		max: [999999999, "The maximum length required for item pieces is 999999999"],
		required: [true, "Pieces is required"],
	},



	departureaddress: {
		type: String,
		minlength: [3, "The minimum length required for departure address is 3"],
		maxlength: [100, "The maximum length required for departure address is 100"],
		required: [true, "Origin Service Area address is required"],
	},
	departureairportcode: {
		type: String,
		minlength: [3, "The minimum length required for departure airport code is 3"],
		maxlength: [100, "The maximum length required for departure aitport code is 100"],
		required: [true, "Origin Area Airport code is required"],
		uppercase: true
	},
	departuredate: {
		type: String,
		minlength: [3, "The minimum length required for departure date is 3"],
		maxlength: [100, "The maximum length required for departure date is 100"],
		required: [true, "Date of departure is required"],
	},
	departuretime: {
		type: String,
		minlength: [3, "The minimum length required for departure time is 3"],
		maxlength: [100, "The maximum length required for departure time is 100"],
		required: [true, "Departure time is required"],
	},



	arrivaladdress: {
		type: String,
		minlength: [3, "The minimum length required arrival address for  is 3"],
		maxlength: [100, "The maximum length required for arrival address is 100"],
		required: [true, "Destination Address is required"],
	},
	arrivalairportcode: {
		type: String,
		minlength: [3, "The minimum length required for arrival airport code  is 3"],
		maxlength: [100, "The maximum length required for arrival airport code   is 100"],
		required: [true, "Destination Address is required"],
		uppercase: true
	},
	arrivaldate: {
		type: String,
		minlength: [3, "The minimum length required for arrival date is 3"],
		maxlength: [100, "The maximum length required for arrival date is 100"],
		required: [true, "Arrival date is required"],
	},
	arrivaltime: {
		type: String,
		minlength: [3, "The minimum length required for arrival time is 3"],
		maxlength: [100, "The maximum length required for arrival time is 100"],
		required: [true, "Arrival time is required"],
	},

	events: [EventSchema],

	date: {
		type: Date,
		default: Date.now
	},

}, {
	timestamps: true,
	collection: "shipment records"
})


const Shipping = mongoose.model("shipping", ShippingSchema)
module.exports = Shipping