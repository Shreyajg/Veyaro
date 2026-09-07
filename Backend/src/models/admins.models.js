import {Schema,model} from 'mongoose';

const adminSchema=new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User',
            unique:true,
        },
        adminId:{
            type:String,
            unique:true,
            required:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
        },
        schoolId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'School',
        }

    },
    {timestamps:true},
);

const Admin=model('Admin',adminSchema);
export default Admin;