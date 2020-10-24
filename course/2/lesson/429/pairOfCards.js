function winnerPairOfCards(player1, player2) {
  const rankedHand1 = rankCards(player1)
  const rankedHand2 = rankCards(player2)
  for (const rank of ranks) {
    const rankWinner = winnerOfRank(rankedHand1[rank], rankedHand2[rank])
    if (rankWinner !== 'draw') return rankWinner
  }
  return 'draw'
}

const rankCards = cardStrings => {
  const rankedCards = {}
  const cardRanks = {}
  for (const cardString of cardStrings) {
    const cardValue = cardString.substring(1)
    cardRanks[cardValue] = !cardRanks[cardValue] ? 1 : cardRanks[cardValue] + 1
  }
  for (const rank of ranks) {
    rankedCards[rank] = []
  }
  for (const [key, value] of Object.entries(cardRanks)) {
    rankedCards[value] = [...rankedCards[value], key]
  }
  return rankedCards
}

const winnerOfRank = (player1, player2) => {
  const cardComparer = (a, b) => a - b
  const player1Sorted =
      player1.map(x => cardRank.indexOf(x)).sort(cardComparer)
  const player2Sorted =
      player2.map(x => cardRank.indexOf(x)).sort(cardComparer)
  for (let i = 0; i < Math.max(player1.length, player2.length); i++) {
    if (player1Sorted[i] === undefined) return 'player2'
    if (player2Sorted[i] === undefined) return 'player1'
    if (player1Sorted[i] < player2Sorted[i]) return 'player1'
    if (player2Sorted[i] < player1Sorted[i]) return 'player2'
  }
  return 'draw'
}

const cardRank = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const ranks = [...Array(6).keys()].slice(1).reverse()

console.log(winnerPairOfCards(['♣4', '♥7', '♥7', '♠Q', '♣J'],
    ['♥10', '♥6', '♣K', '♠Q', '♦2']))
