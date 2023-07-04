'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: {
        msg: 'Username is required'
      },
      unique: {
        msg: 'Username already existed'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        msg: 'Email is required'
      },
      unique: {
        msg: 'Email already existed'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        isEmail: {
          msg: 'Input must be in email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        msg: 'Password is required'
      },
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: 6,
          msg: 'Minimum password length is 6'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPass(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};