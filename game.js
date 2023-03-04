import { updateLoop as updateSnake, drawLoop as drawSnake,speed, getSnakeHead, snakeIntersection, } from "./snake.js"

import {updateLoop as updateFood, drawLoop as drawFood} from "./food.js"

import { outsideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = Boolean(false)
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
if(gameOver){
    // document.location.reload()
    return alert('You have failed. TRY AGAIN!!')
  

    // if(confirm('You were defeated. Press ok to reset the game and TRY AGAIN!')) {
    //     window.location = '/'
    // }
    // return
}


     window.requestAnimationFrame(main)
     
     const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 //divide by 1000 because this is in milliseconds and we want to convert into seconds
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




