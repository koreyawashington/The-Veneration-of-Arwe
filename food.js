import { onSnake,expandSnake } from "./snake.js"
import {randomGridPosition} from './grid.js'
//score added
let scoreDisplay = document.getElementById('scoreDisplay')
let score = 0
scoreDisplay.innerHTML = score
//scored added
let food = getRandomFoodPosition()
const snakeExpandingRate = 3

export function updateLoop() {
    if(onSnake(food)) {
        expandSnake(snakeExpandingRate)
        food = getRandomFoodPosition()
        //score added
        score += 21 // ++ or += to add a multiple of scores
        scoreDisplay.textContent = score
        console.log(score);
        //score added
    }else if(score == 420){
      score = 0
      window.location.reload()
      return alert('You Conquered the snake! You won!!')
      
    }
  }

export function drawLoop(gameBoard){
     
          const foodElement = document.createElement('div')
          foodElement.style.gridRowStart = food.y
          foodElement.style.gridColumnStart = food.x
          foodElement.classList.add('food')
          gameBoard.appendChild(foodElement)
      
  
  }

  function getRandomFoodPosition() {
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
  }
