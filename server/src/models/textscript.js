'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TextScript extends Model {
    static associate(models) {
      TextScript.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      });
      TextScript.belongsTo(models.Keyword, {
        foreignKey: 'keyword_id',
        as: 'keyword',
        onDelete: 'CASCADE',
      });
    }
  }

  TextScript.init(
    {
      script_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      keyword_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      sequelize,
      modelName: 'TextScript',
      tableName: 'text_scripts',
      timestamps: true,
      underscored: true,
    }
  );

  return TextScript;
};
