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
    let nextRandom = 0

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
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ] 
    
    //drawing out tetrominoes on squre gird
    const theTetrominoes =  [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
        
    let currentPosition = 4
    //this will cause randomly chosen tetrominoe to start at its first rotation
    let currentRotation = 0


    //select tetrominoes randomly
    //use Math.random and multiply by the length of tetreminoe's array
    //pass it thru Math.floor to round down number to neartest integer
    let random = Math.floor(Math.random()*theTetrominoes.length)
    console.log(random)

    //pass random through random to get random tetrominoes
    let current = theTetrominoes [random][currentRotation] //grabs the first tetrominoe and its first position
    //write a function called draw
    //and get current array
    //1. get current array by iterating through it
    //2. if current position is 4 the conditional needs to stop at 4
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }
    //write a function to undraw random tetrominoe and its current rotation
    //use .remove instead of .add
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //auto move the tetromino down in 1s increments
    //use timerId to stop set interval in future
    timerId = setInterval(moveDown, 1000)

    //asign keys 
    //write a document called control and add an eventListener 
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)
    
    //write a function called moveDown that calls our prev draw undraw functions
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze() //will invoke and check every second
    }

    //write a freeze function that inludes an if statement
    //similar to forEach but instead of appling logic to each item in the array .some 
    //checks if the logic is correct for some of the items in the array

    function freeze() {
        //if some of the squares in the tetromino has an index + a space that
        //contains a 'taken' square turn each tetromino square into a square that 
        //has the class of taken
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //then immediately select a new tetromino to be the current tetremino
            //start a new falling tetremino
            random = nextRandom// put in place so that next radom shape in min grid matches the next random shape in main grid
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            miniDisplay()
        }
    }

    //write a set of rules to let JS know when any of our tetrominoes squares 
    //are in an index that isn't mapped in our HTML
    
    //write a function that moves tetriminoes left 
    //do so by drawing it and undrawing it in the squares
    function moveLeft() {
        undraw() //removing any trace of the shape in its current location
        //define what is the left edge and if the shape is in it
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)//checking that some of the current shape's index if divded by the width leave no reamainder
        
        //allows shape to only move left if its not at the left edge indicated by !
        if(!isAtLeftEdge) currentPosition -= 1

        //stops shape if other tetromino is there
        //if it moves into those spaces its pushed back 1 space so it appears to not have moved
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            //add 1 so that it moves back to its og space in the array
            currentPosition += 1
        }
        draw()
    }

    //move the shape right unless it is at the edge or there is anothr shape
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }
    
    //write a function to rotate the tetrimino
    //needs to skip to the next rotation in the current rotation array
    function rotate() {
        undraw() //start with undraw to undraw shape
        currentRotation ++//moves to the next item in arry with incrament opperator 
        if(currentRotation === current.length) { //if current rotation gets to 4, go back to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //displaying next shape in mini grid
    const displaySquares = document.querySelectorAll('.miniGrid div') //could use array from 
    const displayWidth = 4 // how big the gird is 4x4
    let displayIndex = 0 

    //need and array showing all tetrominoes in their first rotation
    const nextTetromino = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetrmino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    //write a function that will display shape in mini grid
    function miniDisplay() {
        displaySquares.forEach(square => { //using forEach to get each squre 
            square.classList.remove('tetromino') //remove all traces of shave from entire grid
        })
        nextTetromino[nextRandom].forEach( index => { //adding the shape 
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }
    






})