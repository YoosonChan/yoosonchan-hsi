'use strict';
// const fs = require('fs');
import * as fs from 'fs'
// const path = require('path');
import * as path from 'path'
// const Sequelize = require('sequelize');
import * as Sequelize from 'sequelize'

import configs = require('../config/config.json');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';


let config: Conf = configs
config = config[env]
const db: DB = {};

let sequelize: Sequelize.Sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

export default db
