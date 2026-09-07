import Programme from "../models/programmes.models.js";
import School from "../models/schools.models.js";
import Student from "../models/students.models.js";
import Timetable from "../models/timetabels.models.js";
import YearGroup from "../models/yearGroups.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Class from "../models/classes.models.js";

const createTimetable = async (req,res) => {

    const {
        timetableId,
        schoolId,
        programmeId,
        yearGroupId,
        schedule
    } = req.body;

    if(!timetableId || !schoolId || !programmeId || !yearGroupId || !schedule)
    {
        throw new ApiError(400,"TimetableId,SchoolId,programmeId,yearGroupId and schedule are required feilds");
    }

    const school = await School.findById(schoolId);
    if(!school) throw new ApiError(404, "School not found");

    const programme= await Programme.findById(programmeId);

    if(!programme) throw new ApiError(404,"Programme not found");

    const yearGroup=await YearGroup.findById(yearGroupId);

    if(!yearGroup) throw new ApiError(404,"Year Group not found");

    const existingTimetable = await Timetable.findOne({
        timetableId
    });

    if(existingTimetable) throw new ApiError(409,"Time table already exists");

    for(const block of schedule){
        const existingClass= await Class.findById(block.classId);
        if (!existingClass) {
            throw new ApiError(
                404,
                `Class not found: ${block.classId}`
            )
        }

    }

    const timetable= await Timetable.create({
        timetableId,
        schoolId,
        programmeId,
        yearGroupId,
        schedule
    });

    if(!timetable)
    {
        throw new ApiError(400,"Failed to create timetable");
    }

    return res.status(201).json(
        new ApiResponse(201,timetable,"Timetable created successfully")
    );

};

const getMyTimetable = async (req,res) => {

    const student= await Student.findOne({
        userId:req.user.userId
    })

    if(!student) throw new ApiError(404,"Student Not Found");

    const timetable = await Timetable.findOne({
        schoolId:student.schoolId,
        programmeId:student.programmeId,
        yearGroupId:student.yearGroupId
    }).populate({
    path: 'schedule.classId',
    select: 'classId className teacherId room colour',
    populate: {
        path: 'teacherId',
        select: 'teacherId fullName'
    }
});

    if(!timetable)
    {
        throw new ApiError(404,"Timetable not found");
    }

    return res.status(200).json(
        new ApiResponse(200,timetable,"Timetable retrieved successfully")
    );
};
export {createTimetable,getMyTimetable};