const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const UserModel = require('./UserModel');

const ArticleCategoryModel = dbCon.define('ArticleCategory', {
    id: {
        type: DataTypes.BIGINT,
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
   //         key: 'id'
   //     },
    //    onDelete: 'CASCADE',
     //   onUpdate: 'CASCADE',
    //},
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
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

ArticleCategoryModel.belongsTo(UserModel, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

UserModel.hasMany(ArticleCategoryModel, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = ArticleCategoryModel;

