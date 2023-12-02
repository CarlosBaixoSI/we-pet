const express = require("express");
const {
    getAllAdvertisements,
    createAdvertisement,
    getAdvertisementByID,
    updateAdvertisement,
    deleteAdvertisement,
    getAdvertisementByUserID,
} = require("../controllers/advertisementController");

/**
 * @swagger
 * tags:
 *   - name: Advertisements
 *     description: API endpoints for managing advertisements
 *
 * /advertisements:
 *   get:
 *     tags: [Advertisements]
 *     summary: Get all advertisements
 *     description: Retrieve a list of all advertisements.
 *     responses:
 *       200:
 *         description: A list of advertisements.
 *   post:
 *     tags: [Advertisements]
 *     summary: Create a new advertisement
 *     description: Create a new advertisement.
 *     responses:
 *       200:
 *         description: The created advertisement.
 *
 * /advertisements/{id}:
 *   get:
 *     tags: [Advertisements]
 *     summary: Get an advertisement by ID
 *     description: Retrieve an advertisement by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the advertisement
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The retrieved advertisement.
 *   put:
 *     tags: [Advertisements]
 *     summary: Update an advertisement
 *     description: Update an existing advertisement.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the advertisement
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated advertisement.
 *   delete:
 *     tags: [Advertisements]
 *     summary: Delete an advertisement
 *     description: Delete an advertisement.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the advertisement
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted advertisement.
 *
 * /advertisements/user/{id}:
 *   get:
 *     tags: [Advertisements]
 *     summary: Get advertisements by user ID
 *     description: Retrieve advertisements associated with a user by their ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: user ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of advertisements associated with the user.
 *       500:
 *         description: Internal server error
 */
const router = express.Router();

router.route("/").get(getAllAdvertisements).post(createAdvertisement);
router.route("/:id").get(getAdvertisementByID).put(updateAdvertisement).delete(deleteAdvertisement);

// get advertisement by userID
router.route("/user/:id").get(getAdvertisementByUserID);
module.exports = router;
