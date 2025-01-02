'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AvatarAI extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  AvatarAI.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      avatar_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      voice_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [['microsoft', 'elevenlabs', 'amazon']],
        },
      },
    },
    {
      sequelize,
      modelName: 'AvatarAI',
      tableName: 'avatar_ai',
      timestamps: true,
      underscored: true,
    }
  );

  return AvatarAI;
};
