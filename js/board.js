class Board {
    constructor() {
    }

    displaySplash() {
        $('#board').append(`
          <form class="col s12">
            <div class="input-field">
              <input id="splash-wager-input" type="email" class="validate" placeholder="Ex: Make the winner an egg salad sandwich">
              <label for="splash-wager-input" data-error="wrong" data-success="right">Loser must: </label>
            </div>
          </form>`)
        $('#board').append('<div id="splash-start-button" class="btn">Start</div>')
        this.addStartEventHandler()
    }

    addStartEventHandler() {
        $('#splash-start-button').on('click', () => {
            this.wager = $('#splash-wager-input').val()
            $('form').remove()
            $('#splash-start-button').remove()
            this.start()
        })
    }

    start() {
        // Render structural divs
        var player1Hand = `<div id="player-1" class="card col s12 m4"><div class="card-title">Player 1</div><div>Wins: <span id="player1-wins">0</span></div></div>`
        var player2Hand = `<div id="player-2" class="card col s12 m4" ><div class="card-title">Player 2</div><div>Wins: <span id="player2-wins">0</span></div></div>`
        var battlefield = `<div class="card col s12 m4" id="battlefield"><div class="card-title">Battlefield</div><div id="message"></div><div id="card-area"></div></div>`
        var gameBoard = player1Hand + battlefield + player2Hand
        $('#board').append(gameBoard)
        // Instantiate players
        // Instantiate hands
        this.player1 = new Player(1)
        this.player2 = new Player(2)
        // Render hands
        this.player1.render()
        this.player2.render()
        // Set turn to 0
        this.playCount = 0
        this.currentPlayer = this.player1
        // Message that it's player1's turn
        this.startTurn()
    }

    startTurn(){
      this.displayMessage()
      // Add listener to currentPlayer
      $(`#player-${this.currentPlayer.id} .card`).click(this.turn.bind(this))
    }

    turn(){
      // Move this card to the Battlefield
      $("#card-area").append(event.target)
      // increment Board playCount
      this.playCount += 1
      // Remove click listener
      $('.card').off()
      // Run the battle
      // this.battle()
      // Remove the cards
      // Go back to the main game loop
      this.switchPlayer()
      if(this.playCount % 2 == 0){
        this.battle()
      }
      if(this.winner){
        return this.endGame()
      } else {
        this.startTurn()
      }
    }

    switchPlayer(){
      if (this.playCount % 2 == 0) {
        this.currentPlayer = this.player1
      } else {
        this.currentPlayer = this.player2
      }
    }

    displayMessage(){
      $("#message").text(`Player ${this.currentPlayer.id}'s Turn - GO!`)
    }

    battle(){
      // Compare player1 card and player2 card
      var player1CardId = $(`#card-area [id^=1]`).attr('id').split('-')[1]
      var player2CardId = $(`#card-area [id^=2]`).attr('id').split('-')[1]
      var player1Card = this.player1.hand.cards[player1CardId]
      var player2Card = this.player2.hand.cards[player2CardId]
      // Find winner
      // var roundWinner
      // increment wins in winner's player object
      if (player1Card.value > player2Card.value) {
        // roundWinner = this.player1
        this.player1.wins += 1
        $('#player1-wins').text(this.player1.wins)
      } else if (player1Card.value < player2Card.value) {
        // roundWinner = this.player2
        this.player2.wins += 1
        $('#player2-wins').text(this.player2.wins)
      } else {
        this.war()
      }
      // Remove cards
      $('#card-area').empty()
    }

    war(){
      $("#message").text(`WAAAAAAAAAARRRRRRR.....`)
      this.player1.wins += 1
      this.player2.wins += 1
      $('#player1-wins').text(this.player1.wins)
      $('#player2-wins').text(this.player2.wins)
    }

    endGame(player){
      $('#message').append(`Player ${player.id} Wins. Player ${player.id} must ${this.wager}`)
      // Empty all objects
    }

}
