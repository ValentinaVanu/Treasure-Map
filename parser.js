const fs = require('fs')
// x4y1,x1y2,x5y2
// First approach to solving the map
console.log('neata')
const map = fs.readFileSync(process.argv[2], 'UTF-8')
const [start, ...rest] = map
    .split('\n')
    .map(line => line.split(',')
      .filter(Boolean)
      .map(cordinate => ([cordinate.slice(0, 2), cordinate.slice(2, 4)].reduce((a, c) => ({
        ...a,
        [c.split('')[0]]: +c.split('')[1]
      }), {})))
    )

const [treasure, ...reef] = rest.reverse()
const allCoordinates = [start, reef.flatMap(x => x), treasure].flatMap(x => x)
const minX = Math.min(...allCoordinates.map(a => a.x))
const maxX = Math.max(...allCoordinates.map(a => a.x))
const minY = Math.min(...allCoordinates.map(a => a.y))
const maxY = Math.max(...allCoordinates.map(a => a.y))
const reefList = reef.flatMap(x => x)
const initialMap = Array.from({length: maxX}, (_, y) => Array.from({length: maxY}, (_, x) => x === start[0].x && y === start[0].y ? 'S' : x === treasure[0].x && y === treasure[0].y ? 'E' : reefList.find(r => x === r.x && y === r.y) ? 'x' : '.'))




const a = reef
  .flatMap(x => x)

// console.log(start[0])
console.log(reef.flatMap(x => x))
// console.log(last[0])
// console.log('//////////////')
// console.log(minX, maxX, 'X')
// console.log(minY, maxY , 'Y')
console.log(initialMap)
console.log(a)
