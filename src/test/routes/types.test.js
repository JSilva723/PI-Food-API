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
  expect(response.body).toEqual({"data": ["gluten free", "ketogenic", "vegetarian", "lacto-vegetarian", "ovo-vegetarian", "vegan", "pescetarian", "paleo", "primal", "low fodmap", "whole30"], "status": 200});
});


afterAll(() => {
  sequelize.close();
});