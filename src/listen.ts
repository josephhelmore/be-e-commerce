import app from './app';

const { PORT = 5500 } = process.env;

app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server is listening on port ${PORT}`);
});
