const advertisementService = require("../services/advertisementServices");

/**
 * Retrieve all advertisements
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisement = await advertisementService.getAllAdvertisements();
    res.json({ data: advertisement, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create an advertisement.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the advertisement is created.
 */
exports.createAdvertisement = async (req, res) => {
  try {
    const advertisement = await advertisementService.createAdvertisement(req.body);
    res.json({ data: advertisement, status: "Success" });
    //TODO: check if user_id exists before creating
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves an advertisement by ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAdvertisementByID = async (req, res) => {
  try {
    const advertisement = await advertisementService.getAdvertisementByID(req.params.id);
    res.json({ data: advertisement, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update an advertisement.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise} - Updated advertisement data or rejects with an error.
 */
exports.updateAdvertisement = async (req, res) => {
  try {
    await advertisementService.updateAdvertisement(req.params.id, req.body);
    const updated_advertisement = await advertisementService.getAdvertisementByID(req.params.id);
    res.json({ data: updated_advertisement, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Deletes an advertisement by its id.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the advertisement is deleted.
 */
exports.deleteAdvertisement = async (req, res) => {
  try {
    const deleted_advertisement = await advertisementService.getAdvertisementByID(req.params.id);
    await advertisementService.deleteAdvertisement(req.params.id);
    res.json({data: deleted_advertisement, status: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves an advertisement by user id.
 * @param {Object} req - The request object
 * @param {Object} res -  The response object
 */
exports.getAdvertisementByUserID = async (req, res) => {
  try {
    const advertisement = await advertisementService.getAdvertisementByUserID(req.params.id);
    res.json({ data: advertisement, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
