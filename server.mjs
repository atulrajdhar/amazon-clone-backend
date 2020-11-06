// imports
import db from './config/db';
import app from './app';

const port = process.env.PORT || 9000;

// connect db
db.connect()
  .then(() => {
      // listen
      app.listen(port, () => console.log(`listening on localhost: ${port}`));
  });