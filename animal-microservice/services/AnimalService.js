const AnimalModel = require("../models/Animal");

exports.getAllAnimals = async () => {
  return await AnimalModel.find();
};

exports.createAnimal = async (animal) => {
  return await AnimalModel.create(animal);
};
exports.getAnimalById = async (id) => {
  return await AnimalModel.findById(id);
};

exports.updateAnimal = async (id, animal) => {
  return await AnimalModel.findByIdAndUpdate(id, animal);
};

exports.deleteAnimal = async (id) => {
  return await AnimalModel.findByIdAndDelete(id);
};

exports.getAnimalsByShelterId = async (id) => {
  return await AnimalModel.find({ shelter_id: id});
};

exports.getAnimalsWithFilters = async (filters) => {
  return await AnimalModel.find(filters);
};


exports.updateAnimalImageByID = async (id, profileImage) => {
  try {
      const updatedAnimal = await AnimalModel.findByIdAndUpdate(
          id,
          { profileImage: profileImage },
          { new: true, useFindAndModify: false }
      );

      if (!updatedAnimal) {
          throw new Error('Animal not found');
      }

      console.log("Animal updated", updatedAnimal);

      return updatedAnimal;
  } catch (error) {
      console.error('Error updating user image:', error);
      throw error;
  }
};
