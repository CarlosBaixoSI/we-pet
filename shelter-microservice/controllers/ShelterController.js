const shelterService = require("../services/ShelterService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;

/**
 * Retrieves all shelters.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A JSON response with all verified shelters.
 */
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await shelterService.getAllShelters();
    res.json({ data: shelters, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a list of shelters that have not been verified.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the list of shelters or rejects with an error.
 */
exports.getNoneVerifiedShelters = async (req, res) => {
  try {
    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,{
        headers: {
          authorization: req.headers.authorization
        }
      }
    )
    console.log(role_info.data.role)
    if (role_info.data.role === "admin") {
      const shelters = await shelterService.getNoneVerifiedShelters();
      return res.json({ data: shelters, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Verifies a shelter by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the JSON response containing the verified shelters and status.
 */
exports.verifyShelterByID = async (req, res) => {
  try {
    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,{
        headers: {
          authorization: req.headers.authorization
        }
      }
    )
    if (role_info.data.role === "admin") {
      await shelterService.verifyShelterByID(req.params.id);
      const shelters = await shelterService.getAllShelters();
      return res.json({ data: shelters, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Creates a new shelter.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The created shelter and a success status.
 */
exports.createShelter = async (req, res) => {
  let token = req.cookies?.token || req.headers.authorization;
  console.log("token " + token);

  // get email by token
  try {
    const user_email = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getUserEmail`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("user_email " + user_email);
    // get user id by email
    try {
      console.log("antes");
      const user_info = await axios.get(
        `http://we-pet-gateway-microservice-1:${gatewayPort}/users/getUserIDByEmail/${user_email.data.email}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("depois " + user_info.data.data._id);
      const id = user_info.data.data._id;
      req.body.user_id = id;
      const shelter = await shelterService.createShelter(req.body);
      console.log("shelter " + shelter);
      return res.json({ data: shelter, status: "success" });
    } catch {
      return res.status(500).json({ error: "Failed getting user ID" });
    }
  } catch {
    return res.status(500).json({ error: "Failed getting user email" });
  }
};

/**
 * Retrieves a shelter by its ID from the database and sends it as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The shelter data and a status of "success" as a JSON response.
 */
exports.getShelterById = async (req, res) => {
  try {
    const shelter = await shelterService.getShelterById(req.params.id);
    res.json({ data: shelter, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Updates a shelter.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the updated shelter.
 */
exports.updateShelter = async (req, res) => {
  try {
    const shelter = await shelterService.updateShelter(req.params.id, req.body);
    res.json({ data: shelter, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Deletes a shelter if the user has admin role.
 *
 * @param {Object} req - the request object.
 * @param {Object} res - the response object.
 * @return {Object} the shelter data and status if deletion is successful.
 */
exports.deleteShelter = async (req, res) => {
  let token = req.cookies?.token || req.headers.authorization;
  try {
    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (role_info.data.role === "admin") {
      const shelter = await shelterService.deleteShelter(req.params.id);
      return res.json({ data: shelter, status: "success" });
    }
    else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
