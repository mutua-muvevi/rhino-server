const Storage = require("../../model/storage");
const User = require("../../model/user");
const ErrorResponse = require("../../utils/errorResponse");

// post storage
exports.postStorage = async (req, res, next) => {

	const { 
		depositorFullname,
		depositorEmail,
		depositorTelephone,
		depositorCompany,
		depositorAddress,
		
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
		ownerIdentificationNumber,

		productDetailArray,

		privateMarks,
		handlingCharges,
		assuredFor,
		receiptNumber,
		receiptValidUpTo,
		productOrigin,
		wareHouseLocation,
		receivedBy,
		depositDate,
		depositTime,

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
			identificationNo: ownerIdentificationNumber
		}

		const storage = new Storage({ 
			trackno,

			depositor: depositorItems,
			acceptance: acceptanceItems,
			owner: ownerItems,

			productDetails: productDetailArray,

			privateMarks,
			handlingCharges,
			assuredFor,
			receiptNumber,
			receiptValidUpTo,
			productOrigin,
			wareHouseLocation,
			receivedBy,
			depositDate,
			depositTime,

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