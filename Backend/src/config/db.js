import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const ConnectDB=async() =>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Mongo DB connection successfully established and running at PORT : ${process.env.PORT}`);
    }
    catch(e){
        console.log("MongoDB connection failed ",e);
        process.exit(1);
    }
}
export default ConnectDB;