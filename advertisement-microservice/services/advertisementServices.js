const Advertisement = require("../models/advertisementModel");

exports.getAllAdvertisements = async () => {
  return await Advertisement.find();
};

exports.createAdvertisement = async (advertisement) => {
  return await Advertisement.create(advertisement);
};
exports.getAdvertisementByID = async (id) => {
  return await Advertisement.findById(id);
};

exports.updateAdvertisement = async (id, advertisement) => {
  return await Advertisement.findByIdAndUpdate(id, advertisement);
};

exports.deleteAdvertisement = async (id) => {
  return await Advertisement.findByIdAndDelete(id);
};

exports.getAdvertisementByUserID = async (id) => {
  return await Advertisement.find({ user_id: id });
}
