import CustomError from '../errors/index.js';
import jwt from "../utils/index.js";

const authenticateUser = async (req,res,next) => {
const token= req.signedCookies.token
if(!token) {
    console.log("token not present/found")
throw new CustomError.UnauthenticatedError('Authentication invalid');
}

try{
  const {name, userId, role} = jwt.isTokenValid({token});
  req.user = {name, userId, role};
  next();
}
catch(error){
    throw new CustomError.UnauthenticatedError('Authentication invalid');
}
};


const authorizePermissions = (...roles) => {
   return (req,res,next) => {
    if(!roles.includes(req.user.role)) {
        throw new CustomError.UnauthorizedError(
            'Unauthorized to access this route'
        );
    }
    next();
   };
};

export default {authenticateUser, authorizePermissions};