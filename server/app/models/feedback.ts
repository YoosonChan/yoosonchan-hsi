import { Sequelize, Model, Models, DataTypes } from 'sequelize'

'use strict'

module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Feedback = sequelize.define('feedback', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parent',
        key: 'id'
      }
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
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
    tableName: 'feedback'
  })
  Feedback.associate = function(this: Model<any, any>, models: Models) {
    this.belongsTo(models['teacher'])
    this.belongsTo(models['parent'])
  }
  return Feedback
}