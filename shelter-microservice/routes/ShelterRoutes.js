const express = require("express");
const {
    getAllShelters,
    createShelter,
    getShelterById,
    updateShelter,
    deleteShelter,
} = require("../controllers/ShelterController");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Shelters
 *     description: API endpoints for managing shelters
 *   - name: Shelters
 *     description: API endpoints for managing shelters
 *
 * /shelters:
 *   get:
 *     tags: [Shelters]
 *     summary: Get all shelters
 *     description: Retrieve a list of all shelters.
 *     responses:
 *       200:
 *         description: A list of shelters.
 *   post:
 *     tags: [Shelters]
 *     summary: Create a new shelter
 *     description: Create a new shelter.
 *     responses:
 *       200:
 *         description: The created shelter.
 * /shelters/{id}:
 *   get:
 *     tags: [Shelters]
 *     summary: Get a shelter by ID
 *     description: Retrieve a shelter by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the shelter
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested shelter.
 *       404:
 *         description: The shelter was not found.
 *   put:
 *     tags: [Shelters]
 *     summary: Update a shelter
 *     description: Update a shelter.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the shelter
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated shelter.
 *       404:
 *         description: The shelter was not found.
 *   delete:
 *     tags: [Shelters]
 *     summary: Delete a shelter
 *     description: Delete a shelter.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the shelter
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted shelter.
 *       404:
 *         description: The shelter was not found.
 */
router.route("/").get(getAllShelters).post(createShelter);
router.route("/:id").get(getShelterById).put(updateShelter).delete(deleteShelter);

module.exports = router;
