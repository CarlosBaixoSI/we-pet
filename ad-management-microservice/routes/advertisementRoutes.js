const express = require("express");
const {
    getAllAdvertisements,
    createAdvertisement,
    getAdvertisementByID,
    updateAdvertisement,
    deleteAdvertisement,
} = require("../controllers/advertisementController");

const router = express.Router();

router.route("/").get(getAllAdvertisements).post(createAdvertisement);
router.route("/:id").get(getAdvertisementByID).put(updateAdvertisement).delete(deleteAdvertisement);

module.exports = router;
