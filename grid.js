//This constant variable does not determine the actual size of the grid. This is used to represent the grid size just in case the grid size changes.
const sizeByGrid = 21

//this function will be exported to the food.js to get the random position for the food ,once it is eaten, while actively playing the game.
export function gridposits () {
    return{ 
        //This function's purpose is to calculate a random number for the x and y variables on the grid
        x:Math.floor(Math.random() * sizeByGrid) + 1,
        y:Math.floor(Math.random() * sizeByGrid) + 1
        //I multiplied math.floor(math.random()) by the grid size (21) and then added 1  to generate a random number between 1 and 21.
        //***remembering that css grid starts at 1 and not zero ***Without adding 1 at then end of the equation the computer would only generate a floor which would get me a number between 0 and 21 but not actually 21.
    }
}

//this function is exported and imported to game.js to return/alert an accurate losing state.
//this is checking to see if the position,grid coordinate of the head of the snake hits a  border wall or eats itself, that is passed in is less than the grid size to reach a game over losing state for when the snake goes out side of the any grid coordinate that is not between 1 and 21. meaning the snake hit the wall and the game is lost.
export function outsideGrid(position){
    return(
        position.x < 1 || position.x > sizeByGrid ||
        position.y < 1 || position.y > sizeByGrid
        //this will return true if the grid coordinates of the snake's head is less than 1 or greater than the size of the grid (outside of the grid) else it will return false
    )
}
