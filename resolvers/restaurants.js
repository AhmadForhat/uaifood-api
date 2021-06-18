const {mockRestaurants} = require('../mocks')

const restaurants = (parents, {stars, costs, cuisineTypes}) => {
  console.log(stars)

  return mockRestaurants

}

module.exports = restaurants
