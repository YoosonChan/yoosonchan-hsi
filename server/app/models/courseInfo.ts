import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
    const CourseInfo = sequelize.define('courseInfo', {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        termId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'term',
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
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'course',
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
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'courseInfo'
    })
    CourseInfo.associate = function (this: Model<any, any>, models: Models) {
        // associations can be defined here
        this.belongsTo(models['term'])
        this.belongsTo(models['class'])
        this.belongsTo(models['course'])
        this.belongsTo(models['teacher'])
    }
    return CourseInfo
}