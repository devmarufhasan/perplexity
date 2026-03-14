import UserModel from "../models/user.model.js";
import AppError from "../utils/app-error.js";

export const register = async (req, res) => {
  const { username, email } = req.body;

  const isUserAlreadyExists = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUserAlreadyExists) {
    throw new AppError("User already exists", 409, "USER_ALREADY_EXISTS", [
      {
        field: "username/email",
        message: "Username or email already exists",
        value: `${username}/${email}`,
      },
    ]);
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};
