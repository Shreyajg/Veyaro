import {Schema,model} from 'mongoose';

const schoolSchema=new Schema(
    {
        schoolId:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        schoolName:{
            type:String,
            required:true,
            trim:true,
        },
    },
    {timestamps:true},
);

const School=model('School',schoolSchema);
export default School;