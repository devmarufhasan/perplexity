import jwt from "jsonwebtoken";
import env from "../config/env.js";
import UserModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import AppError from "../utils/app-error.js";
import { buildVerificationEmailTemplate } from "../utils/email-templates.js";

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

  const newUser = await UserModel.create({
    username,
    email,
    password,
  });

  const emailVerificationToken = jwt.sign(
    {
      email: newUser.email,
      userId: newUser._id,
    },
    env.jwtSecret,
    { expiresIn: "1d" },
  );

  const verificationUrl = `http://localhost:3000/api/v1/auth/verify-email/${emailVerificationToken}`;

  await sendEmail(
    email,
    "Welcome to Perplexity!",
    buildVerificationEmailTemplate({
      username,
      verificationUrl,
    }),
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { emailVerificationToken },
  });
};

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }
  if (!user.verified) {
    throw new AppError("Email not verified", 401, "EMAIL_NOT_VERIFIED", [
      {
        field: "email",
        message: "Email not verified",
        value: email,
      },
    ]);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    env.jwtSecret,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    },
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.params;
  const data = jwt.verify(token, env.jwtSecret);

  const user = await UserModel.findOne({ email: data.email });

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  if (user.verified) {
    throw new AppError("Email already verified", 400, "EMAIL_ALREADY_VERIFIED");
  }

  user.verified = true;
  await user.save();

  res.json({
    success: true,
    message: "Email verified successfully",
  });
}

export async function getMe(req, res) {
  const user = await UserModel.findById(req.user.id).select("-password");

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  res.json({
    success: true,
    data: {
      ...user._doc,
    },
  });
}
