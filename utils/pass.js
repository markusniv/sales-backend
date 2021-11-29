'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserLogin } = require('../models/userModel');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new Strategy(
  async (email, password, done) => {
    const params = [email];
    try {
      console.log("Comparing passwords...");
      const [user] = await getUserLogin(params);
      console.log('Local strategy', user);
      if (user === undefined) {
        return done(null, false, {message: 'Incorrect email / password!'});
      }
      const result = await bcrypt.compare(password, user.passwd);
      if (!result) {
        return done(null, false, {message: 'Incorrect email / password!'});
      }
      delete user.passwd;
      return done(null, {...user}, {message: 'Logged In Successfully'});
    } catch (err) {
      return done(err);
    }
  }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
  }, (jwtPayload, done) => {
    return done(null, jwtPayload);
  }
));


module.exports = passport;