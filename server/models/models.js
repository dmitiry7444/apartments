const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Apartments = sequelize.define('apartments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.INTEGER},
    pos_on_floor: {type: DataTypes.INTEGER},
    price: {type: DataTypes.INTEGER},
    rooms: {type: DataTypes.INTEGER},
    area_total: {type: DataTypes.INTEGER},
    area_kitchen: {type: DataTypes.INTEGER},
    area_live: {type: DataTypes.INTEGER},
    layout_image: {type: DataTypes.STRING},
});

module.exports = Apartments;