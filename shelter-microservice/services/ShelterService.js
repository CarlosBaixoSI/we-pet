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

exports.updateShelterImageByID = async (id, profileImage) => {
  try {
      const updatedShelter = await ShelterModel.findByIdAndUpdate(
          id,
          { profileImage: profileImage },
          { new: true, useFindAndModify: false }
      );

      if (!updatedShelter) {
          throw new Error('Shelter not found');
      }

      console.log("Shelter updated", updatedShelter);

      return updatedShelter;
  } catch (error) {
      console.error('Error updating Shelter image:', error);
      throw error;
  }
};


