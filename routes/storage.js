const express = require("express");
const router = express.Router();

const { onlyAdmin } = require("../middleware/auth");
const { 
    getAllStorage, 
    getSingleStorage, 
    getStorageByTrack,
    deleteStorage
} = require("../controller/storage/storage");

const { postStorage } = require("../controller/storage/new");
const { editStorage } = require("../controller/storage/edit");

router.route("/all").get(onlyAdmin, getAllStorage)
router.route("/item/:id").get(getSingleStorage)

router.route("/post").post(onlyAdmin, postStorage)
router.route("/item/track").post(getStorageByTrack)

router.route("/update/:id").put(onlyAdmin, editStorage)

router.route("/delete/:id").delete(onlyAdmin, deleteStorage)

module.exports = router