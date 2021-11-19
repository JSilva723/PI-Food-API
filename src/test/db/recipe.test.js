const { sequelize } = require('../../db/connection/index.js');
const { Recipe } = require('../../db/models/Recipe');

describe('Recipe model', () => {
  describe('Validators', () => {
    test('Title and Sumamry to be not null', async () => {
      try {
        await Recipe.create({ });
      } catch (e) {
        expect(e.name).toEqual('SequelizeValidationError');
        expect(e.message).toEqual(expect.stringMatching('recipe.title cannot be null'));
        expect(e.message).toEqual(expect.stringMatching('recipe.summary cannot be null'));
      }
    });
    test('Title and Sumamry to be not empty', async () => {
      try {
        await Recipe.create({ title: '', summary: '' });
      } catch (e) {
        expect(e.name).toEqual('SequelizeValidationError');
        expect(e.message).toEqual(expect.stringMatching('Validation notEmpty on title failed'));
        expect(e.message).toEqual(expect.stringMatching('Validation notEmpty on summary failed'));
      }
    });
    test('Title to be unique', async () => {
      await Recipe.create({title: 'test title to be unique', summary: 'test summary'});
      try {
        await Recipe.create({title: 'test title to be unique', summary: 'test summary'});
      } catch (e) {
        expect(e.name).toEqual('SequelizeUniqueConstraintError');
      }
    });
  });
});


afterAll(async() => {
  await Recipe.destroy({where: { title: 'test title to be unique'}});
  sequelize.close();
});