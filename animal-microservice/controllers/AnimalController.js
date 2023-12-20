const animalService = require("../services/AnimalService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;


function get_user_info_from_token(token) {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  return { userId: decoded.user_id, roleId: decoded.role_id };
}

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await animalService.getAllAnimals();
    res.json({ data: animals, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimalsByShelterId = async (req, res) => {
  try {
    const animals = await animalService.getAnimalsByShelterId(req.params.id);
    res.json({ data: animals, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    try {
      console.log(req.body.user_id)
      // forward the user id to the gateway
      const user_idCheck = await axios.get(`http://we-pet-gateway-microservice-1:3000/users/${req.body.user_id}`,{
        headers: {
          authorization: req.headers.authorization
        }
      })
      console.log(user_idCheck.data)

      if (!user_idCheck.data) {
        return res.status(400).json({ error: "User does not exist1" });
      }

    } catch (err) {
      return res.status(400).json({ error: "User does not exist: " + err.message });
    }
    try {
      // forward the shelter id to the gateway
      const shelter_idCheck = await axios.get(`http://we-pet-gateway-microservice-1:3000/shelters/${req.body.shelter_id}`
      ,{
        headers: {
          authorization: req.headers.authorization
        }
      })

      if (!shelter_idCheck.data) {
        res.status(400).json({ error: "Shelter does not exist" });
      }

    } catch {
      return res.status(400).json({ error: "Shelter does not exist" });
    }
    const animal = await animalService.createAnimal(req.body);
    res.json({ data: animal, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    res.json({ data: animal, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,{
        headers: {
          authorization: req.headers.authorization
        }
      }
    );
    if (role_info.data.role === "admin"){
      const animal = await animalService.getAnimalById(req.params.id);
      await animalService.updateAnimal(req.params.id, req.body);
      return res.json({ data: animal, status: "Success" });
    } else if (role_info.data.role === "user"){
      user_id = get_user_info_from_token(req.headers.authorization).userId;
      const animal = await animalService.getAnimalById(req.params.id);
      if (user_id === animal.user_id){
        await animalService.updateAnimal(req.params.id, req.body);
        return res.json({ data: animal, status: "Success" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,{
        headers: {
          authorization: req.headers.authorization
        }
      }
    );
    if (role_info.data.role === "admin"){
      const animal = await animalService.getAnimalById(req.params.id);
      await animalService.deleteAnimal(req.params.id);
      return res.json({ data: animal, status: "Successfully deleted" });
    }else if (role_info.data.role === "user") {
      user_id = get_user_info_from_token(req.headers.authorization).userId;
      const animal = await animalService.getAnimalById(req.params.id);
      if (user_id === animal.user_id){
        await animalService.deleteAnimal(req.params.id);
        return res.json({ data: animal, status: "Successfully deleted" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
