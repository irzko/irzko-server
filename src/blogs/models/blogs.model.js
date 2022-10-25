const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogsSchema = new Schema(
  {
    title: String,
    thumbnail: String,
    content: String,
    author_id: String,
  },
  { timestamps: true }
);

blogsSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    thumbnail: this.thumbnail,
    content: this.content,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const blogsModel = mongoose.model("blogs", blogsSchema);

exports.findAll = async () => {
  return await blogsModel.find();
};

exports.createBlog = (postData) => {
  const post = new blogsModel(postData);
  return post.save();
};

exports.findById = async (id) => {
  return await blogsModel.findById(id);
};

