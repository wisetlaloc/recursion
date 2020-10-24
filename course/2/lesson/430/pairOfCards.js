// JavaScriptで開発しましょう。
class Card {
  static SUITS = ['♣', '♥', '♠', '♦️']
  static VALS =
    ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']

  constructor(suit, val) {
    this.suit = suit
    this.val = val
  }

  static pairOfCardsComparer(a, b) {
    if (!a || !b) return !a ? 1 : -1
    if (a === b) return 0
    return Card.VALS.indexOf(a) < Card.VALS.indexOf(b) ? -1 : 1
  }

  toString() {
    return `${this.suit}${this.val}`
  }
}

class Deck {
  constructor() {
    this.deck = Deck.generateDeck()
  }

  static generateDeck() {
    return Card.SUITS.map(suit => {
      return Card.VALS.map(val => new Card(suit, val))
    } ).flat()
  }

  shuffle() {
    for (let i = 0; i < this.deck.length; i++) {
      const j = Math.floor(Math.random() * this.deck.length)
      const tmp = this.deck[i]
      this.deck[i] = this.deck[j]
      this.deck[j] = tmp
    }
  }

  draw(num = 1) {
    return Array.from( {length: num}, _ => this.deck.pop())
  }
}

class Hand {
  static RANKS = [...Array(6).keys()].slice(1).reverse()

  constructor(cards) {
    this.cards = cards
  }

  cardCount() {
    const cardCount = {}
    for (const card of this.cards) {
      const cardValue = card.val
      cardCount[cardValue] =
        !cardCount[cardValue] ? 1 : cardCount[cardValue] + 1
    }
    return cardCount
  }

  rankedCards() {
    const rankedCards = {}
    for (const rank of Hand.RANKS) rankedCards[rank] = []
    for (const [key, value] of Object.entries(this.cardCount())) {
      rankedCards[value].push(key)
    }
    for (const key of Object.keys(rankedCards)) {
      rankedCards[key] =
        rankedCards[key].sort(Card.pairOfCardsComparer)
    }
    return rankedCards
  }

  rankCards(rank) {
    return this.rankedCards()[rank]
  }

  toString() {
    return this.cards.map(c => c.toString()).join('')
  }

  static pairOfCardsComparer(a, b) {
    for (const rank of Hand.RANKS) {
      const aOfRank = a.rankCards(rank)
      const bOfRank = b.rankCards(rank)
      for (let i = 0; i < Math.max(aOfRank.length, bOfRank.length); i++) {
        const cardCompare = Card.pairOfCardsComparer(aOfRank[i], bOfRank[i])
        if (cardCompare !== 0) return cardCompare
      }
    }
    return 0
  }
}

class Dealer {
  static startGame() {
    const deck = new Deck()
    deck.shuffle()
    return {
      player1: new Hand(deck.draw(5)),
      player2: new Hand(deck.draw(5)),
    }
  }

  static showHands(playerHands) {
    for (const [name, hand] of Object.entries(playerHands)) {
      console.log(`${name}: ${hand.toString()}`)
    }
  }

  static winnerPairOfCards(playerHands) {
    switch (Hand.pairOfCardsComparer(...Object.values(playerHands))) {
      case -1:
        return Object.keys(playerHands)[0]
      case 1:
        return Object.keys(playerHands)[1]
      default:
        return 'draw'
    }
  }
}

const playerHands = Dealer.startGame()
Dealer.showHands(playerHands)
console.log(Dealer.winnerPairOfCards(playerHands))
