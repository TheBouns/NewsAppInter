const axios = require("axios");
const News = require("../Models/New");

const NewsController = {
  async dbNews(req, res) {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=90d1047f0b774295a7a011e7eb9bf129"
      );
      const data = response.data.articles;
      data.map(async (item) => {
        await News.create({
          title: item.title,
          description:
            item.description === null
              ? "No description provided"
              : item.description,
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
      res.status(201).send("DB Has Been Created");
    } catch (error) {
      console.error(error);
    }
  },
  async create(req, res) {
    try {
      if (!req.file) {
        req.body.image = "";
      }
      const newArticle = await News.create({
        ...req.body,
        title: req.body.title,
        description: req.body.description,
        date: Date.now(),
        content: req.body.content,
        author: req.body.author === "" ? "anonimus" : req.body.author,
        source: req.body.source === "" ? "anonimus" : req.body.source,
        image:
          req.body.image === ""
            ? "https://res.cloudinary.com/ducxt7zb3/image/upload/v1651587481/newspaper-154444_oitkjk.png"
            : "http://localhost:3005/images/" + req.file.filename,
      });
      newArticle.save();
      res.status(201).send({ message: "New has been created", newArticle });
    } catch (error) {
      console.error(error);
    }
  },
  async getAllNews(req, res) {
    try {
      const allNews = await News.find().sort({ date: -1 });
      res.status(201).send(allNews);
    } catch (error) {
      console.error(error);
    }
  },
  async getAllNewsArchived(req, res) {
    const archived = await News.find({ archive: true }).sort({
      archiveDate: "desc",
    });
    res.status(201).send(archived);
  },
  async setArchived(req, res) {
    try {
      const article = await News.findByIdAndUpdate(req.params._id);
      article.archive = true;
      article.archiveDate = Date();
      article.save();
      res.status(201).send(article);
    } catch (error) {
      console.error(error);
    }
  },
  async deleteNew(req, res) {
    try {
      await News.findByIdAndDelete(req.params._id);
      res
        .status(200)
        .send({ message: "Article has been deleted ", _id: req.params._id });
    } catch (error) {
      console.error(error);
    }
  },
  async findNew(req, res) {
    try {
      const news = await News.find({
        title: { $regex: req.params.title, $options: "i" },
      });
      res.status(200).send(news);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = NewsController;
