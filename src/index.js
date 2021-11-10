require('dotenv').config();
const { app } = require('./app.js');
const { sequelize } = require('./db/connection/index.js');
const PORT = process.env.PORT || 1234 // eslint-disable-line

// Syncing all the models at once.
sequelize.sync({ force: false }).then(() => {
  console.log('Successful connection'); // eslint-disable-line no-console
  app.listen(PORT, () => {
    console.log('Listening at %d', PORT); // eslint-disable-line no-console
  });
});
