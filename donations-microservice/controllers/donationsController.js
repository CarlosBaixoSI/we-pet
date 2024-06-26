const donationsService = require("../services/donationsService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;

const userService = require("../services/userService"); // Import userService
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await donationsService.getAllDonations();
    res.json({ data: donations, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.insertDonation = async (req, res) => {
  let token = req.cookies?.token || req.headers.authorization;

  try {
    try {
      // forward the user id to the gateway
      const user_idCheck = await axios.get(
        `http://we-pet-gateway-microservice-1:${gatewayPort}/users/${req.body.user_id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );



      if (!user_idCheck.data) {
        return res.status(400).json({ error: "User does not exist" });
      }
    } catch {
      return res.status(400).json({ error: "User does not exist" });
    }
    try {
      // forward the shelter id to the gateway
      const shelter_idCheck = await axios.get(
        `http://we-pet-gateway-microservice-1:${gatewayPort}/shelters/${req.body.shelter_id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (!shelter_idCheck.data) {
        res.status(400).json({ error: "Shelter does not exist" });
      }
    } catch {
      return res.status(400).json({ error: "Shelter does not exist" });
    }
    const donation = await donationsService.insertDonation(req.body);
    res.json({ data: donation, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDonationByID = async (req, res) => {
  try {
    const donation = await donationsService.getDonationByID(req.params.id);
    res.json({ data: donation, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDonation = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];
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
      const donation = await donationsService.deleteDonation(req.params.id);
      res.json({ data: donation, status: "Success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDonationsByUserID = async (req, res) => {
  try {
    const donation = await donationsService.getDonationsByUserID(req.params.id);
    res.json({ data: donation, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDonationsByShelterID = async (req, res) => {
  try {
    const donation = await donationsService.getDonationsByShelterID(
      req.params.id
    );
    res.json({ data: donation, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
