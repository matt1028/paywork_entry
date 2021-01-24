const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // req.body.email
        passwordField: 'password' // req.body.password
      },
      async (email, password, done) => {
        try {
          const existed = await User.findOne({ where: { email } });
          if (existed) {
            const result = await bcrypt.compare(password, existed.password);
            if (result) {
              done(null, existed);
            } else {
              done(null, false, {
                message: '이메일 혹은 비밀번호가 올바르지 않습니다.'
              });
            }
          } else {
            done(null, false, {
              message: '이메일 혹은 비밀번호가 올바르지 않습니다.'
            });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};