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

exports.findById = (id) => {
  return userModel.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};
