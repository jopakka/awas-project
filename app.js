import express from 'express';
import passport from './utils/pass';

const app = express();
app.use(express.json());

app.get('/secret*',
    passport.authenticate('local', {failureRedirect: '/login.html'}),
    (req, res) => {
      res.render('secret');
    });

app.post('/login', );

app.use(express.static('./public'));

app.listen(3000, () => {
  console.log('App running on http://localhost:3000/');
});