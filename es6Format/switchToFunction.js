/*
This was an example I saw on linkedIn and thought was a good one to write by hand to compund the es6 syntax

switch -- not recommended
*/

function getCity(state) {
  let city;
  switch(state) {
    case 'WA':
      city = 'Seattle';
      break;
    case 'OR':
      city = 'Salem';
      break;
    case 'CA':
      city = 'Los Angeles';
      break;
    default:
      city = 'Springfield';
  }
  return city;
}

/*
using es6 syntax -- recommended
*/

function getCity(state) {
  const city = {
    'WA': () => 'Seattle',
    'OR': () => 'Salem',
    'CA': () => 'Los Angeles',
    'default': () => 'Springfield'
  }
  return (city[state] || city['default'])();
}

