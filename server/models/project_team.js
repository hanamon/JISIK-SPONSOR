'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project_team.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      project_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      team_name: {
        type: DataTypes.STRING(255)
      },
      team_description: {
        type: DataTypes.TEXT
      },
      profile_url: {
        type: DataTypes.STRING(255)
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    {
      sequelize,
      modelName: 'project_team',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return project_team;
};
