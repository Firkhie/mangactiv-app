const { axios } = require("axios")
const { comparePass } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User, Bookmark } = require("../models")
const { OAuth2Client } = require('google-auth-library')

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      if (!username) throw { name: 'UsernameRequired' }
      if (!email) throw { name: 'EmailRequired' }
      if (!password) throw { name: 'PasswordRequired' }

      const createdUser = await User.create({ username, email, password })
      res.status(201).json({ id: createdUser.id, username: createdUser.username })
    } catch (err) {
      next(err)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) throw { name: 'EmailRequired' }
      if (!password) throw { name: 'PasswordRequired' }

      const user = await User.findOne({ where: { email } })
      if (user) {
        let checkPassword = comparePass(password, user.password)
        if (checkPassword) {
          let access_token = signToken({ id: user.id })
          res.status(200).json({ access_token })
        } else {
          throw { name: 'EmailPasswordInvalid' }
        }
      } else {
        throw { name: 'EmailPasswordInvalid' }
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = Controller