import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", userSchema);
