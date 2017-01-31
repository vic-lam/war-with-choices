class Board {
  constructor() {
    this.displayMessageArea()
    this.displaySplash()
  }

  displayMessageArea(){
    $('#message-title').html('Welcome to War...with Choices')
    $('#message-content').html(`
      The game where all disputes are settled.<br>
      Please enter the wager above.<br>
      The wager can be any action that a player must perform, if (s)he loses <b>War...with Choices</b>.<br><br>
      Both players will be dealt 5 cards. Each round a player will click a card from her/his hand. The player with the highest card will win that round (Ties count as wins for both players). The first player to win 3 rounds wins the game.
      `)
    }

  displaySplash(){
    $('#board').html(`
      <form class="col s12">
        <div class="input-field">
          <input id="splash-wager-input" type="text" class="validate" placeholder="Ex: make the winner an egg salad sandwich" required>
          <label for="splash-wager-input" data-error="wrong" data-success="right">Loser must: </label>
        </div>
        <input id="splash-start-button" type="submit" class="btn" value="Start">
      </form>`
    )
    this.addStartEventHandler()
  }

  addStartEventHandler(){
    $('#splash-start-button').on('click', (e) => {
      e.preventDefault()
      this.game.setWager()
      $('form').remove()
      this.game.initializePlayers()
      $('audio')[0].play()
    })
  }

  displayBoard(){
    var player1Hand = `<div id="player-1" class="card col s12 m4 brown lighten-5"><div class="card-title">Player 1</div><div>Wins: <span id="player1-wins">0</span></div></div>`
    var player2Hand = `<div id="player-2" class="card col s12 m4 brown lighten-5"><div class="card-title">Player 2</div><div>Wins: <span id="player2-wins">0</span></div></div>`
    var battlefield = `<div id="battlefield" class="col s12 m4"><h4 class="card-title">Battlefield</h3><div id="card-area"></div></div>`
    var gameBoard = player1Hand + battlefield + player2Hand
    $('#board').html(gameBoard)
  }

  displayCurrentPlayer(){
    $('#message-title').html(`Player ${this.game.currentPlayer.id}'s Turn!`)
    $('#message-content').html(`Please click a card from your hand`)
  }

  displayImage(term) {
    $.get(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${term}`).done(function(data){
      let url = data.data.image_url
      $('#message-image').append(`<img src="${url}" alt="${term}" class="responsive-img animated rotateIn">`)
    })
  }

}
