import mongoose from "mongoose";

const connectdb = async()=>{
    try { 
        const connect = await mongoose.connect("process.env.MONGODB_URI",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("DB ERROR!!!"+error)
    }
};

export default connectdb;
