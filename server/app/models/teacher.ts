import { Sequelize, Model, Models, DataTypes } from 'sequelize'
import * as md5 from 'md5'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
    const Teacher = sequelize.define('teacher', {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        openid: {
            type: DataTypes.STRING(28),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: md5('123456'),
            set(val: string) {
                return md5(val)
            }
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
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
        tableName: 'teacher',
    })
    Teacher.associate = function (this: Model<any, any>, models: Models) {
        // associations can be defined here
        this.hasOne(models['feedback'])
        this.hasOne(models['release'])
        this.belongsToMany(models['course'], { through: models['courseInfo'] })
        this.belongsToMany(models['class'], { through: models['courseInfo'] })
        this.belongsToMany(models['term'], { through: models['courseInfo'] })
    }
    return Teacher
}