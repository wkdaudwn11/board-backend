import mongoose from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  writer: { type: String, default: null },
  title: { type: String, default: null },
  content: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("boards", boardSchema);
