import mongoose from "mongoose";

// 1st create user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // required: true means name field required to store any user in the database
  email: { type: String, required: true, unique: true }, // can't create mutiple user with same email id
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false }, // if the user account is verified then the value will be true
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});

// 2nd - using the user schema create the user model

const userModel = mongoose.models.user || mongoose.model("user", userSchema); // search for user model is available then user mode used in "userModel", its not available create the user model using the user schema

// export the user model
export default userModel; // use can userModel in other file to store the data in the mongodb database
