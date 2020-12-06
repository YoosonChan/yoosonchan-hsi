import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
    const Class = sequelize.define('class', {
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
        headmasterId: {
            type: Sequelize.STRING(20),
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
        tableName: 'class'
    })
    Class.associate = function (this: Model<any, any>, models: Models) {
        // associations can be defined here
        this.hasOne(models['release'])
        this.hasOne(models['grade'])
        this.hasMany(models['student'])
        this.hasMany(models['courseInfo'])
        this.belongsToMany(models['course'], {through: models['courseInfo']})
        this.belongsToMany(models['teacher'], { through: models['courseInfo'] })
        this.belongsToMany(models['term'], { through: models['courseInfo'] })
    }
    return Class
}