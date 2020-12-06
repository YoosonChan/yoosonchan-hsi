import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Grade = sequelize.define('grade', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    studentId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'student',
        key: 'id'
      }
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'class',
        key: 'id'
      }
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'term',
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
      type: DataTypes.STRING(10),
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
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
    tableName: 'grade'
  })
  Grade.associate = function(this: Model<any, any>, models: Models) {
    Grade.belongsTo(models['student'])
    Grade.belongsTo(models['term'])
    Grade.belongsTo(models['course'])
    Grade.belongsTo(models['class'])
  }
  return Grade
}