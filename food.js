import { onSnake,expandSnake } from "./snake.js"
import {gridposits} from './grid.js'


//I added my score after I got my game up and running just to make things less complicated===score added
let scoreDisplay = document.getElementById('scoreDisplay')
let score = 0
scoreDisplay.innerHTML = score
//I want to add rounds as well to go along with the score for every time the snake eats the food there will be an additional round of the game
let roundDisplay = document.getElementById('roundDisplay')
let round = 0
roundDisplay.innerHTML = round

let food = getRandomFoodPosition()
const snakeExpandingRate = 3

export function updateLoop() {
    if(onSnake(food)) {
        expandSnake(snakeExpandingRate)
        food = getRandomFoodPosition()
        //score added
        score += 21// ++ or += to add a multiple of scores
        scoreDisplay.textContent = score
        console.log(score);
        //score added
        round ++// to make the rounds go up one at a time---no multiples for rounds
        roundDisplay.textContent = round
        console.log(round);
    }else if(score == 420){
      score = 0
      // window.location.reload()
      return alert('Sweet VICTORY! You Conquered the SNAKE, You won!!')
      
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
        newFoodPosition = gridposits()
    }
    return newFoodPosition
  }
