import {Schema,model} from 'mongoose';

const assignmentSchema=new Schema(
    {
        assignmentId:{
            type:String,
            unique:true,
            required:true,
            trim:true,
        },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        classId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Class',
        },
        dueDate:{
            type:Date,
            required:true,
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Teacher',
        },

    },
    {timestamps:true},
)

const Assignment=model('Assignment',assignmentSchema);
export default Assignment;