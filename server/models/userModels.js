import mongoose ,{Schema} from "mongoose";


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true,"First Name is Required!"]
        },
        lastName:{
            type:String,
            required:[true,"Last Name is Required!"]
        },
        email:{
            type:String,
            required:[true,"Email is Required!"]
        },
        password:{
            type:String,
            required:[true,"Password id Required!"],
            minlength:[6,"Password length should greather tha 6 characters"],
            select:true,
        },
        location:{type:String},
        profileUrl:{type:String},
        profession:{type:String},
        friends:[{type:Schema.Types.ObjectId,ref:"Users"}],
        views:[{type:String}],
        verified:{type:Boolean,default:false},
    },
    {timestamps:true}
)

const Users = mongoose.model("Users",userSchema)

export default Users;