const express = require("express");
const {
    getAllDonations,
    insertDonation,
    getDonationByID,
    deleteDonation,
    getDonationsByUserID,
    getDonationsByShelterID
} = require("../controllers/donationsController");

const router = express.Router();

router.route("/").get(getAllDonations).post(insertDonation);
router.route("/:id").get(getDonationByID).delete(deleteDonation);
router.route("/user/:id").get(getDonationsByUserID);
router.route("/shelter/:id").get(getDonationsByShelterID);

module.exports = router;