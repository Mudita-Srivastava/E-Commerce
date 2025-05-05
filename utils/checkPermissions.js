import CustomError from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
    //console.log(requestUser);
    //console.log(resourceUserId);
    //console.log(typeof resourceUserId);

    if(requestUser.role === 'admin') return;
    if(requestUser.userId === resourceUserId.toString()) return;

    throw new CustomError.UnauthorizedError(
        'Not authorixed to access this route'
    );
};

export default checkPermissions;