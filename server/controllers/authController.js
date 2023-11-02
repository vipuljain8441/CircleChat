import Users from '../models/userModels.js'
import {  compareString, createJWT, hashString } from '../utils/index.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const register = async(req,res,next) =>{
    const {firstName,lastName,email,password} = req.body;

    //Validate fields
    if (!(firstName || lastName || email || password))
    {
        next("Provide Required Field");
        return;
    }

    try{
        const userExist = await Users.findOne({email});

        //check for UserExistance
        if(userExist)
        {
            next("Email Address already exists");
            return;
        }

        //Password hashing
        const hashedPassword = await hashString(password);

        //create an user
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        });

        //send email verification to user
        sendVerificationEmail(user,res);
        
        }
    catch(error){
        console.log(error)
        res.status(404).json({message:error.message})
    }
};

export const login = async(req,res,next)=>{

    const {email,password} = req.body;

    try {
       if(!email ||!password) 
        {
            next("Please Provide User Credentials")
            return;
        }

        const user = await Users.findOne({email})

        if(!user)
        {
            next("Invalid email or password")
            return;
        }
        if(!user?.verified){
            next("User email is not Verified. Check your email account and verify your email")
            return;
        }
        //compare Password
        const isMatch = await compareString(password,user?.password);
        
        if(!isMatch){
            next("Invalid email or password")
            return;
        }

        user.password = undefined;
        const token = createJWT(user?._id);
        //send Response to user
        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token,
          });

    } catch (error) {
        console.log(error)
        res.status(404).json({message:error.message})
        
    }

}
