const Donations = require("../models/donationsModel");

exports.getAllDonations = async () => {
  return await Donations.find();
};

exports.insertDonation = async (donations) => {
  return await Donations.create(donations);
};
exports.getDonationByID = async (id) => {
  return await Donations.findById(id);
};

exports.deleteDonation = async (id) => {
  return await Donations.findByIdAndDelete(id);
};

exports.getDonationsByUserID = async (id) => {
  return await Donations.find({ user_id: id });
}

exports.getDonationsByShelterID = async (id) => {
  return await Donations.find({ shelter_id: id});
}
