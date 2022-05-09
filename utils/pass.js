'use strict';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {loginQuery} from '../js/db';

passport.use(new LocalStrategy({session: false},async (username, password, done) => {
  const user = await loginQuery(username);
  if (!user) return done(null, false, {message: 'username not found'});
  if (user.Password !== password) return done(null, false, {message: 'wrong password'});
  const loggedUser = JSON.parse(JSON.stringify(user));
  delete loggedUser.password;
  return done(null, loggedUser);
}));

export default passport;