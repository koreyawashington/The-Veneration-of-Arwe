import { getInputDirection } from "./input.js"

// The snake speed works with the timer. The speed represents how many time the snake will move each second.
//The snake speed will control how fast/how many times the game(page) will update until the end of the game.
// Whatever the number of the snake speed will show be how many times the snake will move each second.
// draw and loop functions will update every second based on the speed of the snake--- so if snake speed is 11 the game will update 11 times in one second.
// Increasing the number will increase the speed of the snake and make the game harder to play and making the speed a lower number will make the snake move slower and the game will be easier to play.
export const speed = 11 /**This is the snake speed */

//Instead of using canvas, I used a div element to make my game board and in the css of the game board I created a grid. The grid allows me to be able to use the 'x' and 'y', horizontal and vertical grid variables, to construct the snake as a actually being apart of the grid aka game board but the snake being its own movable piece.
//The snake is created by an array because the snake's body is the created from a collection of x and y variable from the grid. The computer already understands that when using the grid, the x and y represents the points of a graph aka grid.
//This variable is an array of x and y positions on the graph to keep the snake whole but "separate" from the game board.
//This variable also ensures that the snake will appear in the middle of the screen each time
const snake = [ {x:11,y:11} ] /*This is the starting point for the snake at the beginning of each game.*//*The grid diameter of the grid is 21 blocks so the radius(medium) of the grid is 11  */


//This variable is added to create a default for how the snake grows which will be zero so that the snake does just grow on it's own
//The snake will not grow unless the snake eats the food
let addedSegments = 0



// This function will update the snake body.
//This loop will move the blocks of the snake's body in a growing line segment that will make the blocks of the snake's body to add and stay connected to the snake's body following after the snake's movement on the grid.
//The (the head of the snake)snake will move first and be guiding, by the arrow keys on the keyboard, with the body following after the path of the blocks before,starting at the snake's head which is acting as the leader of the blocks. 
//Inside of this function the entire snake object will now move single file one after another and following the path of how the snake will move in each direction.
export function updateLoop() {
 //this function is added to the update loop because it will be called every `time the game is updated(when the snake eats the food)   
    addToSnake()

  const inputDirection =  getInputDirection()
  //the for loop will loop through each segment adding on except for the last segment because the position of the snake's body because as the game is played the snake will never be in the last position again .
  for(let i = snake.length - 2; i >= 0; i--){ /**snake.length will give the second to last element of the snake. when i is greater than 0 the loop will stop and subtract 1 from i each interval*/
    snake[i + 1] = { ...snake[i] } /**we will take the previous element i + 1 and set it equal to the current element in the i position */
//  make sure to use the spread operator to expand the iterable into its own new object (the snake's body). This will essentially create a duplicate copy of the snake at position i and set it equal to the snake at position i + 1. 
}
//this is how the head of the snake at snake[0] will be updated based where the snake is being directed to go.
snake[0].x += inputDirection.x
snake[0].y += inputDirection.y

}
// This function is for drawing the snake's body onto the game board. The game Board is passed into the drawLoop function to let the computer know to allow the drawLoop to be connected to the game board directly to allow activity in the game.
//This is how the snake is added and grows on the game board.
export function drawLoop(gameBoard){
    //I added the snake into the game by the drawLoop function to actually tell the computer to add the snake at the snake starting point at the beginning of each game.
    //This is how the snake body will grow.
    snake.forEach(segments => {
       //adding the segments attaching by calling a function for each variable connected to the snake.
       
       //This variable will create a div element that will be the snake's body.
       const theSnakeBody = document.createElement('div')
        //This will set the snake's body to officially start at set column and set row, x and y coordinate positions.
       theSnakeBody.style.gridRowStart = segments.y
        theSnakeBody.style.gridColumnStart = segments.x
        //This is how to add the snake class from the game.css because the snake was never added in the html.This is why I love javascript.
        theSnakeBody.classList.add('snake')
//This will not work without exporting and importing to game.js and passing the game board  into the game.js drawing loop and creating a variable for the game board.
        gameBoard.appendChild(theSnakeBody)
    })

}


//this function is exported and imported to food.js to update the snake's expansion rate in the update loop for the food.
//I passed in a number for how much the snake will expand which will be calculated in the food's update loop
export function expandSnake(number){
    addedSegments += number /**the snake will add on blocks to the snake's body when the snake eats the food */
}

//this function is exported and imported to the food.js
//this function will evaluate ,when the snake eats the food,it will return an evaluation of if the snake and food share the same grid coordinate. 
//if the snake is equal to the position,that is passed through the onSnake function then the function will return true. The game should now run and when the snake eats the food it will then return a new food position.
export function onSnake(position, {ignoreHead = false} = {}) /**ignoreHead will be false by default with an added empty curly bracket for when nothing is past aka moving around the board freely without touching anything */ 
{
    return snake.some((segments, index) => {
        //if ignoredHead is true and the index is equal to zero this just means to tell the computer to not worry about if the snake head is on index 0 because the part of the snake at index 0 is the snake's head and we do not want to be alerted that the snake's head is on index 0 0 because that is the head...snake head and snake at snake index[0] are the same thing.
        if(ignoreHead && index === 0) return Boolean(false)
        return equalGridPosits(segments, position)
        //Now the game will properly alert if the snake head is in the same position as any part of the snake's body other than the snake's head this function will alert a lose state.
    })
}

//this will return snake at the array index of zero to return the position on the snake's body that is and directly related to the head of the snake(the first block that is actually leading the snake's body)
export function getSnakeHead() {
    return snake[0]
}


//this will determine if the head of the snake has came in contact with the body of the snake.
export function snakeIntersection() {
    //return if the head of the snake is sharing the same grid position as the body of the snake it will return true to let the computer know that the snake head has intersected with the snake body.
    return onSnake(snake[0], {ignoreHead: true})
}

//this function will determine if any of the below positions are met to determine the outcome.
 function equalGridPosits(position1, position2) {
    return ( /**if the two positions are the same then it should return a Boolean(true)  */
        position1.x === position2.x && position1.y === position2.y
    )
}

 //This function will now visually add the new segments onto the end of the snake's body(from the back).
 function addToSnake() {
    //this will loop through all of the added segments on the snake. so for each time the snake gets new segments, I appended the  new segments onto the snake's body length.  
for(let i = 0; i < addedSegments; i++) {
    snake[snake.length] = {...snake[ snake.length - 1 ]} /**This means that the last block of the snake's current body will be duplicated with the added segments that get added onto the snake each time the food is eaten by the snake.  */
    //when the snake eats the food, the snake will add on the new segments of the snake and the segments will appear after the last of the old segments on the snake's body passes over the grid coordinate where the snake ate the food, then you will see the change in the snake's body length according to the expansion rate.
}
//I had to make the variable for the added segments and make it equal to zero or else the snake would continue to grow constantly without end. this way the snake will not expand for infinity but expand only according to the expansion rate.
addedSegments = 0;
}
