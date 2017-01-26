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
        $('#board').append(`<div id="player-1" class="card col s12 m4">Player 1</div>
          <div class="card col s12 m4" id="battleground">Battlefield</div>
          <div class="card col s12 m4" id="player-2">Player 2</div>`)
        // Instantiate players
        // Instantiate hands
        var player1 = new Player(1)
        var player2 = new Player(2)
        // Render hands
        player1.render()
        player2.render()
        // Set turn to 0
        // Add Event Listeners
    }

}
