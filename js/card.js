class Card {
    constructor() {
      var index = Math.floor(Math.random() * DECK.length)
      this.name = DECK[index]
      this.value = index
    }
}
