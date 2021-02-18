const express = require("express");
const router = express.Router();
const sequelize = require("../dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Sequilize = require("sequelize");
const Op = Sequilize.Op;

//create a new customer
router.post("/", async (req, res) => {
  const response = await models.customers.create({ ...req.body });
  res.json(response);
});

//update customer opening balance
router.put("/update_ob", async (req, res) => {
  const customer = await models.customers.findByPk(req.body.id);
  if (customer) {
    const response = await customer.update({
      opening_balance: req.body.opening_balance,
    });
    res.json(response);
  }
  res.send("customer doesnt exist");
});

//search a customer
router.get("/search/:searchTerm", async (req, res) => {
  const searchResponse = await models.customers.findAll({
    where: { customer_name: { [Op.like]: "%" + req.params.searchTerm + "%" } },
  });
  return res.json(searchResponse);
});

//get all customers
router.get("/", async (req, res) => {
  const response = await models.customers.findAll();
  res.json(response);
});

//get customer by id
router.get("/:id", async (req, res) => {
  const response = await models.customers.findOne({
    where: { id: req.params.id },
  });
  res.json(response);
});

module.exports = router;
