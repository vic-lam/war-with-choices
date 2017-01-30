class Hand {
    constructor() {
        // Array of five new cards
        this.cards = [new Card(), new Card(), new Card(), new Card(), new Card()] // Refactor this
        this.player = null
    }

    render(){
      var i = 0
      var promise = new Promise((resolve, reject) => {
        function myLoop(){
          setTimeout(() => {
            this.cards[i].render(i)
            i++
            if(i < this.cards.length){
              myLoop.call(this)
            } else {
              resolve(i)
            }
          }, 500)
         }
         myLoop.call(this)
      })
      return promise
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
