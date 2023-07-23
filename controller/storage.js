const Storage = require("../model/storage");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

// post storage
exports.postStorage = async (req, res, next) => {

	const { 
		depositorFullname,
		depositorEmail,
		depositorTelephone,
		depositorCompany,
		depositorAddress,
		
		
		consigneeFullname,
		consigneeEmail,
		consigneeTelephone,
		consigneeCompany,
		consigneeAddress,
		
		
		receiverFullname,
		receiverEmail,
		receiverTelephone,
		receiverDate,
		receiverTime,
		receiverReceiptNo,
		
		acceptedFromDate,
		acceptedFromTime,
		acceptedToDate,
		acceptedToTime,
		
		ownerFullname,
		ownerEmail,
		ownerTelephone,
		ownerCompany,
		ownerAddress,
		ownerAccountNumber,

		productDetailArray,

		privateMarks,
		handlingCharges,
		assuredFor,
		receiptNumber,
		receiptValidUpTo,
		productOrigin,

		trackno

	 } = req.body
	
	try {
		const existingTrackNo = await Storage.findOne({trackno})

		if (existingTrackNo) {
			return next(new ErrorResponse("This track number already exists, please try another", 400))
		}

		const depositorItems = {
			fullname: depositorFullname,
			email: depositorEmail,
			telephone: depositorTelephone,
			company: depositorCompany,
			address: depositorAddress,
		}

		const consigneeItems = {
			fullname: consigneeFullname,
			email: consigneeEmail,
			telephone: consigneeTelephone,
			company: consigneeCompany,
			address: consigneeAddress,
		}

		const receiverItems = {
			fullname: receiverFullname,
			email: receiverEmail,
			telephone: receiverTelephone,
			date: receiverDate,
			time: receiverTime,
			receiptNo: receiverReceiptNo,
		}

		const acceptanceItems = {
			from: {
				date: acceptedFromDate,
				time: acceptedFromTime
			},
			to: {
				date: acceptedToDate,
				time: acceptedToTime
			},
		}


		const ownerItems = {
			fullname: ownerFullname,
			email: ownerEmail,
			telephone: ownerTelephone,
			company: ownerCompany,
			address: ownerAddress,
			accountNo: ownerAccountNumber,
		}

		const storage = new Storage({ 
			trackno,

			depositor: depositorItems,
			cosignee: consigneeItems,
			receiver: receiverItems,
			acceptance: acceptanceItems,
			owner: ownerItems,

			productDetailArray,
			privateMarks,
			handlingCharges,
			assuredFor,
			receiptNumber,
			receiptValidUpTo,
			productOrigin,

		})

		if(!storage){
			return next(new ErrorResponse("Something went wrong while creating storage", 400))
		}

		await storage.save()

		res.status(201).json({
			success: true,
			data: storage
		})
		
	} catch (error) {
		next(error)
	}
}
// update a given storage
exports.updateStorage = async (req, res, next) => {
	const { fullname, email, telephone, company, trackno, product, weight, description, storageaddress, datein, dateout, timein, timeout, notes } = req.body

	try {

		const storage = await Storage.findByIdAndUpdate(
			req.params.id,
			{ fullname, email, telephone, company, trackno, product, weight, description, storageaddress, datein, dateout, timein, timeout, notes },
			{ new: true }
		)

		if(!storage){
			return next(new ErrorResponse("That storage record does not exist", 404))
		}

		res.status(200).json({
			succes: true,
			data: storage
		})
	} catch (error) {
		next(error)
	}

}

// get all storage
exports.getAllStorage = async (req, res, next) => {
	try {
		const storageRecords = await Storage.find({}).sort({createdAt: -1})

		// console.log(storageRecords)

		res.status(200).json({
			success: true,
			data: storageRecords
		})
	} catch (error) {
		next(error)
	}
}

// get specific storage
exports.getSingleStorage = async (req, res, next) => {
	try {
		const storageRecord = await Storage.findById(req.params.id)

		res.status(200).json({
			success: true,
			data: storageRecord
		})
		
	} catch (error) {
		next(error)
	}
}


// get by track number
exports.getStorageByTrack = async (req, res, next) => {
	
	const { trackno } = req.body

	try {
		if (!trackno){
			return next(new ErrorResponse("Stored Item Track number is required", 400))
		}
		
		const storage = await Storage.findOne({ trackno })

		if (!storage){
			return next(new ErrorResponse("No stored item with that track number!", 400))
		}

		res.status(200).json({
			success: true,
			data: storage
		})

	} catch (error) {
		next(error)
	}
}

// delete a given storage item
exports.deleteStorage = async (req, res, next) => {
	try {
		const storage = await Storage.findByIdAndDelete(req.params.id)

		if(!storage){
			return next(new ErrorResponse("That storage item does not exist", 404))
		}

		res.status(200).json({
			success: true,
			data: "The storage item was deleted successfully"
		})
	} catch (error) {
		next(error)
	}
}