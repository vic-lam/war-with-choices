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
        $('#board').append('')
        // Instantiate players
        // Instantiate hands
        // Render hands
        // Set turn to 0
        // Add Event Listeners
    }

}
