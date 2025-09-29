import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { genToken } from "../config/token.js";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../util/verifyEmailTemplate.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async(req,res) =>{
    try {
         console.log("REQ BODY:", req.body); // ⬅️ add this
        const {name,email,password} = req.body;
        
        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email Already Exists!"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be of 6 character!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        await user.save();

        const token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            secure:false,
            sameSite:"Strict"
        });

        // await user.save();
        res.status(201).json({
            message: "User Created Successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // password: user.password
            },
            token
        });
    } catch (error) {
        console.error("SIGNUP ERROR:", error);   // log the real issue
    res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
}

// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const existEmail = await User.findOne({ email });
//     if (existEmail) {
//       return res.status(400).json({ message: "Email Already Exists!" });
//     }

//     // Check password length
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters!" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     // Generate token
//     const token = await genToken(user._id);

//     // Set cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//       secure: false, // true in production (https)
//       sameSite: "Strict"
//     });

//     // Send response without password
//     res.status(201).json({
//       message: "User Created Successfully!",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error("SIGNUP ERROR:", error);
//     res.status(500).json({ message: "Internal Server Error!", error: error.message });
//   }
// };


export const Login = async(req,res) =>{
    try {
         console.log("REQ BODY:", req.body); // ⬅️ add this
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Email not found!"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials!"})
        }

        const token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            secure:false,
            sameSite:"Strict"
        });

        res.status(200).json({message:"Login Successful!"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error!"})
    }
}

export const Logout = async(req,res) =>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Logout Successful!"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error!"})
    }
}