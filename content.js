const FarmContent = {
  gear: [
    {id: 'wateringCan', name: 'Watering Can', price: 80, description: 'Water a growing pumpkin once per crop. Saves 30 seconds. Press Q near a bed.'},
    {id: 'workBoots', name: 'Work Boots', price: 140, description: 'Walk and sprint 20% faster. A permanent upgrade for every trip.'},
    {id: 'harvestBasket', name: 'Harvest Basket', price: 210, description: 'Collect 2 pumpkins instead of 1 from every ripe bed.'}
  ],
  waterBonus: 30000,
  movementMultiplier(upgrades) { return upgrades.workBoots ? 1.2 : 1; },
  harvestYield(upgrades) { return upgrades.harvestBasket ? 2 : 1; },
  cropElapsed(plot, now) { return Math.max(0, now - plot.plantedAt) + (plot.watered ? this.waterBonus : 0); },
  atlases: {
    equipment: [
      ['hands', 'Hands'], ['rake1', 'Basic Rake'], ['rake2', 'Improved Rake'], ['rake3', 'Super Rake'],
      ['detector', 'Metal Detector'], ['bag0', 'Small Hay Bag'], ['bag1', 'Medium Hay Bag'], ['bag2', 'Large Hay Bag'],
      ['bag3', 'Hay Wagon'], ['tbag0', 'Small Treasure Bag'], ['tbag1', 'Medium Treasure Bag'], ['tbag2', 'Large Treasure Bag'],
      ['wateringCan', 'Watering Can'], ['workBoots', 'Work Boots'], ['harvestBasket', 'Harvest Basket'], ['needle', 'Hidden Needle']
    ],
    buildings: [
      ['hayShop', 'Hay Shop'], ['toolShop', 'Tool Shop'], ['treasureShop', 'Treasure Shop'], ['pumpkinShop', 'Pumpkin Market'],
      ['farmhouse', 'Farmhouse'], ['kitchen', 'Farm Kitchen'], ['oldBarn', 'Old Barn'], ['apiary', 'Farm Apiary'],
      ['forest', 'Whispering Woods'], ['mill', 'Windmill Meadow'], ['windmill', 'Farm Windmill'], ['gardenExpansion', 'Pumpkin Beds'],
      ['farmFence', 'Picket Fence'], ['farmPath', 'Stone Path'], ['farmBench', 'Garden Bench'], ['farmSign', 'Farm Sign']
    ],
    harvest: [
      ['regular', 'Regular Hay'], ['dry', 'Dry Hay'], ['golden', 'Golden Hay'], ['freshGreen', 'Fresh Green Hay'],
      ['premium', 'Premium Hay'], ['rainbow', 'Rainbow Hay'], ['forestHerb', 'Forest Herb Hay'], ['barnStraw', 'Old Barn Straw'],
      ['millGrain', 'Windmill Golden Hay'], ['seeds', 'Pumpkin Seeds'], ['pumpkin', 'Ripe Pumpkin'], ['honey', 'Honey Jar'],
      ['pie', 'Pumpkin Pie'], ['cake', 'Honey Cake'], ['dog', 'Farm Dog'], ['cow', 'Dairy Cow']
    ],
    decor: [
      ['compass', 'Haystack Compass'], ['flowerbed', 'Farm Flowerbed'], ['lanterns', 'Farm Lanterns'], ['gloves_blue', 'Blue Work Gloves'],
      ['gloves_rose', 'Rose Work Gloves'], ['gloves_gold', 'Golden Work Gloves'], ['rake_copper', 'Copper Rake Finish'], ['rake_mint', 'Mint Rake Finish'],
      ['rake_prism', 'Prism Rake Finish'], ['spring', 'Spring Flower Wreath'], ['summer', 'Harvest Lantern'], ['autumn', 'Autumn Pumpkin Display'],
      ['winter', 'Winter Star Ornament'], ['tree', 'Farm Trees'], ['rock', 'Field Rocks'], ['grass', 'Meadow Grass']
    ],
    scenery: [
      ['barrel', 'Wooden Barrel'], ['crate', 'Farm Crate'], ['pond', 'Farm Pond'], ['trough', 'Water Trough'],
      ['farmPaint_sage', 'Sage Barn Paint'], ['farmPaint_blue', 'Blue Barn Paint'], ['farmPaint_cream', 'Cream Barn Paint'], ['barn', 'Timber Barn'],
      ['springFair', 'Spring Fair'], ['summerFair', 'Summer Fair'], ['autumnFair', 'Autumn Fair'], ['winterFair', 'Winter Fair'],
      ['emptyBed', 'Empty Garden Bed'], ['seedling', 'Pumpkin Seedling'], ['greenPumpkin', 'Growing Pumpkin'], ['flowerArch', 'Flower Arch']
    ],
    world: [
      ['copper', 'Copper Coin'], ['silver', 'Silver Coin'], ['gold', 'Gold Coin'], ['emerald', 'Emerald'],
      ['ruby', 'Ruby'], ['sapphire', 'Sapphire'], ['diamond', 'Diamond'], ['bee', 'Honeybees'],
      ['specialFlower', 'Special Flower'], ['haystack', 'Haystack'], ['cloud', 'Clouds'], ['sun', 'Sunshine'],
      ['rain', 'Rain'], ['fog', 'Fog'], ['wind', 'Strong Wind'], ['shopkeeper', 'Farm Shopkeepers']
    ]
  },
  surfaces: {wood: 0, bark: 1, stone: 2, roof: 3, fabric: 4, metal: 5, pumpkin: 6, leaves: 7, cow: 8, fur: 9, skin: 10, straw: 11, soil: 12, brick: 13, plaster: 14, water: 15}
};
