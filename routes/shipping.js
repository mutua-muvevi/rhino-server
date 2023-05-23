const express = require("express");
const router = express.Router();

const { onlyAdmin } = require("../middleware/auth");
const { 
    getAllShippingRecords, 
    getShippingById, 
    getShippingByTrack,
    postShipment, 
    addEvents, 
    updateEntireShipping, 
    deleteShipping, 
    editEvents,
    deleteEvent
} = require("../controller/shipping");

//shiping
router.route("/item/:id").get(onlyAdmin, getShippingById);
router.route("/all").get(onlyAdmin, getAllShippingRecords);
router.route("/post").post(onlyAdmin, postShipment);
router.route("/item/track").post(getShippingByTrack)
router.route("/item/update").put(onlyAdmin, updateEntireShipping);
router.route("/delete/:id").delete(onlyAdmin, deleteShipping);

//events
router.route("/event/add").put(onlyAdmin, addEvents);
router.route("/event/:id/edit").put(onlyAdmin, editEvents)
router.route("/event/:trackno/delete/:id").delete(onlyAdmin, deleteEvent)


module.exports = router