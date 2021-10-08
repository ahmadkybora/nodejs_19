const { Sequelize, Model, DataTypes } = require("sequelize");
const dbCon = require('../../database/connection');
const BrandModel = require('./BrandModel');
const UserModel = require('./UserModel');

const ProductCategory = dbCon.define('ProductCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
  //  userId: {
   //     type: DataTypes.INTEGER,
   //     references: {
   //         model: 'users',
   //         key: 'id'
    //    },
    //    onDelete: 'CASCADE',
    //    onUpdate: 'CASCADE',
   // },
  //  brandId: {
  //      type: DataTypes.INTEGER,
    //    references: {
   //         model: 'brands',
    //        key: 'id'
    //    },
     //   onDelete: 'CASCADE',
     //   onUpdate: 'CASCADE',
   // },
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    image: {
        type: DataTypes.STRING,
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

ProductCategory.belongsTo(BrandModel, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

BrandModel.hasMany(ProductCategory, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

ProductCategory.belongsTo(UserModel, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

UserModel.hasMany(ProductCategory, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = ProductCategory;
