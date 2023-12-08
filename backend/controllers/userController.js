const ErrorHander = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const crypto = require('crypto');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
});



//Login user


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHander("Please enter your email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid credentials", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid credentials", 401));
    }



    sendToken(user, 200, res);
    // sendToken(user,200,res)({
    //     success: true,
    //     user,
    //     token,
    // });
});

//get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    // sendToken(user,200,res); 
    res.status(200).json({
        sucess: true,
        user,
    });
});


// logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});



//get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    // sendToken(user,200,res); 
    res.status(200).json({
        sucess: true,
        user,
    });
});

// Get all Users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    // sendToken(users,200,res);
    res.status(200).json({
        success: true,
        users,
    })
})


// Get single Users(Admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user,
    })
})

//Update user role--- admin
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(200).json({
        success: true,
    });

});


//DELETE user ---admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);


    if (!user) {
        return next(
            new ErrorHander(`User does not exist with id: ${req.params.id}`, 400)
        );
    }



    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });

});