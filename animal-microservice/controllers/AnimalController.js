const animalService = require("../services/AnimalService");

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await animalService.getAllAnimals();
    res.json({ data: animals, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const animal = await animalService.createAnimal(req.body);
    res.json({ data: animal, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    res.json({ data: animal, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await animalService.updateAnimal(req.params.id, req.body);
    res.json({ data: animal, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await animalService.deleteAnimal(req.params.id);
    res.json({ data: animal, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
