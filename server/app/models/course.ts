import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Course = sequelize.define('course', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'course'
  })
  Course.associate = function (this: Model<any, any>, models: Models) {
    // associations can be defined here
    this.hasOne(models['grade'])
    this.hasOne(models['release'])
    this.belongsToMany(models['class'], { through: models['courseInfo'] })
    this.belongsToMany(models['teacher'], { through: models['courseInfo'] })
    this.belongsToMany(models['term'], { through: models['courseInfo'] })
  }
  return Course
}