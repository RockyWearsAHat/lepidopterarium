const { Region} = require('../models');


const regionData = [
  {
    name: 'Central America',
    filename: 'region central america.jpeg',
    description:
      'The more than 2400 butterfly species found in Mexico and Central America (about 1750 in Mexico alone) represent more than 10% of the worlds total species. Many of these beautiful creatures can be found nowhere else.',
   
  },
  {
    name: 'Africa',
    filename: 'region africa.jpeg',
    description:
      'In Africa, butterflies symbolize protection and guidance: Some African tribes believe that butterflies possess protective qualities, guarding against evil spirits and bringing good luck. As such, butterflies may be featured in paintings as protective symbols or to invoke guidance from benevolent spirits.',
    butterfly_ids: '[1,2,3]'
  },
  {
    name: 'South America',
    filename: 'region south america.jpeg',
    description:
        'In the rainforest environment, there is an abundance of flowers where butterflies like the blue morpho and the owl butterfly can find nectar. Some types of rainforest butterflies are endangered due to the destruction of the rainforests caused by human development. In a titanic effort spanning many years, a team of butterfly experts have listed the butterflies found in Colombia make up 20% of all the species of butterflies found on the planet.',
        butterfly_ids: '[1,2,3]'
  },
  {
    name: 'Asia',
    filename: 'region asia.jpeg',
    description:
        'Asia is home to more than 5,000 known butterfly species, only second only to South America. The Insect Museum of West China has more than 4,000 Asian butterfly species in the collection.',
        butterfly_ids: '[1,2,3]'
    
  },
  {
    name: 'Papa New Guinea',
    filename: 'region papa.jpeg',
    description:
        'New Guineas butterflies feature some of the largest and most beautiful specimens in the world, such as the birdwings (Ornithopera and Troides genera). In the 3 families most prevalent on the island, 56 of the more than 300 species discovered so far are endemic.',
        butterfly_ids: '[1,2,3]'
   
  },
  {
  name: 'Southeast Asia',
    filename: 'region southeast asia.jpeg',
    description:
        'Southeast Asia has the highest relative rate of habitat loss and degradation in the humid tropics. The responses of less ‘charismatic’ groups, including butterflies, to habitat disturbance remain relatively poorly understood. Many South-east Asian butterflies are endemic to the region and face global extinction if current levels of deforestation were to continue.',
        butterfly_ids: '[1,2,3]'
  }
];

const seedRegions = () => Region.bulkCreate(regionData);

module.exports = seedRegions;

