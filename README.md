# war-with-choices

It's War...but with choices!


## Model Structure

- Game Model (In Charge of all Game logic and containing all components)
- Card Model
- Board Model
- Player Model
- Hand Model

## Interface/Design

- Board View Rendering
- Card View Rendering
- Instructions/Messages

## Game Logic

- A start loop that contains all other game logic
- An end function that resets the game
- Logic for dealing cards
- Turns and Battles
- Display messages and interactions

## User Stories


- Game starts with a splash screen that has the text "Start" in a button that starts the game and a wager input https://wireframe.cc/hEe9J5
- Two users can view a board with two hands of 5 cards each https://wireframe.cc/3AVHka
- Board displays who's turn it is and then listens for that players choice
- Player can choose card
- After player chooses card, board displays that it's the other player's turn
- After 2nd player chooses card, Battle view is rendered with both cards in the middle and displays who won https://wireframe.cc/ITWsnq
- After the battle, the player who won gets an extra card added to their "Cards Won"
- After 5 battles, the player that has more cards won wins the game
- After the game is over, the board displays the player who won and also the player who lost must do the wager

## Development Flow

- Build Splash Screen
  - append a div that contains the
    - Title
    - Wager input
    - Start Button

- First game screen
- 
