const express = require("express");
const {
    getAllAdvertisements,
    createAdvertisement,
    getAdvertisementByID,
    updateAdvertisement,
    deleteAdvertisement,
    getAdvertisementByUserID,
} = require("../controllers/advertisementController");

const router = express.Router();

router.route("/").get(getAllAdvertisements).post(createAdvertisement);
router.route("/:id").get(getAdvertisementByID).put(updateAdvertisement).delete(deleteAdvertisement);

// get advertisement by userID
router.route("/user/:id").get(getAdvertisementByUserID);
module.exports = router;
