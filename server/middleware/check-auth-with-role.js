const jwt = require('jsonwebtoken');
const Role = require('../user/user-role.schema');

module.exports = (roles = []) => {
    return async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                throw new Error('Authorization Header Not Set');
            }
    
            if (typeof roles === 'string') {
                roles = [roles]
            }
    
            const token = req.headers.authorization.split(" ")[1];           
            const user = jwt.verify(token, process.env.JWT_SECRET);
                                    
            const roleObj = await Role.findById(user.role).exec();
            
            if (!roles.includes(roleObj.role)) {
                throw new Error('Unauthorized Resource');                
            }

            // console.log('user data', decoded);
            req.user = user;
            
            next();
        } catch(error) {            
            console.log(error);
            return res.status(401).json({
                message: error.message
            })
        }
    }
}