const userService = require("../services/userService");
const axios = require("axios");
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const gatewayPort = process.env.GATEWAY_PORT || 3000;
const jwt = require("jsonwebtoken");
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

function get_user_info_from_token(token) {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return { userId: decoded.user_id, roleId: decoded.role_id };
}

/**
 * Retrieves all users.
 * @param {Object} req - The request object
 * @param {Object} res -  The response object
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    for (let user of users) {
      if (user.profileImage) {
        user.profileImageUrl = await generateSignedUrl(user.profileImage);
      }
    }

    res.json({ data: users, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Creates a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing user data.
 * @param {Object} res - The response object.
 * @returns {Object} The response JSON object containing the created user and status.
 * @throws {Error} If there is an error creating the user.
 */
exports.createUserByID = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    if (user.profileImage) {
      user.profileImageUrl = await generateSignedUrl(user.profileImage);
    }
    res.json({ data: user, status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getUserByID = async (req, res) => {
  try {
    let token = req.cookies?.token || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const role_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getRole`,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );

    if (role_info.data.role === "admin") {
      const user = await userService.getUserByID(req.params.id);
      if (user.profileImage) {
        user.profileImageUrl = await generateSignedUrl(user.profileImage);
      }

      return res.json({ data: user, status: "Success" });
    } else if (role_info.data.role === "user") {
      const user_info = get_user_info_from_token(req.headers.authorization);
      const user = await userService.getUserByID(user_info.userId);
      return res.json({ data: user, status: "Success" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the user is updated
 */
exports.updateUser = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }
  try {
    let user_info = await axios.get(
      `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/getUserEmail`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    try {
      await userService.updateUser(user_info.data.email, req.body);
      let user = await userService.getUserByEmail(user_info.data.email);

      if (user.profileImage) {
        user.profileImageUrl = await generateSignedUrl(user.profileImage);
      }

      res.json({ data: user, status: "Success" });
    } catch {
      res.status(500).json({ error: "Failed to update the user" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get user email -> token is invalid" });
  }
};

/**
 *
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Promise<void>} - Returns the deleted user
 */
exports.deleteUser = async (req, res) => {
  let token = req.cookies?.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }
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
      const deleted_user = await userService.getUserByID(req.params.id);
      // delete user also from the auth microservice
      axios.delete(
        `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/deleteUserByEmail/${deleted_user.email}`
      );
      await userService.deleteUser(req.params.id);
      res.json({ data: deleted_user, status: "Successfully deleted" });
    } else if (role_info.data.role === "user") {
      try {
        let user_info = get_user_info_from_token(req.headers.authorization);
        const deleted_user = await getUserByID(req.params.id);
        // delete user also from the auth microservice
        await axios.delete(
          `http://we-pet-gateway-microservice-1:${gatewayPort}/auth/deleteUser/${user_info.userId}`
        );
        await userService.deleteUser(user_info.userId);
        res.json({ data: deleted_user, status: "Successfully deleted" });
      } catch {
        res.status(500).json({ error: "Failed to decode the token" });
      }
      res.status(500).json({ error: "Failed to delete the user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get user ID by email.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getUserIDByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const userID = await userService.getUserIDByEmail(email);

    if (userID && userID.profileImage) {
      userID.profileImageUrl = await generateSignedUrl(userID.profileImage);
    }

    return res.json({ data: userID, status: "Success" });
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

      let user = await userService.updateUserImageByID(id, imageName);

      if (user && user.profileImage) {
        user.profileImageUrl = await generateSignedUrl(user.profileImage);
      }

      res.json({ data: user, status: "Success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

const generateSignedUrl = async (key, expiresIn = 60) => {
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (err) {
    console.error("Error generating signed URL:", err);
    throw err;
  }
};
