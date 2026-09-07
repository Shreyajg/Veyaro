import {model, Schema} from 'mongoose';

const classSchema=new Schema(
    {
        classId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        className:{
            type:String,
            required:true,
            trim:true,
        },
        schoolId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'School',
        },
        programmeId:{
            type:Schema.Types.ObjectId,
            ref:'Programme',
            required:true,
        },
        yearGroupId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'YearGroup',
        },
        teacherId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Teacher',
        },
        room:{
            type:String,
            trim:true,
        },
        color:{
            type:String,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },

    },
    {timestamps:true},
)

const Class=model('Class',classSchema);
export default Class;