
exports.getMe = async ( req, res, next ) => {
	if(req.user.id) req.params.id = req.user._id;
	// console.log(req.user)
	next();
}