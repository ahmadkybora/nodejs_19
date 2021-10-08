const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../../database/connection');
const UserModel = require('./UserModel');

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
   // userId: {
   //     type: DataTypes.INTEGER,
    //    references: {
   //         model: 'users',
    //        key: 'id'
   //     },
    //    onDelete: 'CASCADE',
    //    onUpdate: 'CASCADE',
   // },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'),
        required: true,
        validate: {
            isIn: [
                ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']
            ],
        },
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

Brand.belongsTo(UserModel, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

UserModel.hasMany(Brand, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Brand;

