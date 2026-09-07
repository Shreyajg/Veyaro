import { Schema, model } from 'mongoose';

const yearGroupSchema = new Schema(
  {
    yearGroupId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    yearGroupName: {
      type: String,
      required: true,
      trim: true,
    },

    schoolId: {
      type: String,
      required: true,
    },

    programmeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const YearGroup = model('YearGroup', yearGroupSchema);

export default YearGroup;