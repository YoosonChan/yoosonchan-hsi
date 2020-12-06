import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Release = sequelize.define('release', {
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
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'class',
        key: 'id'
      }
    },
    teacherId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'id'
      }
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'release'
  })
  Release.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here
    this.belongsTo(models['class'])
    this.belongsTo(models['teacher'])
    this.belongsTo(models['course'])
  }
  return Release
}