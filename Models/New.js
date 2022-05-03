const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  content: {
    type: String,
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
