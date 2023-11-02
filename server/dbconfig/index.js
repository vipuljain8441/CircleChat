import mongoose from "mongoose";

const connectdb = async()=>{
    try {
        const connect = await mongoose.connect("mongodb+srv://vipuljain8441:abcd%401234@cluster0.1vs8i5u.mongodb.net/socialDB",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("DB ERROR!!!"+error)
    }
};

export default connectdb;