import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload:user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    //secure will use https only (here when in production)
    secure:process.env.NODE_ENV === 'production',
    signed:true,
  });

};

export const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// export default { createJWT, isTokenValid, attachCookiesToResponse };
