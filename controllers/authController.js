'use strict';
import passport from '../utils/pass';

const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json(info);
    }

    req.login(user, {session: false}, (err) => {
      if (err) res.send(err);
      return res.json(user);
    });
  })(req, res);
};

const register = (req, res) => {

};

export {
  login,
  register,
};