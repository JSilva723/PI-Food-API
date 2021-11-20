const { DBService } = require('../services/db');
const { APIService } = require('../services/api');
const db = new DBService();
const api = new APIService();

const getTypes = () => new Promise((resolve, reject) => {
  // This function load the types table when start the server, if the table is empty
  db.getTypes() // Check if there is values in DB
    .then(response => {
      if (response.length === 0) {
        api.getDietNames() // Get types from API spoonacular
          .then(names => {
            const formatNames = names.map(name => name.toLowerCase()); // Change to lower case names
            db.saveTypeNames(formatNames) // Saved in DB
              .then(response => resolve(response))
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      } else {
        resolve(response);
      }
    })
    .catch(err => reject(err));
});

const insert = (data, types) => new Promise((resolve, reject) => {
  db.create(data, types) // Insert the item in DB
    .then(() => {
      db.getItemByTitle(data.title)
        .then(item => resolve(item)) // Return the item
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const getAll = (title) => new Promise((resolve, reject) => {
  db.getAllItems()
    .then(itemsDB => {
      api.getAllItems()
        .then(itemsAPI => {
          const items = itemsDB.concat(itemsAPI);
          if (title === 'undefined') {
            resolve(items);
          } else {
            const filterByTitle = items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
            if (filterByTitle.length === 0) {
              throw Error();
            } else {
              resolve(filterByTitle);
            }
          }
        })
        .catch(err => {
          console.log(err); // eslint-disable-line
          resolve(itemsDB); // no network or it exceed limit to queries
        });
    })
    .catch(err => reject(err));
});

const getItemById = (id) => new Promise((resolve, reject) => {
  const number = Number(id);
  if (isNaN(number)) {
    db.getItemById(id)
      .then(response => resolve(response))
      .catch(err => reject(err));
  } else {
    api.getItemById(id)
      .then(response => resolve(response))
      .catch(err => reject(err));
  }
});

module.exports = {
  getTypes,
  insert,
  getAll,
  getItemById
};
