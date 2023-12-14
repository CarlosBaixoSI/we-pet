const shelterService = require("../services/ShelterService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;

exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await shelterService.getAllShelters();
    res.json({ data: shelters, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createShelter = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];
  // TODO: add a check to see if the user is an admin
  // try {
  //   const user_info = await axios.get(
  //     `http://localhost:${gatewayPort}/auth/getRole`,
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   );
  //   if (role_info.data.role === "admin") {
  //     const shelter = await shelterService.createShelter(req.body);
  //     res.json({ data: shelter, status: "success" });
  //   } else {
  //     return res.status(400).json({ error: "Only admin can create shelters" });
  //   }
  // } catch {
  //   return res.status(400).json({ error: "Failed creating shelter" });
  // }
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
