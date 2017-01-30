class Hand {
    constructor() {
        // Array of five new cards
        this.cards = [new Card(), new Card(), new Card(), new Card(), new Card()]
        this.player = null
    }

    render(){
      var cardDivs = this.buildCards()
      if (this.player.id == 1) {
        $("#player-1").append(cardDivs)
      } else {
        $("#player-2").append(cardDivs)
      }
    }

    buildCards(){
      var cardDivs = []
      this.cards.forEach((card, index) => {
        cardDivs.push(`<div id="${this.player.id}-${index}" class="col s4 card"><p>${card.name}</p></div>`)
      })
      return cardDivs.join('')
    }

    showCards(){
      $(`#player-${this.player.id} .card`).removeClass('blue-grey lighten-4 blue-grey-text text-lighten-4')
      $(`#player-${this.player.id} .card p`).css('visibility', 'visible')
    }

    hideCards(){
      $(`#player-${this.player.id} .card`).addClass('blue-grey lighten-4 blue-grey-text text-lighten-4')
      $(`#player-${this.player.id} .card p`).css('visibility', 'hidden')
    }
}
