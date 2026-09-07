import {Schema,model} from 'mongoose';

const programmeSchema=new Schema(
    {
        programmeId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        programmeName:{
            type:String,
            required:true,
            trim:true,
        },
    },
    {timestamps:true},
)

const Programme=model('Programme',programmeSchema);
export default Programme;