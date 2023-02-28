import { getInputDirection } from "./input.js"

export const snakeSpeed = 10
const snakeBody = [ {x:11,y:11} ]
let newSegments = 0

export function updateLoop() {
    addSegments()

  const inputDirection =  getInputDirection()
  for(let i = snakeBody.length - 2; i >= 0; i--){
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
snakeBody[0].x += inputDirection.x
snakeBody[0].y += inputDirection.y
}
export function drawLoop(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })

}

export function expandSnake(amount){
    newSegments += amount
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return Boolean(false)
        return equalPositons(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

 function equalPositons(position1, position2) {
    return (
        position1.x === position2.x && position1.y === position2.y
    )
}

 
function addSegments() {
for(let i = 0; i < newSegments; i++) {
    snakeBody[snakeBody.length] = {...snakeBody[ snakeBody.length - 1 ]}
    // snakeBody.push ({...snakeBody[snakeBody.length -1]})
}

newSegments = 0;
}
