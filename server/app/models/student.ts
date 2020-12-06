import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
    const Student = sequelize.define('student', {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        headmasterId: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        classId: {
            type: DataTypes.INTEGER,
            // field: 'classId',
            allowNull: false,
            references: {
              model: 'class',
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
        tableName: 'student'
    })
    Student.associate = function (this: Model<any, any>, models: Models) {
        // associations can be defined here
        this.belongsTo(models['class'])
        this.hasOne(models['grade'])
        this.belongsToMany(models['parent'], { through: models['family'] })
    }
    return Student
}