const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    currency_type: {
      type: DataTypes.ENUM('SR','AED','INR',''),
      allowNull: false
    },
    currency_quantity: {
      type: DataTypes.DECIMAL(30,2),
      allowNull: false
    },
    conversion_rate: {
      type: DataTypes.DECIMAL(30,3),
      allowNull: false
    },
    currency_quantity_aed: {
      type: DataTypes.DECIMAL(30,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "customer_id",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};
