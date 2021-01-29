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

  cash_receipt.belongsTo(sale, { as: "sale_", foreignKey: "sale_id"});
  sale.hasMany(cash_receipt, { as: "cash_receipts", foreignKey: "sale_id"});
  exchange.belongsTo(customers, { as: "customer_", foreignKey: "customer_id"});
  customers.hasMany(exchange, { as: "exchanges", foreignKey: "customer_id"});
  exchange.belongsTo(purchase, { as: "purchase_", foreignKey: "purchase_id"});
  purchase.hasMany(exchange, { as: "exchanges", foreignKey: "purchase_id"});
  exchange_cash_receipt.belongsTo(customers, { as: "customer_", foreignKey: "customer_id"});
  customers.hasMany(exchange_cash_receipt, { as: "exchange_cash_receipts", foreignKey: "customer_id"});
  exchange_cash_receipt.belongsTo(exchange, { as: "exchange_", foreignKey: "exchange_id"});
  exchange.hasMany(exchange_cash_receipt, { as: "exchange_cash_receipts", foreignKey: "exchange_id"});
  payment.belongsTo(customers, { as: "customer_", foreignKey: "customer_id"});
  customers.hasMany(payment, { as: "payments", foreignKey: "customer_id"});
  payment.belongsTo(purchase, { as: "purchase_", foreignKey: "purchase_id"});
  purchase.hasMany(payment, { as: "payments", foreignKey: "purchase_id"});
  purchase.belongsTo(customers, { as: "customer_", foreignKey: "customer_id"});
  customers.hasMany(purchase, { as: "purchases", foreignKey: "customer_id"});
  sale.belongsTo(customers, { as: "customer_", foreignKey: "customer_id"});
  customers.hasMany(sale, { as: "sales", foreignKey: "customer_id"});
  sale.belongsTo(purchase, { as: "purchase_", foreignKey: "purchase_id"});
  purchase.hasMany(sale, { as: "sales", foreignKey: "purchase_id"});

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
