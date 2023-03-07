import { updateLoop as updateSnake, drawLoop as drawSnake,speed, getSnakeHead, snakeIntersection, } from "./snake.js"

import {updateLoop as updateFood, drawLoop as drawFood} from "./food.js"

import { outsideGrid } from "./grid.js"

// This is the variable for the clock that runs in my game that will keep track of the time starting at 0 and moving up in milliseconds at first but eventually in (estimated)seconds.
let clock = 0

//game over variable will equal Boolean(false)
let gameOver = Boolean(false)

//This is how the game board is connected to the html div I created. I located the game board in the html and pulled it to my javascript file. 
//This variable will make the actual snake become visible on a live server after importing the snake updateSnake, drawSnake function and the snake's speed.
const gameBoard = document.getElementById('game-board')

// This loop is the main loop that will run the entire game and repeat itself, like a clock or timer. 
// This loop will allow action to take place throughout the course of the game until there is either a win or lose alternative.
function gameLoop(time) {
// This function will keep track of the current time of the gameBoard.
 
//when there is a losing state the game loop will equal to false and return the losing alert message.
if(gameOver){
    // document.location.reload() ==== This is how I would want my game to automatically reload after a win or lose but I had to take it out because when I added my music, it was not giving me the alert message of if I won or lose it just restarted over automatically and I did not like that. I took it out because with the music it wont let you see the alert or the result of the game.
    return alert('You have failed. TRY AGAIN!!')
  


}

// This this is going to animate my game and tell the current time with the computer already having knowledge of the current time  frame and next frame.
     window.requestAnimationFrame(gameLoop)
// This is the conversion for the time and clock from milliseconds to seconds.    
const secondsFromLastRender = (time - clock) / 1000 //divide by 1000 because this is in milliseconds and we want to convert into seconds
// To calculate actual movement, check if the seconds since the last render time is less than the time between the current time and last render time. 
if(secondsFromLastRender < 1 / speed) return
// This will keep track of when the game is running and the snake is allowed to move in an active game because the game will be constantly updating because of the moving snake. 
 
    clock = time

    // The update and draw loop will work together to make the entire game function and able to be moved around accurately with what moves and outcomes are happening in the game.
    // The update loop will update all of the logic for the game. This loop will move the snake the way you want it to go but not animate the snake. The update loop is responsible for updating when the food is eating,make the snake longer, and when there is a win or losing result.
    updateLoop()
   //The draw loop will make everything appear on the screen according to the time intervals. This loop will take all of the logic from the update loop and make it visible on the screen and live. 
    drawLoop()

}
// this is where we request the animation frame again. This is mandatory. 
window.requestAnimationFrame(gameLoop)



//This is the function for the updating loop
function updateLoop() {
    // The function imported from snake.js for update snake was imported to the game.js to be used in the updating loop with a new name.
   //This function was imported and exported from snake.js
    updateSnake()
    //this function was imported and exported from the food.js with a new name.
    //This function allows the food object of the game to appear on the gameboard
    updateFood()
    //this function will update if there are any losing states happening in the games. for example did the snake run into the game board border or itself
    checkFailure()
}



//This is the function for the draw loop which is related to the render time.
function drawLoop() {
//I used gameboard.innerHTML = '' to make sure that all of the snake's body parts do not show all of the places where the snake has been. This will ensure that the snake's body will not be connected to the game board and track every single place on the board where the snake has been. Now the snake will not show any previous pieces of the snake being it just the snake's body and the number of added segments on the snake. before adding this step the snake would just create a big trail of where the snake has been. now single we have set the inner html to an empty string in a way of separating the snake from the game. the snake is on the game board we do not want all of the snake's movements shown on the game board. we want the snake to be able to being it's own object that will only show the current number of blocks according to eating food and none of the blocks are sticking to the screen and creating a big line across the screen from the snake's starting point.
    gameBoard.innerHTML = ''

    // The function imported from snake.js for drawing the snake was imported from snake.js and given a new name and is being used in the drawing loop in game.js.
    drawSnake(gameBoard)
    //This function is imported and exported from food.js and will keep track of the when the food is eaten by the snake and will update a new position for when then food is eaten at a random position on the board.
    drawFood(gameBoard)
}



//this function will actively and visually alert for losing states of the game.
function checkFailure() {
    //game over = if the snake's head comes in contact with the game board border(wall) or if the snake head comes in contact with its own body
    //these functions are imported and exported from grid.js and snake.js
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}




