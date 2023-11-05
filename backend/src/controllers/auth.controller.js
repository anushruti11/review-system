const { createUser } = require("../services/auth.service");
const User = require("../models/user.model");

const register = async (req, res) => {
  console.log(req.body);

  const result = await createUser(req.body);
  if (result.status === "success") res.status(201).send(result);
  else res.status(404).send(result);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

 
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

   
    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user.userId,
        email: user.email,
        username: user.username,

      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
