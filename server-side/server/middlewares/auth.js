const { decodeToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
   try {
      const { access_token } = req.headers
      if (!access_token) throw { name: 'InvalidToken' }
      let verifiedToken = decodeToken(access_token)
      let user = await User.findByPk(verifiedToken.id)
      if (!user) throw { name: 'InvalidToken' }
      req.user = {
         userId: user.id,
         username: user.username,
         email: user.email
      }
      next()
   } catch (err) {
      next(err)
   }
}

module.exports = { authentication }