const fs = require('fs')
// Here I am searching through files to print and select the one I am interested in
const map = fs.readFileSync(process.argv[2], 'UTF-8')

// Using the basic map from the selected file,I've eliminated any white spaces, splited on each row so I can select every x and y coordinate, I removed the commas and also each remaning empty string by filtering on boolean.
const newMap = map.trim().split('\n')
  .map(l => l.split(',')
  .filter(Boolean))

// Here I am destructuring and setting start as the start of our map and the rest of it and mapping our x and y coordinates with their values transformed to numbers from strings
const [start, ...rest] = newMap.map(a => a.map(c => ({
  [c[0]]: +c[1], 
  [c[2]]: +c[3], 
})))

// Here I reversed our newMap so I can select the last coordinates as the treasure coordinates and the rest will be the reef
const [treasure, ...reef] = rest.reverse()

// Prepare all coordinates to set the min and max of our x and y
const coordinateList = [
  start[0],
  ...reef.flatMap(x => x),
  treasure[0]
]

// Now I will be looking for the each x and y and find their min and max for both
const xList = coordinateList.map(x => x.x)
const yList = coordinateList.map(y => y.y)
const maxX = Math.max(...xList) + 1
const maxY = Math.max(...yList) + 1
const minX = Math.min(...xList)
const minY = Math.min(...yList)
const reefList = reef.flatMap(r => r)


// Finally this is our drawn map with S as start E as treasure X for reef and . for spaces where we can add our steps.
// I have created a shadow array with the lenght of x and y max , added a key for each of them so i can keep track and check if my S coordinates match the ones from my gameMap array(key) and repeated the process for E,S,X and .
const gameMap = Array.from({length: maxY}, (_, y) => Array.from({length: maxX}, (_, x) => x === start[0].x && y === start[0].y ? 'S' : x === treasure[0].x && y === treasure[0].y ? 'E' : reefList.find(r => x === r.x && y === r.y)? 'X' : '.'))

// Focusing our steps now! I am checking if top, bottom, left or right is a . or not so I know where I can move:
let moves = 0
const steps = (stepsMap, position, solution = false) => {
  let canMoveList = []
  if (solution){
    // console.log('am gasit-o', stepsMap, solution,moves)
    return {stepsMap, solution, moves}
  } else {

    if (stepsMap[position.y + 1] && stepsMap[position.y + 1][position.x] === '.') {
      canMoveList = [...canMoveList, {...position, y: position.y + 1}]
    }
    if (position.y && stepsMap[position.y - 1][position.x] === '.') {
      canMoveList = [...canMoveList, {...position, y: position.y - 1}]
    }
    if (stepsMap[position.y][position.x + 1] === '.') {
      canMoveList = [...canMoveList, {...position, x: position.x + 1}]
    }
    if (position.x && stepsMap[position.y][position.x - 1] === '.') {
      canMoveList = [...canMoveList, {y: position.y, x: position.x - 1}]
    }
    // checking if E(treasure) was found as a step so I can stop searching in other directions
    if (
      stepsMap[position.y + 1] && stepsMap[position.y + 1][position.x] === 'E' || 
      position.y && stepsMap[position.y - 1][position.x] === 'E' || 
      stepsMap[position.y][position.x + 1] === 'E' || 
      position.x && stepsMap[position.y][position.x - 1] === 'E' 
    ) {
      // If E was found, then i will change my solution from false to true and return my result
      solution = true
      const result = { stepsMap, solution, moves, d:'dd' }
      console.log('esteee!!!!!!!!!!\n', '\n\n\n', result)
      return result
    }
    // If there are no more steps to take because I m surrounded by anything else but .(sea) then we will see this message
    if (canMoveList.length === 0) {
      console.log('No more moves.')
    } else {
      // Here I am giving my canMoveList a random number, so a random choise of direction, where to go next
      const randomMove = canMoveList[Math.floor(Math.random() * canMoveList.length)]
      // Every step I took it will be changed to O to make sure I wont be taking the same steps
      stepsMap[randomMove.y][randomMove.x] = 'O'
      // console.log('moree!!!!!!!!!!\n',canMoveList, randomMove, stepsMap, '\n\n\n')
      if (!solution) {
        steps(stepsMap, randomMove, solution, moves++)
      }
    }
  }

  return {stepsMap, solution, moves}
}
// const salut = Array.from({length: 10}, () => (steps({...gameMap}, start[0])))
console.log(
  // start,
  // 'start',
  // reefList,
  // rest,
  // treasure,
  // 'treasure'
  // coordinateList,
  // xList, yList,
  // maxY, maxX,
  // newMap,
  // start[0], 'start\n',
  // start[0].y ? gameMap[start[0].y ][start[0].x] : 'false', 'start up\n',
  // gameMap[start[0].y + 1][start[0].x], 'start down\n',
  // gameMap[start[0].y][start[0].x + 1], 'start right\n',
  // start[0].x ? gameMap[start[0].y][start[0].x - 1] : 'false', 'start left',
  // gameMap,
  // salut,
  'aaaaaaaaaaaaaaaaaa',
  steps(gameMap, start[0],false),
  )
  
