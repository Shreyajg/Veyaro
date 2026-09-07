import Teacher from "../models/teachers.models.js";
import User from "../models/users.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const createTeacher = async (req,res) => {
    const {username,password,teacherId,fullName,schoolId}=req.body;

    if(!username || !password || !fullName || !schoolId || !teacherId) throw new ApiError(400,"Username , Password , fullName and schoolID are required fields ");

    const existingTeacher = await Teacher.findOne({teacherId});

    if(existingTeacher) throw new ApiError(409,"Teacher already exists");
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create([{
        username,
        password:hashedPassword,
        role:'Teacher'
        }],{session})

        if(!user) throw new ApiError(400,"User Creation failed");

        const teacher = await Teacher.create(
            [{userId:user[0]._id,
            teacherId,
            fullName,
            schoolId}],{session}
        )

        if(!teacher) throw new ApiError(400,"Teacher registration failed");
        await session.commitTransaction();
        return res.status(201).json(
            new ApiResponse(201,teacher[0],"Teacher registered successfully")
        );
    }
    catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
};

export {createTeacher};