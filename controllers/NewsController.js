const axios = require("axios");
const { response } = require("express");
const News = require("../Models/New");

const NewsController = {
  async dbNews(req, res) {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=90d1047f0b774295a7a011e7eb9bf129"
    );
    const data = response.data.articles;
    data.map(async (item) => {
      await News.create({
        title: item.title,
        description: item.description,
        date: Date(item.publishedAt),
        content: item.content === null ? "loreipsum" : item.content,
        author: item.author === null ? "Anonimus" : item.author,
        arvhiveDate: "",
        source: item.source.name,
        image:
          item.urlToImage === null
            ? "https://res.cloudinary.com/ducxt7zb3/image/upload/v1651587481/newspaper-154444_oitkjk.png"
            : item.urlToImage,
      });
    });
    res.status(200).send("DB Has Been Created");
  },
  async create(req, res) {
    const newArticle = await News.create({
      ...req.body,
      title: req.body.title,
      description: req.body.description,
      date: Date(),
      content: req.body.content,
      author: req.body.author == "" ? "anonimus" : req.body.author,
      source: req.body.source,
      image:
        req.body.image == ""
          ? "https://res.cloudinary.com/ducxt7zb3/image/upload/v1651587481/newspaper-154444_oitkjk.png"
          : req.body.image,
    });
    res.status(200).send({ message: "New has been created", newArticle });
  },
};

module.exports = NewsController;
