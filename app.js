import express from 'express';
import { testQuery } from './js/db';
import passport from './utils/pass';
import authRoute from './routes/authRoute';

const app = express();
app.use(express.json());

app.get('/secret*',
    passport.authenticate('local', {failureRedirect: '/login.html'}),
    (req, res) => {
      res.render('secret');
    });

    app.use('/auth', authRoute);

app.use(express.static('./public'));

app.listen(3000, () => {
  console.log('App running on http://localhost:3000/');
  testQuery();
});
