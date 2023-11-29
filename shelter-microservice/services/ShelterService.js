const ShelterModel = require("../models/Shelter");

exports.getAllShelters = async () => {
  return await ShelterModel.find();
};

exports.createShelter = async (shelter) => {
  return await ShelterModel.create(shelter);
};
exports.getShelterById = async (id) => {
  return await ShelterModel.findById(id);
};

exports.updateShelter = async (id, shelter) => {
  return await ShelterModel.findByIdAndUpdate(id, shelter);
};

exports.deleteShelter = async (id) => {
  return await ShelterModel.findByIdAndDelete(id);
};
