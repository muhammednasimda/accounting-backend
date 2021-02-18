var DataTypes = require("sequelize").DataTypes;
var _cash_receipt = require("./cash_receipt");
var _customers = require("./customers");
var _exchange = require("./exchange");
var _exchange_cash_receipt = require("./exchange_cash_receipt");
var _payment = require("./payment");
var _purchase = require("./purchase");
var _sale = require("./sale");

function initModels(sequelize) {
  var cash_receipt = _cash_receipt(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var exchange = _exchange(sequelize, DataTypes);
  var exchange_cash_receipt = _exchange_cash_receipt(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var purchase = _purchase(sequelize, DataTypes);
  var sale = _sale(sequelize, DataTypes);

  cash_receipt.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(cash_receipt, { as: "cash_receipts", foreignKey: "customer_id"});
  exchange.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(exchange, { as: "exchanges", foreignKey: "customer_id"});
  exchange_cash_receipt.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(exchange_cash_receipt, { as: "exchange_cash_receipts", foreignKey: "customer_id"});
  payment.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(payment, { as: "payments", foreignKey: "customer_id"});
  purchase.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(purchase, { as: "purchases", foreignKey: "customer_id"});
  sale.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(sale, { as: "sales", foreignKey: "customer_id"});

  return {
    cash_receipt,
    customers,
    exchange,
    exchange_cash_receipt,
    payment,
    purchase,
    sale,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
