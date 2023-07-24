const Storage = require("../../model/storage");
const ErrorResponse = require("../../utils/errorResponse");

// update a given storage
exports.editStorage = async (req, res, next) => {
	const { id } = req.params
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

	try {console.log("body", req.body)
	console.log("req params", req.params)

		// find if track number exits
		const existTrackNo = await Storage.findOne({trackno})

		if(!existTrackNo){
			return next(new ErrorResponse("Invalid track number", 400))
		}

		//check if the id exists
		let storage = await Storage.findById(id)

		if(!storage){
			return next(new ErrorResponse("That storage record does not exist", 404))
		}

		//update
		if (depositorFullname) storage.depositor.fullname = depositorFullname
		if (depositorEmail) storage.depositor.email = depositorEmail
		if (depositorTelephone) storage.depositor.telephone = depositorTelephone
		if (depositorCompany) storage.depositor.company = depositorCompany
		if (depositorAddress) storage.depositor.address = depositorAddress

		if (consigneeFullname) storage.cosignee.fullname = consigneeFullname
		if (consigneeEmail) storage.cosignee.email = consigneeEmail
		if (consigneeTelephone) storage.cosignee.telephone = consigneeTelephone
		if (consigneeCompany) storage.cosignee.company = consigneeCompany
		if (consigneeAddress) storage.cosignee.address = consigneeAddress

		if (receiverFullname) storage.receiver.fullname = receiverFullname
		if (receiverEmail) storage.receiver.email = receiverEmail
		if (receiverTelephone) storage.receiver.telephone = receiverTelephone
		if (receiverDate) storage.receiver.date = receiverDate
		if (receiverTime) storage.receiver.time = receiverTime
		if (receiverReceiptNo) storage.receiver.receiptNo = receiverReceiptNo

		if (acceptedFromDate) storage.acceptance.from.date = acceptedFromDate
		if (acceptedFromTime) storage.acceptance.from.time = acceptedFromTime
		if (acceptedToDate) storage.acceptance.to.date = acceptedToDate
		if (acceptedToTime) storage.acceptance.to.time = acceptedToTime

		if (ownerFullname) storage.owner.fullname = ownerFullname
		if (ownerEmail) storage.owner.email = ownerEmail
		if (ownerTelephone) storage.owner.telephone = ownerTelephone
		if (ownerCompany) storage.owner.company = ownerCompany
		if (ownerAddress) storage.owner.address = ownerAddress
		if (ownerAccountNumber) storage.owner.accountNo = ownerAccountNumber

		if (productDetailArray) storage.productDetails = productDetailArray

		if (privateMarks) storage.privateMarks = privateMarks
		if (handlingCharges) storage.handlingCharges = handlingCharges
		if (assuredFor) storage.assuredFor = assuredFor
		if (receiptNumber) storage.receiptNumber = receiptNumber
		if (receiptValidUpTo) storage.receiptValidUpTo = receiptValidUpTo
		if (productOrigin) storage.productOrigin = productOrigin

		await storage.save()

		//send
		res.status(200).json({
			succes: true,
			data: storage
		})
	} catch (error) {
		next(error)
	}

}