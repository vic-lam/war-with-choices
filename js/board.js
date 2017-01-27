class Board {
  constructor() {
  }

  displaySplash() {
    $('#board').append(`
      <form class="col s12">
        <div class="input-field">
          <input id="splash-wager-input" type="text" class="validate" placeholder="Ex: make the winner an egg salad sandwich" required>
          <label for="splash-wager-input" data-error="wrong" data-success="right">Loser must: </label>
        </div>
        <input id="splash-start-button" type="submit" class="btn" value="Start">
      </form>`)
    this.addStartEventHandler()
    $('#message-title').html('Welcome to War...with Choices')
    $('#message-content').html(`
      The game where all disputes are settled.<br>
      Please enter the wager above.<br>
      The wager can be any action that a player must perform, if (s)he loses <b>War...with Choices</b>.<br><br>
      Both players will be dealt 5 cards. Each round a player will click a card from her/his hand. The player with the highest card will win that round (Ties count as wins for both players). The first player to win 3 rounds wins the game.
    `)
  }

  addStartEventHandler() {
    $('#splash-start-button').on('click', (e) => {
      e.preventDefault()
      this.wager = $('#splash-wager-input').val()
      $('form').remove()
      this.start()
    })
  }

  start() {
    // Render structural divs
    var player1Hand = `<div id="player-1" class="card col s12 m4 brown lighten-5"><div class="card-title">Player 1</div><div>Wins: <span id="player1-wins">0</span></div></div>`
    var player2Hand = `<div id="player-2" class="card col s12 m4 brown lighten-5" ><div class="card-title">Player 2</div><div>Wins: <span id="player2-wins">0</span></div></div>`
    var battlefield = `<div id="battlefield" class="col s12 m4"><h4 class="card-title">Battlefield</h3><div id="message"></div><div id="card-area"></div></div>`
    var gameBoard = player1Hand + battlefield + player2Hand
    $('#board').append(gameBoard)
    // Instantiate players (with hands and cards)
    this.player1 = new Player(1)
    this.player2 = new Player(2)
    // Render hands
    this.player1.render()
    this.player2.render()
    // Set turn to 0
    this.playCount = 0
    this.currentPlayer = this.player1

    this.startTurn()
  }

  startTurn(){
    // Display who's turn it is
    this.displayCurrentPlayer()
    // Add listener to currentPlayer
    $(`#player-${this.currentPlayer.id} .card`).click(this.turn.bind(this))
  }

  turn(){
    this.playCount += 1                     // increment Board playCount
    this.switchPlayer()                     // Switch currentPlayer
    $("#card-area").append(event.target)    // Move this card to the Battlefield
    $('#card-area .card').addClass('blue-grey lighten-4 blue-grey-text text-lighten-4')
    $('.card').off()                        // Remove click listener
    // Run the battle
    if(this.playCount % 2 == 0){
      this.battle()
      this.checkWinner()
    }

    if(this.winner){
      this.endGame(this.winner)
    } else {
      this.startTurn()
    }
  }

  checkWinner(){
    if(this.player1.wins == 3){
      this.winner = this.player1
    } else if(this.player2.wins == 3) {
      this.winner = this.player2
    }
  }

  switchPlayer(){
    if (this.playCount % 2 == 0) {
      this.currentPlayer = this.player1
    } else {
      this.currentPlayer = this.player2
    }
  }

  displayCurrentPlayer(){
    $('#message-title').html(`Player ${this.currentPlayer.id}'s Turn!`)
    $('#message-content').html(`Please click a card from your hand`)
  }

  battle(){
    // Compare player1 card and player2 card
    var player1CardId = $(`#card-area [id^=1]`).attr('id').split('-')[1]
    var player2CardId = $(`#card-area [id^=2]`).attr('id').split('-')[1]
    var player1Card = this.player1.hand.cards[player1CardId]
    var player2Card = this.player2.hand.cards[player2CardId]
    // Find winner
    // increment wins in winner's player object
    if (player1Card.value > player2Card.value) {
      this.player1.wins += 1
      $('#player1-wins').text(this.player1.wins)
    } else if (player1Card.value < player2Card.value) {
      this.player2.wins += 1
      $('#player2-wins').text(this.player2.wins)
    } else {
      this.war()
    }

    // Remove cards from battlefield
    $('#card-area').empty()
  }

  war(){
    $("#message").text(`TIE!!!`)
    this.player1.wins += 1
    this.player2.wins += 1
    $('#player1-wins').text(this.player1.wins)
    $('#player2-wins').text(this.player2.wins)
  }

  endGame(winner){
    var loser = (winner == this.player1) ? this.player2 : this.player1
    // let otherPlayer = 4
    $('#message-title').text(`Player ${winner.id} Wins!`)
    $('#message-content').text(`Player ${loser.id} must ${this.wager}`)
    $('#message-card').append('<div id="message-action" class="card-action"><button id="restart" class="btn">Restart</button></div>')
    $('#restart').click(() => {
      $('#board').html('')
      $('#message-action').remove()
      this.start()
    })
  }

}
