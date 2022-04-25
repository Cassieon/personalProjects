//all of the things below are pulling from our html document
document.addEventListener('DOMContentLoaded', () => {
    //qurey selector to look thru html doc and find the element or class name of grid
    const grid = document.querySelector('.grid')//javascript method
    //we want javaScript to talk to all the squares in our grid
    let squares = Array.from(document.querySelectorAll('.grid div')) //using Array.from to collect all the divs in our grid and put them into an array we can work w/. Each div will a specific index number 
    //using hash to idicate we are looking for an id
    const ScoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button') //could use getElementById as well
    //telling javaScript the width of our squares and grid
    const width = 10

    //the tetrominoes
    const lTetromino = [   //each array is a diff tetromino position 
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2], 
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ]

    const tTetromino = [
        [width, 1, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width*2+1, width+2],
        [width, 1, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1]
    ]

    const iTetromino = [
        [1, width, width*2, width*3],
        [width, width+1, width+2, width+3],
        [1, width, width*2, width*3],
        [width, width+1, width+2, width+3]
    ] 
    
    //drawing out tetrominoes on squre gird
    const theTetrominoes =  [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
        console.log(theTetrominoes)
    let currentPosition = 4
    let current = theTetrominoes [0][0] //grabs the first tetrominoe and its first position
    
    //write a function called draw
    //and get current array
    //1. get current array by iterating through it
    //2. if current position is 4 the conditional needs to stop at 4
    function draw() {
        for (let i = 0; i = 4; i++) {

        }
    
    }
})