const ShelterModel = require("../models/Shelter");

exports.getAllShelters = async () => {
  return await ShelterModel.find({ isVerified: true });
};

exports.getNoneVerifiedShelters = async () => {
  return await ShelterModel.find({ isVerified: false });
}

exports.verifyShelterByID = async (id) => {
  return await ShelterModel.findByIdAndUpdate(id, { isVerified: true });
}

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
