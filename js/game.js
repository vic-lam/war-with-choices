class Game {
    constructor() {
      this.startGame()
    }

    startGame() {
        // Initialize board
        this.board = new Board()
        this.board.game = this
        this.winner = null
    }

    initializePlayers() {
      // Instantiate players (with hands and cards)
      this.player1 = new Player(1)
      this.player2 = new Player(2)
      // Set turn to 0
      this.playCount = 0
      this.currentPlayer = this.player1
      this.otherPlayer = this.player2
      // Render structural divs
      this.board.displayBoard()
      // Render hands
      this.player1.hand.render()
      this.player2.hand.render()
      this.otherPlayer.hand.hideCards()       // Hide Player 2's cards for first turn

      this.startTurn()
    }

    setWager(){
      this.wager = $('#splash-wager-input').val()
      if (this.wager === "") {
        let wagers = [
          "do 20 sit-ups",
          "eat a napkin",
          "jump 3 times",
          "install Patty's 'Yea Boooiii!' gem and run it through its entire duration",
          "pay for the next lunch",
          "write an app with chained PHP ternaries"
        ]
        this.wager = wagers[Math.floor(Math.random() * wagers.length)]
      }
    }

    startTurn(){
      this.board.displayCurrentPlayer()       // Display who's turn it is
      this.otherPlayer.hand.hideCards()
      this.currentPlayer.hand.showCards()

      $(`#player-${this.currentPlayer.id} .card`).click(this.turn.bind(this))   // Add listener to currentPlayer
    }

    turn(){
      $('.card').off()                       // Remove click listener
      if (event.target.tagName == 'P'){   // If user clicks on p element, append whole card instead of just inner text
        $('#card-area').append(event.target.parentElement)    // Move this card to the Battlefield
      } else {
        $('#card-area').append(event.target)
      }
      $('#card-area .card').addClass('blue-grey lighten-4 blue-grey-text text-lighten-4')   // Hide played card
      if (this.currentPlayer.id == 2) {       // Align Player 2's card right
        $('#card-area .card:nth-child(2)').addClass('right')
      }
      this.currentPlayer.hand.hideCards()
      this.playCount += 1                     // increment Board playCount
      this.switchPlayer()                     // Switch currentPlayer

      if(this.playCount % 2 == 0){            // Run the battle after player 2 plays card
        this.battle()
        this.checkGameWinner()
        if(this.winner){
          this.endGame(this.winner)
        } else {
          this.otherPlayer.hand.showCards()
          this.currentPlayer.hand.showCards()
          $('#card-area').empty()             // Remove cards from battlefield
          this.displayProceedButton()
        }
      } else {
        this.displayProceedButton()
      }
    }

    displayProceedButton(){
      $('#message-content').text(`Please let Player ${this.currentPlayer.id} click the 'Proceed' button`)
      $('#message-card').append('<div id="message-action" class="card-action"><button id="next-turn" class="btn">Proceed</button></div>')
      $('#next-turn').click(() => {
        $('#message-action').remove()
        this.startTurn()
      })
    }

    switchPlayer(){
      if (this.playCount % 2 == 0) {
        this.currentPlayer = this.player1
        this.otherPlayer = this.player2
      } else {
        this.currentPlayer = this.player2
        this.otherPlayer = this.player1
      }
    }

    checkGameWinner(){
      if(this.player1.wins == 3){
        this.winner = this.player1
      } else if(this.player2.wins == 3) {
        this.winner = this.player2
      }
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
        this.displayTurnWinner(this.player1)
      } else if (player1Card.value < player2Card.value) {
        this.player2.wins += 1
        this.displayTurnWinner(this.player2)
      } else {
        this.war()
      }
    }

    displayTurnWinner(winner) {
      $(`#player${winner.id}-wins`).text(winner.wins)
      $('#card-area .card').removeClass('blue-grey lighten-4 blue-grey-text text-lighten-4')
      $('#message-title').text(`Player ${winner.id} wins this round!`)
      $('#message-content').text(``)
    }

    war(){
      $("#message-title").text(`WAR!!!...Just kidding, it's a Tie!`)
      var player1CardId = $(`#card-area [id^=1]`).attr('id').split('-')[1]
      var player2CardId = $(`#card-area [id^=2]`).attr('id').split('-')[1]
      var p1Card = this.player1.hand.cards[player1CardId] = new Card()
      var p2Card = this.player2.hand.cards[player2CardId] = new Card()
      $('#player-1').append(`<div id="${this.player1.id}-${player1CardId}" class="col s4 card"><p>${p1Card.name}</p></div>`)
      $('#player-2').append(`<div id="${this.player2.id}-${player2CardId}" class="col s4 card"><p>${p2Card.name}</p></div>`)
    }

    endGame(winner){
      var loser = (winner == this.player1) ? this.player2 : this.player1
      // let otherPlayer = 4
      $('#message-title').text(`Player ${winner.id} Wins!`)
      $('#message-content').text(`Player ${loser.id} must ${this.wager}`)
      this.board.displayWinImage()
      $('#message-card').append('<div id="message-action" class="card-action"><button id="restart" class="btn">Restart</button></div>')
      $('#restart').click(() => {
        $('#board').html('')
        $('#message-action').remove()
        this.startGame()
      })
    }

}
