const { Type } = require('../db/models/Type');
const { Recipe } = require('../db/models/Recipe');


function DBService() { }

DBService.prototype.getTypes = () => new Promise((resolve, reject) => {
  Type.findAll()
    .then(response => {
      const types = response.map(e => e.dataValues.name);
      resolve(types);
    })
    .catch(err => reject(err));
});

DBService.prototype.saveTypeNames = function (names) { 
  // This function save in DB the names diets
  return new Promise((resolve, reject) => {
    const promises = names.map(name => Type.create({ name })); // Generate array of promises
    Promise.all(promises)
      .then(() => {
        this.getTypes() // Search in DB
          .then(response => resolve(response))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

DBService.prototype.create = (data, types) => new Promise((resolve, reject) => {
  Recipe.create(data)
    .then(newData => {
      Promise.all(types.map(name => Type.findByPk(name))) // Search types in DB
        .then(types => newData.setTypes(types)) // Set new data with types
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

DBService.prototype._format = (obj) => ({
  id: obj.id,
  name: obj.name,
  summary: obj.summary,
  score: obj.score,
  healthScore: obj.healthScore,
  img: obj.img,
  steps: obj.steps,
  types: obj.types.map(type => type.name),
  created: obj.created,
});

DBService.prototype._formatMain = (obj) => ({
  id: obj.id,
  name: obj.name,
  img: obj.img,
  types: obj.types.map(type => type.name),
  created: obj.created,
});

DBService.prototype.getItemByName = function (name) {
  return new Promise((resolve, reject) => {
    Recipe.findOne({ include: [Type], where: { name: name } })
      .then(response => resolve(this._format(response)))
      .catch(err => reject(err));
  });
};

DBService.prototype.getAllItems = function () {
  return new Promise((resolve, reject) => {
    Recipe.findAll({ include: [Type] })
      .then(response => {
        const items = response.map(item => this._formatMain(item.dataValues));
        resolve(items);
      })
      .catch(err => reject(err));
  });
};

DBService.prototype.getItemById = function (id) {
  return new Promise((resolve, reject) => {
    Recipe.findOne({ include: [Type], where: { id: id } })
      .then(response => {
        if (response) {
          resolve(this._format(response));
        } else {
          throw Error(); // Haven't the item in the DB
        }
      })
      .catch(err => reject(err));
  });
};

module.exports = { DBService };
