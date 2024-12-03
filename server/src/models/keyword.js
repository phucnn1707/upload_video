'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  }

  Keyword.init(
    {
      keyword_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyword: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      trending_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Keyword',
      tableName: 'keywords',
      timestamps: true,
      underscored: true,
    }
  );

  return Keyword;
};
