import { onSnake,expandSnake } from "./snake.js"
import {randomGridPosition} from './grid.js'


let food = getRandomFoodPosition()
const EXPANSION_RATE = 5

export function updateLoop() {
    if(onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        // score++
        // scoreDisplay.textContent = score
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
