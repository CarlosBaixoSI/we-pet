const shelterService = require("../services/ShelterService");

exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await shelterService.getAllShelters();
    res.json({ data: shelters, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createShelter= async (req, res) => {
  try {
    const shelter = await shelterService.createShelter(req.body);
    res.json({ data: shelter, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShelterById = async (req, res) => {
  try {
    const shelter = await shelterService.getShelterById(req.params.id);
    res.json({ data: shelter, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateShelter = async (req, res) => {
  try {
    const shelter = await shelterService.updateShelter(req.params.id, req.body);
    res.json({ data: shelter, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteShelter = async (req, res) => {
  try {
    const shelter = await shelterService.deleteShelter(req.params.id);
    res.json({ data: shelter, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
