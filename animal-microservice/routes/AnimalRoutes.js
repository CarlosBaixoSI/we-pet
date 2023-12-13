const express = require("express");
const {
    getAllAnimals,
    createAnimal,
    getAnimalById,
    getAnimalsByShelterId,
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
 *     tags: [Animals]
 *     summary: Get all animals
 *     description: Retrieve a list of all animals.
 *     responses:
 *       200:
 *         description: A list of animals.
 *   post:
 *     tags: [Animals]
 *     summary: Create a new animal
 *     description: Create a new animal.
 *     responses:
 *       200:
 *         description: The created animal.
 * /animals/{id}:
 *   get:
 *     tags: [Animals]
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
 *     tags: [Animals]
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
 *     tags: [Animals]
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
 * /animals/shelter/{id}:
 *   get:
 *     tags: [Animals]
 *     summary: Get animals by shelter ID
 *     description: Retrieve animals associated with a shelter by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the shelter
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of animals associated with the shelter.
 *       404:
 *         description: The shelter was not found.
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.route("/").get(getAllAnimals).post(createAnimal);
router.route("/:id").get(getAnimalById).put(updateAnimal).delete(deleteAnimal);
router.route("/shelter/:id").get(getAnimalsByShelterId);

module.exports = router;
