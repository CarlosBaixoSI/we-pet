const axios = require("axios");

exports.validateToken = async (token) => {
  try {
    var response = await axios.get(
      `http://we-pet-gateway-microservice-1:${process.env.GATEWAY_PORT}/auth/getRole`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};
