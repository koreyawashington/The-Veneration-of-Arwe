import { updateLoop as updateSnake, drawLoop as drawSnake,speed, getSnakeHead, snakeIntersection, } from "./snake.js"

import {updateLoop as updateFood, drawLoop as drawFood} from "./food.js"

import { outsideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = Boolean(false)
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
if(gameOver){
    document.location.reload()
    return alert('You have failed to defeat the snake. TRY AGAIN!!')
  

    // if(confirm('You were defeated. Press ok to reset the game and TRY AGAIN!')) {
    //     window.location = '/'
    // }
    // return
}


     window.requestAnimationFrame(main)
     const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 //divide by 1000 because this is in miliseconds and we want to convert into seconds
    if(secondsSinceLastRender < 1 / speed) return
   
 
    lastRenderTime = currentTime
    
    updateLoop()
    drawLoop()

}

window.requestAnimationFrame(main)

function updateLoop() {
    
    updateSnake()
    updateFood()
    checkFailure()
}

function drawLoop() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkFailure() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}



//first game board idea

// const beat = new Audio();


// const playBoard = document.querySelector(".play-board");
// let foodX, foodY;

// const changeFoodPosition = () => {
//     foodX = Math.floor(Math.random() * 50) + 1,
//     foodY = Math.floor(Math.random() * 50) + 1;
// };
// changeFoodPosition();

// const initGame = () =>{
//     let htmlMarkup = `<div class="food" style="grid area:${foodY} / ${foodX} "></div>`;
//     playBoard.innerHTML = htmlMarkup;
// };

// initGame();

// console.log(playBoard);
// console.log(changeFoodPosition);
// console.log(initGame);
// console.log(foodX,foodY);

