const books = require('./books-literature');
const music = require('./music-audio');
const film = require('./film-cinema');
const tv = require('./tv-streaming');
const wineBeer = require('./wine-beer');
const food = require('./food-culinary');
const remaining = require('./remaining-verticals');
const remaining2 = require('./remaining-verticals-2');

module.exports = [
  wineBeer,
  food,
  ...remaining,
  books,
  music,
  film,
  tv,
  ...remaining2,
];
