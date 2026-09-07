import Announcement from "../models/announcements.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Student from "../models/students.models.js";

const createAnnouncement = async (req, res) => {
    const {
        announcementId,
        title,
        summary,
        body,
        schoolId,
        programmeId,
        yearGroupId
    } = req.body;

    if (!announcementId || !title || !summary || !body || !schoolId) {
        throw new ApiError(
            400,
            "Announcement ID, title, summary, body and school ID are required fields"
        );
    }

    const existingAnnouncement = await Announcement.findOne({
        announcementId
    });

    if (existingAnnouncement) {
        throw new ApiError(
            409,
            "Announcement ID already exists"
        );
    }

    const announcement = await Announcement.create({
        announcementId,
        title,
        summary,
        body,
        schoolId,
        programmeId: programmeId || null,
        yearGroupId: yearGroupId || null,
        createdBy: req.user.userId
    });

    if (!announcement) {
        throw new ApiError(
            400,
            "Announcement creation failed"
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            announcement,
            "Announcement created successfully"
        )
    );
};

const getAnnouncements = async (req,res) => {
    const student = await Student.findOne({
        userId : req.user.userId
    });
    if(!student) throw new ApiError(404,"Student not found");

    const announcement = await Announcement.find({
        schoolId: student.schoolId,
        $and: [
            {
                $or: [
                    { programmeId: null },
                    { programmeId: student.programmeId }
                ]
            },
            {
                $or: [
                    { yearGroupId: null },
                    { yearGroupId: student.yearGroupId }
                ]
            }
        ],
    }).sort({createAt:-1});

    return res.status(200).json(
        new ApiResponse(200,announcement,"Announcement fetched successfully")
    );
};

export { createAnnouncement,getAnnouncements };