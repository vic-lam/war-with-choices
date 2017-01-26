class Game {
    constructor() {
        // Initialize board
        this.board = new Board()
        this.board.displaySplash()
    }

    render() {
        // console.log(DECK);
    }
}

// class TicTacToe {
//   constructor(){
//     this.board = new Board()
//     this.playCount = 0
//   }
//
//   render(){
//     this.board.render(this.addEventHandlers.bind(this))
//   }
//
//   addEventHandlers(){
//     $('.square').click( (event) => {
//       this.updateBoard(event.target.id)
//       $(event.target).text(this.currentPlayer())
//       this.playCount += 1
//     })
//   }
//
//   updateBoard(index){
//     this.board.positions[index] = this.currentPlayer()
//   }
//
//   currentPlayer(){
//     if (this.playCount % 2 === 0) {
//       return  'X'
//     } else {
//       return 'O'
//     }
//   }
// }
