import { Schema, model } from 'mongoose';

const studentAssignmentSchema = new Schema(
  {
    studentAssignmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },

    assignmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Assignment',
    },

    status: {
      type: String,
      required: true,
      enum: ['pending', 'complete'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// A student should have only one record for a particular assignment
studentAssignmentSchema.index(
  { studentId: 1, assignmentId: 1 },
  { unique: true }
);

const StudentAssignment = model(
  'StudentAssignment',
  studentAssignmentSchema
);

export default StudentAssignment;