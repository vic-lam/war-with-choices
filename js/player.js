class Player {
    constructor(id) {
      this.hand = new Hand()
      this.id = id
      this.hand.player = this
      this.wins = 0
      this.hand.cards.forEach(card => {
        card.player = this
      })
    }
}
