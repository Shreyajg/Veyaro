import YearGroup from "../models/yearGroups.models.js";
import { ApiError } from "../utils/apiError.js";
import School from "../models/schools.models.js";
import Programme from "../models/programmes.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
const createYearGroup = async (req,res) => {
    const {yearGroupId,
        yearGroupName,
        schoolId,
        programmeId} =req.body;

    if(!yearGroupId || !yearGroupName || !schoolId || !programmeId) throw new ApiError(400,"All are required fields");

    const school = await School.findById(schoolId);

    if (!school) {
        throw new ApiError(404, "School not found");
    }

    const programme = await Programme.findById(programmeId);

    if (!programme) {
        throw new ApiError(404, "Programme not found");
    }

    const existingYearGroup = await YearGroup.findOne({ yearGroupId });

    if (existingYearGroup) {
        throw new ApiError(409, "Year Group ID already exists");
    }

    const yearGroup = await YearGroup.create({
        yearGroupId,
        yearGroupName,
        schoolId,
        programmeId,
    });

    if (!yearGroup) {
        throw new ApiError(400, "Year Group creation failed");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            yearGroup,
            "Year Group created successfully"
        )
    );
};

export { createYearGroup };