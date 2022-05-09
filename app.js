import express from 'express';

// does this work?

const app = express();

app.listen(3000, () => {
  console.log('App running on http://localhost:3000/')
})