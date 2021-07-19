const User = require('../user.schema');
const Role = require('../user-role.schema');
const UserPasswordChange = require('../user-password-change.schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ErrorHandler = require('../../_utils/handle-error');

exports.signupAdminUser = async (req, res, next) => {
    try {
        const user = new User({fullName: req.body.fullName, email: req.body.email, password: req.body.password});
        const userRole = await Role.findOne({role: "Admin"}).exec();
        user.role = userRole;

        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;

        await user.save();
        
        const passwordChanged = new UserPasswordChange({user: user._id});
        await passwordChanged.save();

        return res.status(201).json({message: "Saved Admin User Successfully!", user, passwordChanged: {user: passwordChanged.user, changed: passwordChanged.changed}});
    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.signupUser = async (req, res, next) => {
    const user = new User({fullName: req.body.fullName, email: req.body.email, password: req.body.password});
    try {
        const userExists = await User.findOne({email: user.email}).exec();

        if (userExists) {
            return res.status(400).json({message: "It seems that user already exist"});
        }
        
        const userRole = await Role.findOne({role: "User"}).exec();
        user.role = userRole;

        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;

        await user.save();

        return res.status(201).json({message: "You have been successfully registered!"})

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
    
}

exports.loginUser = async (req, res, next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    try {
        const user = await User.findOne({email: userEmail})
            .populate('role')
            .exec();
        
        if (!user) {
            throw new Error('The credentials used are not valid');
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.password);

        if (!passwordMatch) {
            throw new Error('The credentials used are not valid');
        }

        const expiration = { expiresIn: '3600s' };

        const token = await jwt.sign({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, expiration);

        const userResponse = {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role.role
        };

        let passwordChanged = false;

        if (user.role.role === 'Admin') {
            const pwChangedObj = await UserPasswordChange.findOne({user: user._id}).exec();
            passwordChanged = pwChangedObj.changed ? true : false;
        }

        return res.status(200).json({
            message: "You successfuly logged in",
            accessToken: token,
            user: userResponse,
            expiresIn: 3600,
            passwordChanged: passwordChanged
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.getUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({_id: userId})
            .populate('role')
            .exec();

        if (!user) {
            throw new Error('The user does not exist');
        }

        return res.status(200).json({
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role.role
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.resetUserPassword = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        const oldPw = req.body.oldPassword;
        const newPw = req.body.newPassword;

        let user = await User.findOne({_id: userId})
            .exec();

        console.log(oldPw, newPw, user);

        user.role = mongoose.Types.ObjectId(user.role);        

        if (!user) {
            throw new Error('Invalid User');
        }

        const passwordMatch = await bcrypt.compare(oldPw, user.password);

        if (!passwordMatch) {
            throw new Error('Old password is incorrect');
        }

        user.password = await bcrypt.hash(newPw, 12);

        await user.save();

        const passwordChangedStatus = await UserPasswordChange.findOne({user: user._id, changed: false}).exec();

        if (passwordChangedStatus) {
            passwordChangedStatus.changed = true;
            await passwordChangedStatus.save();
        }

        


        return res.status(200).json({
            message: "Updated Password Successfully"
        });


    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

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