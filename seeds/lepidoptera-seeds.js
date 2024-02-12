const { Lepo } = require("../models");

const lepoData = [
  {
    id: 1,
    regionId: 1,
    name: "Blue Morpho",
    sciName: "Morpho menelaus",
    desc: "They have iridescent wings that have structural color, it means that it isn't really colored blue, their scales reflect light and makes it look blue. When their wings are closed, the colors are darker so they can camouflage away from birds that want to eat them.",
    // "images": "[\"flie.jpg\",\"file.jpg\"]",
    images: "[\"blue morpho1.jpeg\",\"blue morpho2.jpeg\",\"blue morpho3.jpeg\"]",
    facts: "They like to suck up rotten fruit, mud, and carrion",
  },
  {
    id: 2,
    regionId: 4,
    name: "Atlas Moth",
    sciName: "Attacus Atlas",
    desc: "They are about the size of a dinner plate, when they come out of the cocoon they live for about 3-7 days. The males are bigger with bushier antennae and the females are smaller with less bushy atennae.",
    images: "[\"atlas moth1.jpeg\",\"atlas moth2.jpeg\",\"atlas moth3.jpeg\"]",
    facts:
      "They can stay in their cocoon for about a year before coming out, this is called diapause or something like hibernating",
  },
  {
    id: 3,
    regionId: 1,
    name: "Tiger Longwing",
    sciName: "Heliconius ismenius",
    desc: "The longwing butterflies tend to mimic or copy the pattern of their wings with other poisonous butterflies to keep themselves safe.",
    images: "[\"tiger wing2.jpeg\",\"tiger wing3.jpeg\",\"tiger wing4.jpeg\"]",
    facts:
      "They were named after Mount Helicon, the inspiration for a stumped naturalist looking for a good name.",
  },
  {
    id: 4,
    regionId: 2,
    name: "African Moon Moth",
    sciName: "Argema mimosa",
    desc: "These moths look similar to the North American luna moth but has a longer tail and it crosses as it fully forms.",
    images: "[\"african moon1.jpeg\",\"african moon2.jpeg\",\"african moth3.jpeg\"]",
    facts: "It is a kind of silk moth",
  },
  {
    id: 5,
    regionId: 1,
    name: "Glasswing Butterflies",
    sciName: "Greta oto",
    desc: "The males eat poisonous plants which makes them poisonous and bitter to predators, their clear wings help them blend in to their environment.",
    images: "[\"glasswing1.jpeg\",\"glasswing2.jpeg\",\"glasswing3.jpeg\"]",
    facts: "They help scientists study how color in butterflies and moths evolve.",
  },
  {
    id: 6,
    regionId: 3,
    name: "Jazzy Leafwing",
    sciName: "Hypna clytemnestra",
    desc: "They are difficult butterflies to find and are considered rare, their wings copy the patterns of dead leaves.",
    images: "[\"jazzy1.jpeg\",\"jazzy2.jpeg\",\"jazzy3.jpeg\"]",
    facts: "Largest in the group of neotropical butterflies with wings that look like dead leaves",
  },
  {
    id: 7,
    regionId: 3,
    name: "Cattleheart",
    sciName: "Parides spp",
    desc: "There is a marking on its wing that looks like a cow's heart, hence the name.",
    images: "[\"cattlehart1.jpeg\",\"cattlehart2.jpeg\",\"cattlehart3.jpeg\"]",
    facts: "It also eats poisonous plants which make them taste unpleasant to predators",
  },
  {
    id: 8,
    regionId: 4,
    name: "Great Orange-tip",
    sciName: "Hebomoia glaucippe",
    desc: "There are many different orange-tip butterflies, some live in the UK or North America, these types live in the tropics. They also use camouflage to look like dead leaves but also employ poison in their wings to deter predators.",
    images: "[\"orange tipped1.jpeg\",\"orange tipped2.jpeg\",\"orange tipped3.jpeg\"]",
    facts: "Their caterpillars mimic the venomous vine snake.",
  },
  {
    id: 9,
    regionId: 5,
    name: "Queen Alexandra's Birdwing",
    sciName: "Ornithoptera alexandrae",
    desc: "The biggest butterfly in the world and unfortunately endangered. There is a strong sexual dimorphism between male and female, meaning that it is easy to tell which is female and male based on its colors. The males are more colorful than the females.",
    images: "[\"orange tipped1.jpeg\",\"orange tipped2.jpeg\",\"orange tipped3.jpeg\"]",
    facts: "named after Queen Alexandra of Denmark, daughter-in-law of Queen Victoria",
  },
  {
    id: 10,
    regionId: 6,
    name: "Emerald Peacock",
    sciName: "Papilio palinurus",
    desc: "Lives in forests, their caterpillars feeds on rue and citrus plants.Like the Blue Morpho, the color on their wings come from structural color instead of being pigmented.",
    images: "[\"Malachite1.jpeg\",\"Malachite2.jpeg\",\"Malachite3.jpeg\"]",
    facts: "It also eats poisonous plants which make them taste unpleasant to predators",
  },
];

const seedLepo = () => Lepo.bulkCreate(lepoData);

module.exports = seedLepo;
