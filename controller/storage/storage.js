const Storage = require("../../model/storage");
const User = require("../../model/user");
const ErrorResponse = require("../../utils/errorResponse");


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