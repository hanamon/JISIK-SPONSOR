'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations Setting
const {
  user,
  project,
  category,
  project_team,
  project_team_member,
  budget_item,
  project_milestone,
  tag,
  project_tag,
  comment,
  project_sponsor,
  wish
} = sequelize.models;

// one to many
user.hasMany(project, { foreignKey: 'user_id' });
project.belongsTo(user, { foreignKey: 'user_id', as: 'author' });

category.hasMany(project, { foreignKey: 'category_id' });
project.belongsTo(category, { foreignKey: 'category_id' });

project.hasMany(project_team, { foreignKey: 'project_id' });
project_team.belongsTo(project, { foreignKey: 'project_id' });

project.hasMany(budget_item, { foreignKey: 'project_id' });
budget_item.belongsTo(project, { foreignKey: 'project_id' });

project.hasMany(project_team_member, { foreignKey: 'project_id' });
project_team_member.belongsTo(project, { foreignKey: 'project_id' });

project.hasMany(project_milestone, { foreignKey: 'project_id' });
project_milestone.belongsTo(project, { foreignKey: 'project_id' });

tag.hasMany(project_tag, { foreignKey: 'tag_id' });
project_tag.belongsTo(tag, { foreignKey: 'tag_id' });

user.hasMany(comment, { foreignKey: 'user_id' });
comment.belongsTo(user, { foreignKey: 'user_id' });
comment.belongsTo(project, { foreignKey: 'project_id' });

user.hasMany(project_sponsor, { foreignKey: 'user_id' });
project_sponsor.belongsTo(user, { foreignKey: 'user_id' });

wish.belongsTo(project, { foreignKey: 'project_id' });
project_sponsor.belongsTo(project, { foreignKey: 'project_id' });

module.exports = db;
