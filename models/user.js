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
    first_name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "first_name tidak boleh kosong!"
        }
      }} ,
    last_name:{type: DataTypes.STRING} ,
    email:{
      type: DataTypes.STRING,
    validate:{
      isEmail:{
        args: true,
        msg: "Email tidak boleh kosong!"
      }
    }} ,
    password:{
      type: DataTypes.STRING,
    validate:{
      lengthEmail(value){
        if(value.length < 8 ){
          throw new Error("Password harus terdiri dari minimal 8 huruf!")
        }
      }
    }} 
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