'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VideoUpload extends Model {
    static associate(models) {
      // Association with Video model
      VideoUpload.belongsTo(models.Video, {
        foreignKey: 'video_id',
        as: 'video',
        onDelete: 'CASCADE',
      });
    }
  }

  VideoUpload.init(
    {
      upload_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      attempted_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'VideoUpload',
      tableName: 'video_uploads',
      timestamps: true,
      underscored: true,
    }
  );

  return VideoUpload;
};
