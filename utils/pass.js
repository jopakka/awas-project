'use strict';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {loginQuery} from '../js/db';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'

const cookieExtractor = (req) => {
  return (req && req.cookies) ? req.cookies['token'] : null;
}

passport.use(new LocalStrategy({session: false},async (username, password, done) => {
  const user = await loginQuery(username);
  if (!user) return done(null, false, {message: 'username not found'});
  if (user.Password !== password) return done(null, false, {message: 'wrong password'});
  const loggedUser = JSON.parse(JSON.stringify(user));
  delete loggedUser.password;
  return done(null, loggedUser);
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: 'secret',
  passReqToCallback: true,
}, (req, payload, done) => {
  console.log("payload", payload)
  req.user = payload;
  done(null, payload)
}))

export default passport;