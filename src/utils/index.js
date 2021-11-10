const { DBService } = require('../services/db');
const { APIService } = require('../services/api');
const db = new DBService();
const api = new APIService();

const getTypes = () => new Promise((resolve,reject) => {
  // This function load the types table when start the server, if the table is empty
  db.getTypes() // Check if there is values in DB
    .then(response => {
      if (response.length === 0) {
        api.getDietNames() // Get types from API spoonacular
          .then(names =>  {
            db.saveTypeNames(names) // Saved in DB
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
      db.getItemByName(data.name)
        .then(item => resolve(item)) // Return the item
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const getAll = (name) => new Promise((resolve, reject) => {
  db.getAllItems()
    .then(itemsDB => {
      api.getAllItems()
        .then(itemsAPI => {
          const items = itemsDB.concat(itemsAPI);
          if (!name){
            resolve(items);
          } else {
            const filterByName = items.filter(item => item.name.includes(name));
            if (filterByName.length === 0){
              throw Error('Not Found');
            } else {
              resolve(filterByName);
            }
          }
        })
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const getItemById = (id) => new Promise((resolve, reject) => {
  api.getItemById(id)
    .then(response => resolve(response))
    .catch(err => {
      if (err.response.status !== 404){
        reject(err);
      } else {
        db.getItemById(id)
          .then(response => resolve(response))
          .catch(err => reject(err));
      }
    });
});

const getItemByName = (name) => new Promise((resolve, reject) => {
  db.getItemByName(name)
    .then(response => resolve(response))
    .catch(err => reject(err));
});

module.exports = {
  getTypes,
  insert,
  getAll,
  getItemById,
  getItemByName
};
