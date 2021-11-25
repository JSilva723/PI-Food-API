const supertest = require('supertest');
const { app } = require('../../app');
const { sequelize } = require('../../db/connection/index.js');
const api = supertest(app);


test('ruta devuelve JSON', async () => {
  await api.get('/types')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Debe retornar un objeto', async () => {
  const response = await api.get('/types');
  expect(response.body).toEqual({
    "status": 200,
    "data": {
      "diets": [
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Low FODMAP",
        "Whole30"
      ],
      "meals": [
        "Main course",
        "Side dish",
        "Dessert",
        "Appetizer",
        "Salad",
        "Bread",
        "Breakfast",
        "Soup",
        "Beverage",
        "Sauce",
        "Marinade",
        "Fingerfood",
        "Snack",
        "Drink"
      ]
    }
  });
});


afterAll(() => {
  sequelize.close();
});


