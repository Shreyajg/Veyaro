import Assignment from "../models/assignments.models.js";
import Teacher from "../models/teachers.models.js";
import Class from "../models/classes.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Student from "../models/students.models.js";
import mongoose from "mongoose";
import StudentAssignment from "../models/studentAssignments.models.js";

const createAssignment = async (req, res) => {
    const {
        assignmentId,
        title,
        description,
        classId,
        dueDate
    } = req.body;

    if (!assignmentId || !title || !description || !classId || !dueDate) {
        throw new ApiError(
            400,
            "Assignment ID, title, description, class ID and due date are required fields"
        );
    }

    const existingAssignment = await Assignment.findOne({ assignmentId });

    if (existingAssignment) {
        throw new ApiError(409, "Assignment ID already exists");
    }

    const teacher = await Teacher.findOne({
        userId: req.user.userId
    });

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    const existingClass = await Class.findById(classId);

    if (!existingClass) {
        throw new ApiError(404, "Class not found");
    }
    const students= await Student.find({
        schoolId:existingClass.schoolId,
        programmeId:existingClass.programmeId,
        yearGroupId:existingClass.yearGroupId
    });

    if(students.length == 0) throw new ApiError(404,"No students for this class");
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const assignment = await Assignment.create([{
            assignmentId,
            title,
            description,
            classId,
            dueDate,
            createdBy: teacher._id
        }],{session});

        if (!assignment) {
            throw new ApiError(400, "Assignment creation failed");
        }
        const studentAssignment = students.map((student) => ({
            studentAssignmentId:`${assignmentId}-${student.studentId}`,
            studentId:student._id,
            assignmentId:assignment[0]._id,
            status:'pending'
        }));
        await StudentAssignment.insertMany(
                studentAssignment,
                { session }
            );
        await session.commitTransaction();
        return res.status(201).json(
            new ApiResponse(
                201,
                assignment,
                "Assignment created successfully"
            )
        );
    }
    catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        await session.endSession();

    }
    
};

const getAssignment = async (req,res) => {
    const student = await Student.findOne(
        {userId:req.user.userId
})

    if(!student) throw new ApiError(404,"Student not found");

    const assignment = await StudentAssignment.find({
            studentId: student._id
    }).populate({
        path:'assignmentId',
        populate:{
            path:'classId',
            select:'classId className'
        }
    }).sort({'assignmentId.dueDate':1});
    return res.status(200).json(
        new ApiResponse(
            200,
            assignment,
            'Assignments retrieved successfully'
        )
    );
}

export { createAssignment , getAssignment};