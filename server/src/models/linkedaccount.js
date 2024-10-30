'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LinkedAccount extends Model {
    static associate(models) {
      LinkedAccount.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  }

  LinkedAccount.init(
    {
      account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platform_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      linked_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'LinkedAccount',
      tableName: 'linked_accounts',
      timestamps: true,
      underscored: true,
    }
  );

  return LinkedAccount;
};
