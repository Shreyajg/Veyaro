import Programme from "../models/programmes.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createProgramme= async (req,res) => {
    const {programmeId,programmeName} = req.body;
    if(!programmeId || !programmeName) throw new ApiError(400,"ID and Name are required fields");
    
    const existingProgramme = await Programme.findOne({ programmeId });

    if (existingProgramme) {
        throw new ApiError(409, "Programme ID already exists");
    }
    const programme = await Programme.create(
        {
            programmeId,
            programmeName
        }
    );

    if(!programme) throw new ApiError(400,"Failed to create programme");
    return res.status(201).json(
        new ApiResponse(201,programme,"programme created successfully")
    );
};

export {createProgramme};