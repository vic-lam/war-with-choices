class Board {
    constructor() {
    }

    displaySplash() {
        $('#board').append(`
            <form class="col s12">
          <div class="row">
            <div class="col s12">
              <div class="input-field inline">
                <input id="splash-wager-input" type="email" class="validate" placeholder="Ex: Make the winner an egg salad sandwich">
                <label for="email" data-error="wrong" data-success="right">Loser must: </label>
              </div>
            </div>
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
        var player1Hand = `<div id="player-1" class="card col s12 m4"><div class="card-title">Player 1</div></div>`
        var player2Hand = `<div id="player-2" class="card col s12 m4" ><div class="card-title">Player 2</div></div>`
        var battlefield = `<div class="card col s12 m4" id="battlefield"><div class="card-title">Battlefield</div><div id="message"></div></div>`
        var gameBoard = player1Hand + battlefield + player2Hand
        $('#board').append(gameBoard)
        // Instantiate players
        // Instantiate hands
        var player1 = new Player(1)
        var player2 = new Player(2)
        // Render hands
        player1.render()
        player2.render()
        // Set turn to 0
        this.playCount = 0
        // Message that it's player1's turn
        this.displayTurnStatus()

        // Add Event Listeners
        $("#player-1 .card").click(this.turn)
    }

    turn(){
        // Move this card to the Battlefield
        $("#battlefield").append(event.target)
        // increment playCount
        this.playCount += 1
        //
        $("#player-1 .card").off()
    }

    displayTurnStatus(){
      if (this.playCount % 2 == 0) {
        $("#message").text("Player1's Turn - GO!")
      } else {
        $("#message").text("Player2's Turn - Choose wisely")
      }
    }

}
