import { Schema, model } from 'mongoose';

const announcementSchema = new Schema(
  {
    announcementId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },

    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'School',
    },

    programmeId: {
      type: Schema.Types.ObjectId,
      ref: 'Programme',
      default: null,
    },

    yearGroupId: {
      type: Schema.Types.ObjectId,
      ref: 'YearGroup',
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Announcement = model('Announcement', announcementSchema);

export default Announcement;