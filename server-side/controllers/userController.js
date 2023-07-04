const { comparePass } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")
const { OAuth2Client } = require('google-auth-library')

class UserController {
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

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      let user = await User.findOne({
        where: {
          email: payload.email
        }
      })

      const { given_name, email } = payload
      if (!user) {
        if (req.path === '/google-login') {
          user = await User.create({ username: given_name, email, password: String(Math.random()), role: 'Staff' })
        } else if (req.path === '/pub/google-login') {
          user = await User.create({ username: given_name, email, password: String(Math.random()), role: 'Customer' })
        }
      }

      const access_token = signToken({
        id: user.id
      })
      res.status(200).json({ access_token, email, role: user.role, username: user.username })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController