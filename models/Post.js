const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

PostSchema.virtual("formattedDate").get(function () {
  return DateTime.fromJSDate(this.postedDate).toLocaleString(
    DateTime.DATETIME_FULL
  );
});

module.exports = mongoose.model("Post", PostSchema);
