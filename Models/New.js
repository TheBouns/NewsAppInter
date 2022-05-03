const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  data: {
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
  },
  archive: {
    type: Boolean,
    default: false,
  },
});
