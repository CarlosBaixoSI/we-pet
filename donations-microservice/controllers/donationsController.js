const donationsService = require("../services/donationsService");

exports.getAllDonations = async (req, res) => {
    try {
        const donations = await donationsService.getAllDonations();
        res.json({ data: donations, status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.insertDonation = async (req, res) => {
    try {
        const donation = await donationsService.insertDonation(req.body);
        res.json({ data: donation, status: "Success" });
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
