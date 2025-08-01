const { fetchJSON } = require('./fetchJSON');


const rarityWeights = {
  common:   50,
  uncommon: 30,
  rare:     15,
  epic:      5
};

function pickWeighted(facts) {
 
  const total = facts.reduce((sum, item) => {
    const w = rarityWeights[item.rarity.toLowerCase()] || 0;
    return sum + w;
  }, 0);

  if (total === 0) {
    throw new Error('No positive weights; check your rarities.');
  }

  
  let threshold = Math.random() * total;

 
  for (const item of facts) {
    const w = rarityWeights[item.rarity.toLowerCase()] || 0;
    threshold -= w;
    if (threshold <= 0) {
      return item;
    }
  }


  return facts[facts.length - 1];
}

function fetchFact() {
  const data = fetchJSON('facts');
  if (!data || !Array.isArray(data.facts)) {
    throw new Error('Invalid data from fetchJSON');
  }
  return pickWeighted(data.facts);
}

module.exports = { fetchFact };
