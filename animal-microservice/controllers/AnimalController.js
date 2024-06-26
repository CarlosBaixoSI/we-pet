const animalService = require("../services/AnimalService");
const axios = require("axios");
const gatewayPort = process.env.GATEWAY_PORT || 3000;
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");

const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");

dotenv.config();

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Retrieves user information from the given token.
 *
 * @param {string} token - The token to extract user information from
 * @return {object} An object containing the user ID and role ID
 */
function getUserInfoFromToken(token) {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  return { userId: decoded.user_id, roleId: decoded.role_id };
}

/**
 * Retrieves all animals from the database and returns them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A JSON response containing the animals data and status.
 */
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await animalService.getAllAnimals();
    for (let animal of animals) {
      if (animal.profileImage) {
        animal.profileImageUrl = await generateSignedUrl(animal.profileImage);
      }
    }

    return res.json({ data: animals, status: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Get animals by shelter ID.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} a promise that resolves with the JSON response
 */
exports.getAnimalsByShelterId = async (req, res) => {
  try {
    const animals = await animalService.getAnimalsByShelterId(req.params.id);
    for (let animal of animals) {
      if (animal.profileImage) {
        animal.profileImageUrl = await generateSignedUrl(animal.profileImage);
      }
    }
    return res.json({ data: animals, status: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a list of animals based on the provided filters.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} The list of animals that match the filters.
 */
exports.getAnimalsWithFilters = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Missing filters" });
    }
    const filters = {};
    if (req.body.city) filters["city"] = req.body.city;
    if (req.body.gender) filters["gender"] = req.body.gender;
    if (req.body.age) filters["age"] = req.body.age;
    if (req.body.size) filters["size"] = req.body.size;
    if (req.body.animal_type) filters["animal_type"] = req.body.animal_type;

    const animals = await animalService.getAnimalsWithFilters(filters);
    console.log(animals);
    if (!animals.length) {
      return res.status(400).json({ error: "No animals found" });
    }
    return res.json({ data: animals, status: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Creates a new animal in the database.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} a promise that resolves with the JSON response
 */
exports.createAnimal = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Missing animal data" });
    }
    if (!req.body.user_id || !req.body.shelter_id) {
      return res.status(400).json({ error: "Missing user_id or shelter_id" });
    }

    const [userCheck, shelterCheck] = await Promise.all([
      axios.get(
        `http://we-pet-gateway-microservice-1:${gatewayPort}/users/${req.body.user_id}`,
        {
          headers: {
            authorization: req.headers.authorization,
          },
        }
      ),
      axios.get(
        `http://we-pet-gateway-microservice-1:${gatewayPort}/shelters/${req.body.shelter_id}`,
        {
          headers: {
            authorization: req.headers.authorization,
          },
        }
      ),
    ]);
    if (!userCheck.data) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (!shelterCheck.data) {
      return res.status(400).json({ error: "Shelter does not exist" });
    }

    req.body["city"] = shelterCheck.data.data.city;
    const animal = await animalService.createAnimal(req.body);
    res.json({ data: animal, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves an animal by ID from the database and returns it as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A JSON response containing the animal data and status.
 */
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    if (animal.profileImage) {
      animal.profileImageUrl = await generateSignedUrl(animal.profileImage);
    }
    return res.json({ data: animal, status: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Updates an animal based on user role.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Object} response JSON with updated animal data and status
 */
exports.updateAnimal = async (req, res) => {
  try {
    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );
    if (role_info.data.role === "admin") {
      const animal = await animalService.getAnimalById(req.params.id);
      await animalService.updateAnimal(req.params.id, req.body);
      return res.json({ data: animal, status: "Success" });
    } else if (role_info.data.role === "user") {
      user_id = getUserInfoFromToken(req.headers.authorization).userId;
      const animal = await animalService.getAnimalById(req.params.id);
      if (user_id === animal.user_id) {
        await animalService.updateAnimal(req.params.id, req.body);
        return res.json({ data: animal, status: "Success" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete an animal based on user role and ownership.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} JSON response with deleted animal data and status.
 */
exports.deleteAnimal = async (req, res) => {
  try {
    const role_info = await axios.get(
      `http://we-pet-auth-microservice-1:${3001}/auth/getRole`,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );
    if (role_info.data.role === "admin") {
      const animal = await animalService.getAnimalById(req.params.id);
      await animalService.deleteAnimal(req.params.id);
      return res.json({ data: animal, status: "Successfully deleted" });
    } else if (role_info.data.role === "user") {
      user_id = getUserInfoFromToken(req.headers.authorization).userId;
      const animal = await animalService.getAnimalById(req.params.id);
      if (user_id === animal.user_id) {
        await animalService.deleteAnimal(req.params.id);
        return res.json({ data: animal, status: "Successfully deleted" });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.uploadImage = [
  upload.single("image"),
  async (req, res) => {
    const id = req.params.id;

    try {
      const file = req.file;
      const imageName = generateFileName();

      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1080, width: 1080, fit: "contain" })
        .toBuffer();

      console.log("File", file);
      console.log("ImageName", imageName);

      const uploadParams = {
        Bucket: bucketName,
        Key: imageName,
        Body: fileBuffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      let animal = await animalService.updateAnimalImageByID(id, imageName);

      if (animal && animal.profileImage) {
        animal.profileImageUrl = await generateSignedUrl(animal.profileImage);
      }

      res.json({ data: animal, status: "Success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];


const generateSignedUrl = async (key, expiresIn = 60000) => {
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (err) {
    console.error("Error generating signed URL:", err);
    throw err;
  }
};
