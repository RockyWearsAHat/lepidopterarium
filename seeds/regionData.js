const { Region} = require('../models');


const regionData = [
  {
    name: 'Central America',
    filename: '01-blossoming-apricot.jpg',
    description:
      'Central America is home to many bueatiful species of butterfly from around the world! "Awesome Butterflies" is synonamus wiht central america if you are trying to find that perfect pet!',
    butterfly_ids: '[1,2,3]'
  },
  {
    name: 'Africa',
    filename: '01-blossoming-apricot.jpg',
    description:
      'Wowza! If youre looking to find cool butterflies, look no further than the great country of Africa! This land has not just lions and tigers and maybe bears (oh my?), but it is also home to some of the worls most spectacular butterflys!',
    butterfly_ids: '[1,2,3]'
  }
];

const seedRegions = () => Region.bulkCreate(regionData);

module.exports = seedRegions;

