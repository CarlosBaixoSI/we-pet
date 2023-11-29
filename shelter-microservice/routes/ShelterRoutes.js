const express = require("express");
const {
    getAllShelters,
    createShelter,
    getShelterById,
    updateShelter,
    deleteShelter,
} = require("../controllers/ShelterController");

const router = express.Router();

router.route("/").get(getAllShelters).post(createShelter);
router.route("/:id").get(getShelterById).put(updateShelter).delete(deleteShelter);

module.exports = router;
