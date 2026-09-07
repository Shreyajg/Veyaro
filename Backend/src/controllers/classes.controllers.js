import Class from "../models/classes.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Student from "../models/students.models.js";

const createClass = async (req,res) => {
    const {classId,
    className,
    schoolId,
    programmeId,
    yearGroupId,
    teacherId,
    room,
    colour,
    description}=req.body;

    if(!classId || !className || !schoolId || !programmeId || !yearGroupId || !teacherId || !room || !colour || !description)
    {
        throw new ApiError(400,"classId,className,schoolId,programmeId,yearGroupId,teacherId,room,colour and description are required fields");
    }

    const existingClass = await Class.findOne({classId});
    if(existingClass) throw new ApiError(409,"Class already exists");

    const classes= await Class.create(
        {classId,
        className,
        schoolId,
        programmeId,
        yearGroupId,
        teacherId,
        room,
        colour,
        description,}
        )
    if(!classes) throw new ApiError(400,"class couldnt be created");

    return res.status(201).json(
        new ApiResponse(201,classes,"class created successfully")
    );
};
const getMyClasses = async (req, res) => {
    const student = await Student.findOne({
        userId: req.user.userId
    });

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const classes = await Class.find({
        schoolId: student.schoolId,
        programmeId: student.programmeId,
        yearGroupId: student.yearGroupId
    })
    .populate('teacherId', 'teacherId fullName');

    return res.status(200).json(
        new ApiResponse(
            200,
            classes,
            'Classes retrieved successfully'
        )
    );
};
export {createClass,getMyClasses};