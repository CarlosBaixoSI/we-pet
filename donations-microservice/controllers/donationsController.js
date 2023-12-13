const donationsService = require("../services/donationsService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;

const userService = require("../services/userService"); // Import userService
exports.getAllDonations = async (req, res) => {
    try {

        let isAdmin = await userService.getIsUserAdmin(req.headers.authorization); // Get user role
        console.log(isAdmin);
        const donations = await donationsService.getAllDonations();
        res.json({ data: donations, status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.insertDonation = async (req, res) => {
    try {
        // forward the user id to the gateway
        const response = await axios.get(
            `http://localhost:${gatewayPort}/userExists/${req.body.user_id}`,
        )
        if (!response.data.user_exists) {
            res.status(400).json({ error: "User does not exist" });
        }else {
            const donation = await donationsService.insertDonation(req.body);
            res.json({ data: donation, status: "Success" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getDonationByID = async (req, res) => {
    try {
        const donation = await donationsService.getDonationByID(req.params.id);
        res.json({ data: donation, status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteDonation = async (req, res) => {
    try {
        const donation = await donationsService.deleteDonation(req.params.id);
        res.json({ data: donation, status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getDonationsByUserID = async (req, res) => {
    try {
        const donation = await donationsService.getDonationsByUserID(req.params.id);
        res.json({ data: donation, status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getDonationsByShelterID = async (req, res) => {
    try {
        const donation = await donationsService.getDonationsByShelterID(req.params.id);
        res.json({ data: donation, status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
