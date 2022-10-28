const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    day: Number,
    month: Number,
    year: Number,
    gender: Number,
    avatar: String,
    permissionLevel: Number,
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    day: this.day,
    month: this.month,
    year: this.year,
    avatar: this.avatar,
    gender: this.gender,
    permissionLevel: this.permissionLevel,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const userModel = mongoose.model("Users", userSchema);

exports.createUser = (userData) => {
  const user = new userModel(userData);
  return user.save();
};

exports.findById = async (id) => {
  const result = await userModel.findById(id);
  // delete result._id;
  // delete result.__v;
  return result;
};

exports.changeAvt = async (body) => {
  await userModel.findByIdAndUpdate(body._id, { avatar: body.avatar });
};

exports.changeName = async (id, fname, lname) => {
  await userModel.findByIdAndUpdate(id, {
    firstName: fname,
    lastName: lname,
  });
};

exports.changeEmail = async (id, email) => {
  await userModel.findByIdAndUpdate(id, {
    email: email,
  });
};

exports.getAll = async () => {
  return await userModel.find({});
};
