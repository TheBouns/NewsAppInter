const User = require("../Models/User");
const bcrypt = require("bcrypt");
const UserController = {
  async createUser(req, res) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 12);
      const user = await User.create({ ...req.body, password: hash });
      console.log("user has been created");
      res.status(201).send({ message: "user has been created", user });
    } catch (error) {
      console.error(error);
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ message: "user or password incorrect" });
      }
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(400).send({ message: "user or password incorrect" });
      }
      res.status(201).send({ message: `Welcome ${user.name.toUpperCase()}` });
    } catch (error) {
      console.error(error);
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.find({ role: "user" });
      res
        .status(201)
        .send({ message: `There is ${users.length} Users in DB`, users });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
