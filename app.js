const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const links = [];

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    doctitle: 'home-page',
    links: [
      { href: '/beers', linkText: 'beers' },
      { href: '/random-beer', linkText: 'random-beer' }
    ]
  });
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi =>
      res.render('beers', {
        doctitle: 'beers-page',
        beers: beersFromApi,
        links: [
          { href: '/', linkText: 'home-page' },
          { href: '/random-beer', linkText: 'random-beer' }
        ]
      })
    )
    .catch(error => console.log(error));
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', {
        doctitle: 'random-beer',
        randomBeer: responseFromAPI,
        links: [
          { href: '/', linkText: 'home-page' },
          { href: '/beers', linkText: 'beers' }
        ]
      });
      console.log(responseFromAPI);
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
