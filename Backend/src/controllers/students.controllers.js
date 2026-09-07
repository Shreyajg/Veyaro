import Student from "../models/students.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcryptjs';
import User from '../models/users.models.js';
import mongoose from 'mongoose';

const getMyProfile = async (req,res) => {
    console.log('JWT USER:', req.user);
    const userId=req.user.userId;
    const student = await Student.findOne({userId}).populate('schoolId', 'schoolName schoolId').populate('programmeId', 'programmeName programmeId').populate('yearGroupId', 'yearGroupName yearGroupId');;
    if(!student)
    {
        throw new ApiError(404,"Student doesnt exist");
    }

    return res.status(200).json(
        new ApiResponse(200,student,"student profile fetched successfully")
    );
};
const createStudent = async (req,res) => {
    const {
    username,
    password,
    studentId,
    preferredName,
    fullName,
    initials,
    schoolId,
    programmeId,
    yearGroupId
    } = req.body;

    if(!username || !password || !studentId || !preferredName || !fullName || !initials || !schoolId || !programmeId || !yearGroupId)
    {
        throw new ApiError(400,"All these are required fields");
    }
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new ApiError(409, "Username already exists");
    }

    const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
        throw new ApiError(409, "Student ID already exists");
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            [{
                username,
                password: hashedPassword,
                role: 'Student',
            }],
            { session }
        );

        if(!user)
        {
            throw new ApiError(400,"User creation failed");
        }

        const student = await Student.create([
                {
                userId: user[0]._id,
                studentId,
                preferredName,
                fullName,
                initials,
                schoolId,
                programmeId,
                yearGroupId,
                }
            ], {session}
        );

        if(!student)
        {
            throw new ApiError(400,"Failed to create Student");
        }
        await session.commitTransaction();
        return res.status(201).json(
            new ApiResponse(
                201,
                student,
                "Student created successfully"
            )
        );

    } catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
    

}
export {getMyProfile,createStudent};