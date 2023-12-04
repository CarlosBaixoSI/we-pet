const express = require("express");
const {
    getAllAnimals,
    createAnimal,
    getAnimalById,
    updateAnimal,
    deleteAnimal,
} = require("../controllers/AnimalController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Animals
 *     description: API endpoints for managing animals
 *
 * /animals:
 *   get:
 *     tags: [Animal]
 *     summary: Get all animals
 *     description: Retrieve a list of all animals.
 *     responses:
 *       200:
 *         description: A list of animals.
 *   post:
 *     tags: [Animal]
 *     summary: Create a new animal
 *     description: Create a new animal.
 *     responses:
 *       200:
 *         description: The created animal.
 * /animals/{id}:
 *   get:
 *     tags: [Animal]
 *     summary: Get an animal by ID
 *     description: Retrieve an animal by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the animal
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested animal.
 *       404:
 *         description: The animal was not found.
 *   put:
 *     tags: [Animal]
 *     summary: Update an animal
 *     description: Update an animal.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the animal
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated animal.
 *       404:
 *         description: The animal was not found.
 *   delete:
 *     tags: [Animal]
 *     summary: Delete an animal
 *     description: Delete an animal.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the animal
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted animal.
 *       404:
 *         description: The animal was not found.
 */
router.route("/").get(getAllAnimals).post(createAnimal);
router.route("/:id").get(getAnimalById).put(updateAnimal).delete(deleteAnimal);

module.exports = router;
