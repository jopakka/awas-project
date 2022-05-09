'use strict';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const users = [
  {
    username: 'test',
    password: '1234',
  },
  {
    username: 'admin',
    password: 'asdf',
    isAdmin: true,
  },
];

passport.use(new LocalStrategy((username, password, done) => {
  console.log("here", username, password)
  const user = users.find(u => u.username === username);
  if (!user) return done(null, false, {message: 'username not found'});
  if (user.password !== password) return done(null, false, {message: 'wrong password'});
  const loggedUser = JSON.parse(JSON.stringify(user));
  delete loggedUser.password;
  return done(null, loggedUser);
}));

export default passport;