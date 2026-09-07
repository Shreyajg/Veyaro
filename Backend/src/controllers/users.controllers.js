import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.models.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

const loginUser = async (req,res) => {

        const {username,password} = req.body
        if(!username || !password)
        {
            throw new ApiError(400,"Username and Password are required fields");
        }

        const user=await User.findOne({username});
        if(!user)
        {
            throw new ApiError(401,"Invalid Username or Password");
        }
        const isPasswordValid=await bcrypt.compare(
            password,
            user.password
        )

        if(!isPasswordValid)
        {
            throw new ApiError(401,"Invalid Username or Password");
        }

        const token=jwt.sign(
            {
                userId:user._id,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1d',
            }
        );

        return res.status(200).json(new ApiResponse(200,{token,role:user.role},"Log in successfull"));

}

const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        throw new ApiError(
            400,
            "Username, Password and Role are required"
        );
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new ApiError(
            409,
            "Username already exists"
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        role,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                userId: user._id,
                username: user.username,
                role: user.role,
            },
            "User created successfully"
        )
    );
};

export {loginUser,createUser};