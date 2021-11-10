require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { DIET_URL, BASE_URL, API_KEY } = process.env; // eslint-disable-line no-undef

function APIService () { }

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
          if( $(this).text() === 'Diet Definitions'){
            $('h4', this.parent).each(function () {
              const title = $(this).text().toLocaleLowerCase();
              diets.push(title);
            });
          }
        });
        resolve(diets);
      })
      .catch(err => reject(err));
  });
};

APIService.prototype._formatMain = (obj) => ({
  name: obj.title,
  img: obj.image,
  types: obj.diets,
  id: obj.id,
});

APIService.prototype._format = (obj) => ({
  id: obj.id,
  name: obj.name,
  summary: obj.summary,
  score: obj.score,
  healthScore: obj.healthScore,
  img: obj.img,
  steps: obj.steps,
  types: obj.types,
});

APIService.prototype.getAllItems = function (){
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/complexSearch/?apiKey=${API_KEY}&number=10&addRecipeInformation=true`)
      .then(response => {
        const items = response.data.results.map(item => this._formatMain(item));
        resolve(items);
      })
      .catch(err => reject(err));
  });
};

APIService.prototype.getItemById = function (id){
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${id}/information/?apiKey=${API_KEY}`)
      .then(response => {
        const items = response.data.results.map(item => this._format(item));
        resolve(items);
      })
      .catch(err => reject(err));
  });
};

module.exports = { APIService };