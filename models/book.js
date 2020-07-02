'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.User, { through: "UserBooks" });
    }
  };
  Book.init({
    tittle:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "tittle tidak boleh kosong!"
        }
      }},
    stock:{type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args: true,
          msg: "stock tidak boleh kosong!"
        }
      }} 
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};