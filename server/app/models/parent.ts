import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Parent = sequelize.define('parent', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING(28),
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'parent'
  })
  Parent.associate = function (this: Model<any, any>, models: Models) {
    // associations can be defined here
    this.hasOne(models['feedback'])
    this.belongsToMany(models['student'], { through: models['family'] })
  }
  return Parent
}