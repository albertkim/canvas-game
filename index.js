const boxWidth = 30
const boxHeight = 30

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let gameState = {
  player: [
    {x: 0, y: 0}
  ],
  pickups: [
    {x: 2, y: 2},
    {x: 5, y: 8}
  ],
  score: 0
}

function drawGrid(horizontalCount, verticalCount) {

  context.clearRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'black'
  context.font = "20px Georgia"
  context.fillText('Score', 330, 20)
  context.font = "40px Georgia"
  context.fillText(gameState.score, 330, 50)

  for (var x = 0; x < horizontalCount; x++) {
    for (var y = 0; y < verticalCount; y++) {
      context.rect(x * boxWidth, y * boxHeight, boxWidth, boxHeight)
    }
  }

  const playerPosition = gameState.player[0]

  // Detect pickup collision
  for (let i = 0; i < gameState.pickups.length; i++) {
    const pickup = gameState.pickups[i]
    if (pickup.x === playerPosition.x && pickup.y === playerPosition.y) {
      console.log('HIT')
      // Remove the pickup
      gameState.pickups.splice(i, 1)
      gameState.score ++
    }
  }

  // Remo

  // Render the player
  context.fillStyle = "black";
  for (const player of gameState.player) {
    context.fillRect(player.x * boxWidth, player.y * boxHeight, boxWidth, boxHeight)
  }

  // Render the pickkups
  context.fillStyle = "#FF0000";
  for (const pickup of gameState.pickups) {
    context.fillRect(pickup.x * boxWidth, pickup.y * boxHeight, boxWidth, boxHeight)
  }

  context.stroke()

}

setInterval(() => {
  drawGrid(10, 10)
}, 100)

document.onkeydown = function(event) {
  const currentPlayer = gameState.player
  const head = currentPlayer[0]

  switch (event.keyCode) {
    case 37:
      // Left
      gameState = {
        ...gameState,
        player: [{
          ...head,
          x: head.x - 1
          
        }]
      }
      break;
    case 38:
      // Up
      gameState = {
        ...gameState,
        player: [{
          ...head,
          y: head.y - 1
        }]
      }
      break;
    case 39:
      // Right
      gameState = {
        ...gameState,
        player: [{
          ...head,
          x: head.x + 1
        }]
      }
      break;
    case 40:
      // Down
      gameState = {
        ...gameState,
        player: [{
          ...head,
          y: head.y + 1
        }]
      }
      break;
  }
}
