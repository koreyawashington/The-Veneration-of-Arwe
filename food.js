import { onSnake,expandSnake } from "./snake.js"
import {gridposits} from './grid.js'

//I added a score keeper and round tracker the same exact way. I created the html divs for score and round display and I pulled it from html page into the javascript page. everything starts at zero and then will go up by the units i have set for the score and round to increase eat time the snake eats the food during game play.
//I added my score after I got my game up and running just to make things less complicated===score added
let scoreDisplay = document.getElementById('scoreDisplay')
let score = 0
scoreDisplay.innerHTML = score
//I want to add rounds as well to go along with the score for every time the snake eats the food there will be an additional round of the game
let roundDisplay = document.getElementById('roundDisplay')
let round = 0
roundDisplay.innerHTML = round

//It is important to note that css grid starts at 1 (NOT 0 because zero is located outside of the grid) so when making a grid you have to make sure ever variable falls 1 and the area of the grid. so that means if the grid is 21 by 21 ever variable coordinate on the grid falls between the numbers of 1 and 21 or if you have a 25 by 25 grid the x and y variables fall between the numbers of 1 and 25, etc.
//This variable will hold  the function that will make appear a new random position for the food on the gameboard.
let food = getRandomFoodPosition()
//This variable contains the number of blocks the snake will gain after he consumes the food during game play.
//This variable will allow my snake to grow 3 blocks each time the snake eats the snake, allowing the snake to grow bigger and make the game play a little more difficult because the larger the snake grows the bigger the snake will be. So if you want the game to be played at a more difficult level then you can add more blocks each feed by making the expansion rate of the snake a larger number. the game is easier played when then expansion rate is at a lower number. a higher expansion rate means less space on the board as the snake eats and vice versa for a smaller number === more space.
const snakeExpandingRate = 3

//This function will detect if the snake and the food are sharing the same grid coordinate(if the snake eats the food) which will update what will happen in the game when the snake eats the food.
export function updateLoop() {

  //If the snake and food are sharing the same coordinate then we will expand the snake and get a new random position for the food. The round and score will go up and when the score reaches the winning number of point, the game will alert a win state.
//on snake and expand snake were imported and exported from snake.js
  //If the snake runs into the food---
  if(onSnake(food)) {
      //the snake will gain blocks to the snake body---
        expandSnake(snakeExpandingRate) /**I passed in the expansion rate to let the game update to the number in the expansion variable for the snake */
        //there will be a new random position for the snake---
        food = getRandomFoodPosition()

        //the score will increase by 21---
        //score added
        score += 21// ++ or += to add a multiple of scores
        scoreDisplay.textContent = score
        console.log(score);
        //score added

        //the round will increase by 1---
        //round added
        round ++// to make the rounds go up one at a time---no multiples for rounds
        roundDisplay.textContent = round
        console.log(round);
        //round added

        //else if the score equals to 420 or whatever score is the winning score---
    }else if(score == 420){
      score = 0
      // window.location.reload() I had to comment the automatic page reload out because it did not work well with having the music on my page autoplay. when the game was won it would just reload the screen not allowing the score to be shown or let me know if there was a win or lose state. I kept it commented out in my code so that I remember were to put it at just in case I needed to use it.
      //the game is won and over when the score reaches 420 or whatever is the winning score
      //this is the alert message that will appear once the game is won
      return alert('JAH RASTAFARI RULE! RULE! RULE! HAILE SELASSIE I IS THE RULER!')
      
    }
  }
//This function is almost identical to the draw loop for the snake draw loop, i just changed the snake identifier to the the food element so that this will recognize the food and draw it to the game board. once this function is exported and imported to the game.js the food element should appear on the gameboard.
export function drawLoop(gameBoard){
     
          const foodElement = document.createElement('div')
          foodElement.style.gridRowStart = food.y
          foodElement.style.gridColumnStart = food.x
          foodElement.classList.add('food')
          gameBoard.appendChild(foodElement)
      
  
  }
//This position will return a new food position for every time the food gets eaten by the snake.
  function getRandomFoodPosition() {
    let foodPositionRefresh
    //This while loop allows the computer to understand to return a new grid position for the food that is not shared with any of the positions of the that are already on the snake.
    while(foodPositionRefresh == null || onSnake(foodPositionRefresh)) {
        foodPositionRefresh = gridposits() /**the new food position will be a random grid position that is inside of the grid and not already occupied or filled up by snake */
    }
    //The computer will make sure to give a new position on the grid that is not any position off of the grid or  that is the snake or snake body. If the new food position is already on the snake the computer will keep computing a new random position until the new position is not connected to the snake....this will happen in milliseconds(instantly)
    //remember css grid starts at one so any variable that contains a 0 is technically not on the grid. That is why the function is written that way.
    return foodPositionRefresh
  }
