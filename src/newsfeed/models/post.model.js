const { query } = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const postsSchema = new Schema(
  {
    caption: String,
    image: String,
    author_id: String,
    like: Array,
    comment: Array,
  },
  { timestamps: true }
);

postsSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    caption: this.caption,
    image: this.image,
    author_id: this.author_id,
    like: this.like,
    comment: this.comment,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const postsModel = mongoose.model("newsfeeds", postsSchema);

exports.createPost = (postData) => {
  const post = new postsModel(postData);
  return post.save();
};

exports.findAll = async () => {
  return await postsModel.find();
};

exports.findById = async (params) => {
  return await postsModel.find({ author_id: params });
};

exports.findPostById = async (params) => {
  return await postsModel.findById(params);
};

exports.like = async (id, profile_id) => {
  const doc = await postsModel.findById(id);
  doc.like.push(profile_id);
  doc.save();
};

exports.unlike = async (id, profile_id) => {
  const doc = await postsModel.findById(id);
  doc.like = doc.like.filter((item) => item !== profile_id);
  doc.save();
};

exports.delete = async (id) => {
  await postsModel.findByIdAndDelete(id);
};

exports.comment = async (id_post, profile_id, comment) => {
  const doc = await postsModel.findById(id_post);
  doc.comment.push({profile_id:profile_id, comment:comment});
  doc.save();
}