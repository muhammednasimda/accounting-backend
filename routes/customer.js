const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

//create a new customer
router.post("/", async (req, res) => {
  const response = await models.customers.create({ ...req.body });
  res.json(response);
});
