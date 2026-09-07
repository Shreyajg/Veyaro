import { Schema, model } from 'mongoose';

const ibCoreSchema = new Schema(
  {
    ibCoreId: {
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

    type: {
      type: String,
      required: true,
      enum: ['CAS', 'EE', 'TOK'],
    },

    lead: {
      type: Schema.Types.ObjectId,
      ref:'Teacher',
      required:true,
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started',
    },
  },
  { timestamps: true }
);

const IBCore = model('IBCore', ibCoreSchema);

export default IBCore;