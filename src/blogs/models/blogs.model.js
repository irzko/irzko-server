const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogsSchema = new Schema(
  {
    title: String,
    thumbnail: String,
    content: String,
    view: Number,
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
    view: this.view,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const blogsModel = mongoose.model("blogs", blogsSchema);

exports.findAll = async () => {
  return await blogsModel.find();
};

exports.search = async (keyword) => {
  return await blogsModel.find({ title: { $regex: `${keyword}` } });
};

exports.createBlog = (postData) => {
  postData.view = 0;
  const post = new blogsModel(postData);
  return post.save();
};

exports.findById = async (id) => {
  const blog = await blogsModel.findById(id);
  blog.view++;
  blog.save();
  return blog;
};
