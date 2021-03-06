require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { DIET_URL, MEAL_URL, BASE_URL, API_KEY } = process.env; // eslint-disable-line no-undef

function APIService() { }

APIService.prototype.getDietNames = function () {
  return new Promise((resolve, reject) => {
    axios.get(DIET_URL)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const section = $('section', html); // Search all section tags
        const diets = []; // Array for diets names
        // Search titles of sections
        $('h2', section).each(function () {
          // If match, we go to parent for search all subtitles 
          if ($(this).text() === 'Diet Definitions') {
            $('h4', this.parent).each(function () {
              const title = $(this).text();
              diets.push(title);
            });
          }
        });
        resolve(diets);
      })
      .catch(err => reject(err));
  });
};

APIService.prototype.getMealNames = function () {
  return new Promise((resolve, reject) => {
    axios.get(MEAL_URL)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const section = $('section', html); // Search all section tags
        const meals = []; // Array for meals names
        // Search titles of sections
        $('h2', section).each(function () {
          // If match, we go to parent for search all subtitles 
          if ($(this).text() === 'Meal Types') {
            $('li', this.parent).each(function () {
              const title = $(this).text();
              meals.push(title);
            });
          }
        });
        resolve(meals);
      })
      .catch(err => reject(err));
  });
};

APIService.prototype._formatMain = (obj) => ({
  id: obj.id,
  img: obj.image,
  score: obj.spoonacularScore,
  title: obj.title,
  diets: obj.diets,
});

APIService.prototype._format = (obj) => ({
  dishTypes: obj.dishTypes,
  healthScore: obj.healthScore,
  id: obj.id,
  img: obj.image,
  score: obj.spoonacularScore,
  steps: obj.analyzedInstructions.length === 0 ? [] : obj.analyzedInstructions[0].steps,
  summary: obj.summary,
  title: obj.title,
  diets: obj.diets,
});

APIService.prototype.getAllItems = function () {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/complexSearch/?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
      .then(response => {
        const items = response.data.results.map(item => this._formatMain(item));
        resolve(items);
      })
      .catch(err => reject(err));
  });
};

APIService.prototype.getItemById = function (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${id}/information/?apiKey=${API_KEY}`)
      .then(response => resolve(this._format(response.data)))
      .catch(err => reject(err));
  });
};

module.exports = { APIService };