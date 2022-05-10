'use strict';
import passport from '../utils/pass';
import {loginQuery, registerQuery} from '../js/db';

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

const register = async (req, res) => {
  const username = req.body.username;
  const pw = req.body.password;
  const cpw = req.body.confirmPassword;
  if (!username || username.trim() === '') {
    return res.status(400).json({message: 'username needed'});
  }
  if (!pw || pw.trim() === '') {
    return res.status(400).json({message: 'password can\'t be empty'});
  }
  if (pw !== cpw) {
    return res.status(400).json({message: 'passwords doesn\'t match'});
  }
  try {
    const user = await loginQuery(username);
    if (user) {
      return res.status(400).json({message: 'username already exists'});
    }
    const newUser = await registerQuery(username, pw);
    delete newUser.Password;
    return res.json(newUser);
  } catch (e) {
    return res.status(400).json({message: 'something went wrong'});
  }
};

export {
  login,
  register,
};