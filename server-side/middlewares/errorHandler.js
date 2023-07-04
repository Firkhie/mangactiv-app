function errorHandler(err, req, res, next) {
  let status
  let message

  switch (err.name) {
    case 'UsernameRequired':
      status = 400
      message = 'Username is required'
      break;

    case 'EmailRequired':
      status = 400
      message = 'Email is required'
      break;

    case 'PasswordRequired':
      status = 400
      message = 'Password is required'
      break;

    case 'SequelizeUniqueConstraintError':
      status = 400
      message = err.errors[0].message
      break;

    case 'SequelizeValidationError':
      status = 400
      message = err.errors[0].message
      break;

    case 'EmailPasswordInvalid':
      status = 401
      message = 'Invalid email/password'
      break;

    case 'InvalidToken':
      status = 401
      message = 'Invalid token'
      break;

    case 'JsonWebTokenError':
      status = 401
      message = 'Invalid token'
      break;

    case 'NotFound':
      status = 404
      message = 'Not found'
      break;

    case 'BookmarkNotFound':
      status = 404
      message = 'Bookmark not found'
      break;

    case 'DuplicatedManga':
      status = 409
      message = 'Manga already bookmarked'
      break;

    case 'Forbidden':
      status = 403
      message = 'You are not authorized'
      break;

    default:
      status = 500
      message = 'Internal Server Error'
      break;
  }

  res.status(status).json({ message })
  next()
}

module.exports = { errorHandler }