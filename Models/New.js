const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  archiveDate: {
    type: Date,
    default: "",
  },
  archive: {
    type: Boolean,
    default: false,
  },
  source: {
    type: String,
  },
  image: {
    type: String,
  },
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
