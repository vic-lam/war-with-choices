class Hand {
    constructor() {
        // Array of five new cards
        this.cards = [new Card(), new Card(), new Card(), new Card(), new Card()]
    }

    displayCards(){
      var cardDivs = []
      this.cards.forEach(function(card, index){
        cardDivs.push(`<div class="col s4 card">${card.name}</div>`)
      })
      return cardDivs.join('')
    }

    playCard(card){

    }
}
