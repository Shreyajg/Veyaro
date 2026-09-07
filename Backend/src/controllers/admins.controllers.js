import Admin from "../models/admins.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import User from "../models/users.models.js";
import bcrypt from "bcryptjs";

const createAdmin= async (req,res) => {
    const {
        username,
        password,
        adminId,
        fullName,
        schoolId
    } = req.body;
     
    if(!username || !password || !fullName || !adminId || !schoolId) throw new ApiError(400,"ID, name ,username,password and schoolId are required fields");

    const existingAdmin=await Admin.findOne({adminId});
    if(existingAdmin) throw new ApiError(409,"Admin ID already exists");

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(
                    [{
                        username,
                        password: hashedPassword,
                        role: 'Admin',
                    }],
                    { session }
                );
        if(!user)
                {
                    throw new ApiError(400,"User creation failed");
                }
        const admin= await Admin.create(
            [{userId:user[0]._id,
            adminId,
            fullName,
        schoolId}],{session}
        );

        if(!admin) throw new ApiError(400,"Couldnt register Admin");
        await session.commitTransaction();
        return res.status(201).json(
            new ApiResponse(201,admin[0],"Admin registered successfully")
        );
    }
    catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
};

export {createAdmin};