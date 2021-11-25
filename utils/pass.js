'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { getUserLogin } = require('../models/userModel');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new Strategy(
  async (email, password, done) => {
    const params = [email];
    try {
      const [user] = await getUserLogin(params);
      console.log('Local strategy', user);
      if (user === undefined) {
        return done(null, false, {message: 'Incorrect email.'});
      }
      if (user.passwd !== password) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      delete user.password;
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