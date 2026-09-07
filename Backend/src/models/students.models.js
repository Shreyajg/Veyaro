import {Schema,model} from 'mongoose';
const studentSchema=new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true,
            unique:true,
        },
        preferredName:{
            type:String,
            required:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
        },
        initials:{
            type:String,
            required:true,
            trim:true,
        },
        studentId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        schoolId:{
            type:Schema.Types.ObjectId,
            ref:'School',
            required:true,
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
    },

    {timestamps:true},
);

const Student=model('Student',studentSchema);

export default Student;