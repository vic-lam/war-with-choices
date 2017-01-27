class Player {
    constructor(id) {
      this.hand = new Hand()
      this.id = id
      this.hand.player = this
      this.wins = 0
    }

    render(){
      var cardDivs = this.hand.displayCards()
      if (this.id == 1) {
        $("#player-1").append(cardDivs)
      } else {
        $("#player-2").append(cardDivs)
      }
    }
}
