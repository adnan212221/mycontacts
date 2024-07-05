
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc Get all contact
//@route GET /api/users/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please add email and password')
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '2m'});
        res.json({accessToken: accessToken})
    } else{
        res.status(401);
        throw new Error('email or password is invalid')
    }
    res.json({
        message: 'login successfully'
    })
});

//@desc Register user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} =req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error('All Fields are mandatory')
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const hashPassowrd = await bcrypt.hash(password,10)
    
    const user = await User.create({
        username, 
        email,
        password: hashPassowrd
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('user data not valid')
    }
    res.json({
        message: 'register successfully'
    })
});

//@desc Get current user info
//@route GET /api/user/current
//@access private

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
});


module.exports = {loginUser, registerUser, currentUser};