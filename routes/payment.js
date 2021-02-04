const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.post("/", async (req, res) => {
  const response = await models.payment.create({ ...req.body });
  res.json(response);
});

//get all payment of a user
router.get("/:customer_id", async (req, res) => {
  const response = await models.payment.findAll({
    where: { customer_id: req.params.customer_id },
  });
  res.json(response);
});

module.exports = router;
