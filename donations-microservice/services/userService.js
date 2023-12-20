const axios = require("axios"); // Import axios
const gatewayPort = process.env.GATEWAY_PORT || 3000;

exports.getIsUserAdmin = async (token) => {
    try {
        const response = await axios.get(`http://we-pet-gateway-microservice-1:${gatewayPort}/auth/isAdmin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }   
}