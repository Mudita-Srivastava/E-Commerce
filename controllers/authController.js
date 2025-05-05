import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";
//import BadRequestError from "../errors/bad-request.js";
import authUtils from "../utils/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError("email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = authUtils.createTokenUser(user);

  authUtils.attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // throw new CustomError.BadRequest("please provide email and password");
    res.status(400).json({ msg: "provide email or password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    // throw new CustomError.UnauthenticatedError("Invalid credentials");
    res.status(400).json({ msg: "Invalid credentials" });
  }
  console.log("a1");

  const isPasswordCorrect = await user.comparePassword(password);
  console.log("b1");
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    // throw new CustomError.UnauthenticatedError("Invalid credentials");
    res.status(404).json({ msg: "Invalid credentials" });
  }
console.log("c1");
  const tokenUser = authUtils.createTokenUser(user);
  console.log("tokenuser:",tokenUser);
  authUtils.attachCookiesToResponse({ res, user: tokenUser });
  console.log("d1");
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export { register, login, logout };
