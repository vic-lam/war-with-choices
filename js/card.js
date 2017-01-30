class Card {
    constructor() {
      var index = Math.floor(Math.random() * DECK.length)
      this.name = DECK[index]
      this.value = index
      this.player = null
    }

    render(index){
      let $card = $(`<div style="display:none" id="${this.player.id}-${index}" class="col s2 m4 l3 card playing-card"><p>${this.name}</p></div>`)
      $(`#player-${this.player.id}`).append($card)
      $card.addClass('zoomInDown animated')
      $card.show()
    }
}
