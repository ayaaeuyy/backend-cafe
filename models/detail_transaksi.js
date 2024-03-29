'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi, {
        foreignKey: "id_transaksi",
        as: "transaksi"
      })

      this.belongsTo(models.menu, {
        foreignKey: "id_menu",
        as: "menu"
      })
    }
  }
  detail_transaksi.init(
    {
      id_detail_transaksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_transaksi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "transaksi",
          key: "id_transaksi",
        },
        onDelete: "CASCADE",
      },
      id_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "menu",
          key: "id_menu",
        },
        onDelete: "CASCADE",
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "detail_transaksi",
      freezeTableName: true,
    }
  );
  return detail_transaksi;
};
