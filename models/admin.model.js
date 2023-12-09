const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin = require("../schema/admin");
const privateKey = process.env.PRIVATE_KEY;

const registreAdmin = async ({ username, email, password }) => {
  try {
    const doc = await Admin.findOne({ email });

    if (doc) {
      throw new Error("This email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

const loginAdmin = async ({ email, password }) => {
  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      throw new Error("Email not found in our database");
    }

    const same = await bcrypt.compare(password, user.password);

    if (same) {
      const token = jwt.sign(
        { id: user._id, username: user.username, role: "Admin" },
        privateKey,
        {
          expiresIn: "1m",
        }
      );
      return { token: token, role: "Admin", username: user.username };
    } else {
      throw new Error("Invalid password or email");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registreAdmin,
  loginAdmin,
};
