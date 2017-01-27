class Hand {
    constructor() {
        // Array of five new cards
        this.cards = [new Card(), new Card(), new Card(), new Card(), new Card()]
        this.player = null
    }

    displayCards(){
      var cardDivs = []
      this.cards.forEach((card, index) => {
        cardDivs.push(`<div id="${this.player.id}-${index}" class="col s4 card">${card.name}</div>`)
      })
      return cardDivs.join('')
    }

    playCard(card){

    }
}
