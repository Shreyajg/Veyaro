import { Schema, model } from 'mongoose';

const teacherSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },

    teacherId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'School',
    },
  },
  { timestamps: true }
);

const Teacher = model('Teacher', teacherSchema);

export default Teacher;