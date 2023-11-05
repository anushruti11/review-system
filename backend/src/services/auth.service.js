const User = require("../models/user.model");
const createUser = async (user) => {
  const existingUser = await User.findOne({
    $or: [{ email: user.email }, { userId: user.userId }],
  });

  if (existingUser) {
    return {
      status: "failed",
      message: "User already exists",
    };
  }
  const newUser = new User(user);

  await newUser.save();
  return {
    status: "success",
    message: "User created Successfully",
  };
};

module.exports = {
  createUser,
};
