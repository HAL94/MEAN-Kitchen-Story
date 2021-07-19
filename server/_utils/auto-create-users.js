const User = require('../user/user.schema');
const Role = require('../user/user-role.schema');
const UserPasswordChange = require('../user/user-password-change.schema');

const bcrypt = require('bcrypt');

const createAdminUser = async () => { 
    const adminRole = new Role({role: 'Admin'});
    const createdAdminRole = await adminRole.save();

    const adminPassHash = await bcrypt.hash('admin1234', 12);

    const adminUser = new User({fullName: 'Admin Kitchen',
            email: 'admin@kitchenstory.com',
            password: adminPassHash,
            role: createdAdminRole._id});

    const createdAdmin = await adminUser.save();

    const passwordChange = new UserPasswordChange({changed: false, user: createdAdmin._id});

    await passwordChange.save();
}


const createCustomerUser = async () => {
    const userRole = new Role({role: 'User'});
    const createdUserRole = await userRole.save();

    const userPassHash = await bcrypt.hash('123456', 12);
    const customerUser = new User({fullName: 'Jason Limbu',
        email: 'customer@kitchenstory.com',
        password: userPassHash,
        role: createdUserRole._id});
    await customerUser.save();
}


exports.autoCreateUsers = async () => {
    try {
        const userCount = await User.countDocuments().exec();
        const roleCounts = await Role.countDocuments().exec();
        
        if (userCount == 0 && roleCounts == 0) {
            createAdminUser();
            createCustomerUser();
        } 
    } catch (error) {
        console.log(error);
    }
}