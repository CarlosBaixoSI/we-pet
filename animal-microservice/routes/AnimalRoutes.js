const express = require("express");
const {
    getAllAnimals,
    createAnimal,
    getAnimalById,
    updateAnimal,
    deleteAnimal,
} = require("../controllers/AnimalController");

const router = express.Router();

router.route("/").get(getAllAnimals).post(createAnimal);
router.route("/:id").get(getAnimalById).put(updateAnimal).delete(deleteAnimal);

module.exports = router;
