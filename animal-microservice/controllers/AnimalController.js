const animalService = require("../services/AnimalService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await animalService.getAllAnimals();
    res.json({ data: animals, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimalsByShelterId = async (req, res) => {
  try {
    const animals = await animalService.getAnimalsByShelterId(req.params.id);
    res.json({ data: animals, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    try {
      // forward the user id to the gateway
      const user_idCheck = await axios.get(`http://localhost:${gatewayPort}/users/${req.body.user_id}`,)

      if (!user_idCheck.data) {
        return res.status(400).json({ error: "User does not exist" });
      }

    } catch {
      return res.status(400).json({ error: "User does not exist" });
    }
    try {
      // forward the shelter id to the gateway
      const shelter_idCheck = await axios.get(`http://localhost:${gatewayPort}/shelters/${req.body.shelter_id}`,)

      if (!shelter_idCheck.data) {
        res.status(400).json({ error: "Shelter does not exist" });
      }

    } catch {
      return res.status(400).json({ error: "Shelter does not exist" });
    }
    const animal = await animalService.createAnimal(req.body);
    res.json({ data: animal, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    res.json({ data: animal, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    await animalService.updateAnimal(req.params.id, req.body);
    const animal = await animalService.getAnimalById(req.params.id);
    res.json({ data: animal, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    await animalService.deleteAnimal(req.params.id);
    res.json({ data: animal, status: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
