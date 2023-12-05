const express = require("express");
const {
    getAllDonations,
    insertDonation,
    getDonationByID,
    deleteDonation,
    getDonationsByUserID,
    getDonationsByShelterID
} = require("../controllers/donationsController");

/**
* @swagger
* tags:
*   - name: Donations
*     description: API endpoints for managing donations
*
* /donations:
*   get:
*     tags: [Donations]
*     summary: Get all donations
*     description: Retrieve a list of all donations.
*     responses:
*       200:
*         description: A list of donations.
*   post:
*     tags: [Donations]
*     summary: Create a new donation
*     description: Create a new donation.
*     responses:
*       200:
*         description: The created donation.
* /donations/{id}:
*   get:
*     tags: [Donations]
*     summary: Get a donation by ID
*     description: Retrieve a donation by its ID.
*     parameters:
*       - in: path
*         name: id
*         description: donation ID
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: The requested donation.
*   delete:
*     tags: [Donations]
*     summary: Delete a donation
*     description: Delete a donation.
*     parameters:
*       - in: path
*         name: id
*         description: Donation ID
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: The deleted donation.
* /donations/user/{id}:
*   get:
*     tags: [Donations]
*     summary: Get donations by user ID
*     description: Retrieve donations associated with a user by their ID.
*     parameters:
*       - in: path
*         name: user_id
*         description: user ID
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: A list of donations associated with the user.
* /donations/shelter/{id}:
*   get:
*     tags: [Donations]
*     summary: Get donations by shelter ID
*     description: Retrieve donations associated with a shelter by their ID.
*     parameters:
*       - in: path
*         name: shelter_id
*         description: shelter ID
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: A list of donations associated with the shelter.
*/
const router = express.Router();

router.route("/").get(getAllDonations).post(insertDonation);
router.route("/:id").get(getDonationByID).delete(deleteDonation);
router.route("/user/:id").get(getDonationsByUserID);
router.route("/shelter/:id").get(getDonationsByShelterID);

module.exports = router;
