'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "id_user",
        onDelete: "CASCADE", // Add this line to enable delete on cascade
      })

      this.belongsTo(models.meja, {
        foreignKey: "id_meja",
        onDelete: "CASCADE", // Add this line to enable delete on cascade   
      })

      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: "detail_transaksi"
      })


    }
  }
  transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tgl_transaksi: DataTypes.DATE,
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id_user",
      },
      onDelete: "CASCADE",
    },
    id_meja: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "meja",
        key: "id_meja",
      },
      onDelete: "CASCADE",
    },
    nama_pelanggan: DataTypes.STRING,
    status: DataTypes.ENUM("belum_bayar", "lunas"),
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi',
    freezeTableName: true
  });
  return transaksi;
};