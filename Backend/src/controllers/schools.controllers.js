import School from "../models/schools.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createSchool = async (req,res) => {
    const {schoolId,schoolName} = req.body;
    if(!schoolId || !schoolName) throw new ApiError(400,"School Name and ID are required fields");

    const existingSchool = await School.findOne({ schoolId });


    if (existingSchool) {
        throw new ApiError(409, "School ID already exists");
    }

    const school=await School.create(
        {schoolId,
        schoolName}
    );
    if(!school) throw new ApiError(400,"School creaation failed");
    return res.status(201).json(
        new ApiResponse(201,school,"School registered successfully")
    )
};

export {createSchool};