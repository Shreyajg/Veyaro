import { Schema,model } from "mongoose";

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['Student','Teacher','Admin'],
            required:true,
        },
    },
    {timestamps:true}
)

const User=model('User',userSchema);
export default User;