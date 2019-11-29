const jwt = require('jsonwebtoken');

class JwtValidator {
  static validate(token, secret, algorithm) {
    return jwt.verify(token, secret, { algorithms: [`${algorithm}`] }, (err, decoded) => {
      if (err) {
        return false;
      }
      return true;
    });
  }

  static decode(token) {
    return jwt.decode(token);
  }
}

module.exports = JwtValidator;
