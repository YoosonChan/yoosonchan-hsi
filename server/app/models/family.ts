import { Sequelize, Model, Models, DataTypes } from 'sequelize'
'use strict'
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
    const Family = sequelize.define('family', {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: 'student',
                key: 'id'
            }
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parent',
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
        tableName: 'family'
    })
    Family.associate = function (this: Model<any, any>, models: Models) {
        // associations can be defined here
        // this.belongsTo(models['studnet'])
        // this.belongsTo(models['parent'])
    }
    return Family
}