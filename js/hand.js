class Hand {
    constructor() {
        // Array of five new cards
        this.cards = [new Card(), new Card(), new Card(), new Card(), new Card()]
    }

    displayCards(){
      var cardDivs = []
      this.cards.forEach(function(card, id){
        cardDivs.push(`<div class="card card-${id}">${card.name}</div>`)
      })
      return cardDivs.join('')
    }

    playCard(card){

    }
}
