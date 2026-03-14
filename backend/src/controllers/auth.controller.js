import UserModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import AppError from "../utils/app-error.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    throw new AppError("User already exists", 409, "USER_ALREADY_EXISTS", [
      {
        field: "username/email",
        message: "Username or email already exists",
        value: `${username}/${email}`,
      },
    ]);
  }

  await UserModel.create({
    username,
    email,
    password,
  });

  await sendEmail(
    email,
    "Welcome to Our App!",
    `<p>Hi ${username},</p><p>Thank you for registering at our app. We're excited to have you on board!</p><p>Best regards,<br/>The Team</p>`,
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};
