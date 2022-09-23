import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost/irzko-db");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date,
});
