'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      // Association with User model
      Video.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      });

      // Association with TextScript model
      Video.belongsTo(models.TextScript, {
        foreignKey: 'script_id',
        as: 'textScript',
        onDelete: 'CASCADE',
      });
    }
  }

  Video.init(
    {
      video_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      script_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      video_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      srt_file_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_uploaded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Video',
      tableName: 'videos',
      timestamps: true,
      underscored: true,
    }
  );

  return Video;
};
