let keyDirection = {x:0,y:0}
let previousDirection = {x: 0,y: 0}

//each key event will have it's own unique x and y coordinate according to the grid.
//the break points were added to pause the javascript code so that the snake does not keep going in one direction. this allows for the keyboard function to be able to change direction whenever it is needed.
//the previousDirection variable is added so that the snake does not move in a complete 360 degree motion. we want the snake to move as if it is going along a path we want to be able to turn around and change direction but not 360 or going backwards into the snakes body.
//this input will allow the player of the game to be able to move the snake without running into repeated actions, for example: if we are moving up we cannot just go up and then go down, we will have to make a turn(left or right) and then change the direction to down first and vice versa .The rules apply for the left and the right key board presses, if you are going left you cannot just do right you have to move up or down first before switching from left to right or vice versa.
window.addEventListener('keydown', e => {
    switch (e.key) {
    case 'ArrowUp' :
       if(previousDirection.y !== 0 )break 
       keyDirection = {x:0, y: -1}
        break
    case 'ArrowDown' :
            if(previousDirection.y !== 0)break 
        keyDirection = {x:0, y: 1}
        break
    case 'ArrowLeft' :
         if(previousDirection.x !== 0)break 
        keyDirection = {x:-1, y: 0}
        break
    case 'ArrowRight' :
         if(previousDirection.x !== 0)break 
        keyDirection = {x:1, y: 0}
        break
        
    }
})

//This function will stop the snake from moving on it's own and allow use of the arrow keys from the keyboard in based on the event listener above.
export function getInputDirection(){
previousDirection = keyDirection
    return keyDirection
}


