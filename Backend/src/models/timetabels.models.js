import {Schema,model} from 'mongoose';
const scheduleBlockSchema = new Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref:'Class',
      required: true,
    },

    startPeriod: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    endPeriod: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const timetableSchema=new Schema(
    {
        timetableId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        schoolId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'School',
        },
        programmeId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Programme',
        },
        yearGroupId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'YearGroup',
        },
        schedule: {
        type: [scheduleBlockSchema],
        default: [],
        },
    },
    {timestamps:true},
)

const Timetable=model('TimeTable',timetableSchema);
export default Timetable;