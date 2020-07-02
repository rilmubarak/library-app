'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get fullName(){
      return `${this.first_name} ${this.last_name}`
    }
    static associate(models) {
      // define association here
      User.belongsToMany(models.Book, { through: "UserBooks" });
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks:{
      beforeCreate:(value, options) =>{
        if(!value.last_name){
          value.last_name = value.first_name
        }
      },
      beforeUpdate:(value, options) =>{
        if(!value.last_name){
          value.last_name = value.first_name
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};