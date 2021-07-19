const User = require('../../user/user.schema');
const Role = require('../../user/user-role.schema');
const ErrorHandler = require('../../_utils/handle-error');

exports.getCustomers = async (req, res, next) => {
    try {
        const userRole = await Role.findOne({role: "User"}).exec();

        const users = await User.find({role: userRole._id}).exec();

        if (!users) {
            throw new Error('Failed to fetch customers');
        }

        const mapped = users.map((user) => {
            return {
                fullName: user.fullName,
                email: user.email
            }
        });

        return res.status(200).json({
            customers: mapped
        });
        

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}