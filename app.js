import express from 'express';

const app = express();

app.use(express.static('./public'));

app.listen(3000, () => {
  console.log('App running on http://localhost:3000/');
});