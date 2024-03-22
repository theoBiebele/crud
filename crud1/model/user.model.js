import mongoose, {model} from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
      },
      username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
      },
      email: {
        type: String,
        required: [true, "Please enter your valid email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please enter your password"],
        // select:False,
        unique: true,
      },
      sex: {
        type: String,
        required: [true, "Please enter your gender"],
      },
      bio: {
        type: String,
        default: "",
      },
      phone_number: {
        type: String,
        default: "",
      },
      IsAdmin: {
        type: Boolean,
        // default:  False
      },
},
{
    timestamps: true,
}
);

const User = mongoose.model ("user", UserSchema);

export default User;