const mongoose = require("mongoose");

const { Schema } = mongoose;

const postsSchema = new Schema({
  title: String,
  img: String,
});

postsSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    img: this.img,
  };
};

const postsModel = mongoose.model("posts", postsSchema);

exports.findAll = () => {
  return postsModel.find().then((result) => {
    // result = result.toJSON();
    return result;
  });
};

// exports.createUser = (userData) => {
//   const user = new userModel(userData);
//   return user.save();
// };

// exports.findById = (id) => {
//   return userModel.findById(id).then((result) => {
//     result = result.toJSON();
//     delete result._id;
//     delete result.__v;
//     return result;
//   });
// };
