/*----- state variables -----*/
const state = {
    currentTile: null, // tracks the selectored cell
    minesInPlay: 10, // number of mines without flags, a descending number
    flags: null, // flags left to use, a decending number
    revealedTiles: null, //
};
minesNearBy = null;
let field = [] ;  
winMsg = null;

/*-----Variables-----*/
const rowLength = 8;
const columnLength = 8;
const numberOfMines = 10;
let mineField = null;
let time = 10000000; 
let startTime;    
let elapsedTime;
let timerInterval;
  
/*----- cached elements  -----*/
const goButton = document.getElementById('go'); 
mineDisplay = document.getElementById('mine display')


/*----- event listeners -----*/
 goButton.addEventListener('click', function(){
    init();
});
 
/*----- functions -----*/
const makeField = (size) => {
    for(let i = 0; i < size; i++ ) {
       const makeCell = document.createElement('div');
        makeCell.style.color = 'white';
        makeCell.classList.add('cell');
        document.getElementById('field').appendChild(makeCell);

        if (i >= 0 && i <= 7) {
            makeCell.setAttribute('id', 'r0' + 'c' + i);
        }else if (i >= 8 && i <= 15 ) {
            makeCell.setAttribute('id', 'r1' + 'c' + (i-8));
        }else if (i >= 16 && i <= 23 ) {
            makeCell.setAttribute('id', 'r2' + 'c' + (i-16));
        }else if (i >= 24 && i <= 31 ) {
            makeCell.setAttribute('id', 'r3' + 'c' + (i-24));
        }else if (i >= 32 && i <= 39 ) {
            makeCell.setAttribute('id', 'r4' + 'c' + (i-32));
        }else if (i >= 39 && i <= 47 ) {
            makeCell.setAttribute('id', 'r5' + 'c' + (i-40)); 
        }else if (i >= 46 && i <= 55 ) {
            makeCell.setAttribute('id', 'r6' + 'c' + (i-48));    
        }else if (i >= 47 && i <= 63 ) {
            makeCell.setAttribute('id', 'r7' + 'c' + (i-56));  
        }; 
  
};
attachEventListeners();
};
  
const attachEventListeners = () => {
        mineField = Array.from(document.querySelectorAll('#field > div'));
        mineField.forEach(function (cell){
        cell.addEventListener('click', function() {
        state.currentTile = cell;
        detectMine();
        })
        })  
        mineField.forEach(function (cell){
        cell.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            state.currentTile = cell;
            placeFlag();  
          });
       // 
       // detectMine();
        });
};

const init = () => {
    field = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ];
    makeField(64);
    timeToStringConverter(time);
    startClock();
    randomiseMines(numberOfMines, rowLength, columnLength);
    mineDisplay.innerText = `Mines: 10`
    minesNearBy = 0;
    state.minesInPlay = 10;
    state.revealedTiles = 0;
    goButton.style.display = 'none';
    let removeMsg = document.getElementById('lose');
    if (removeMsg) {
        removeMsg.remove();
    }
    if (winMsg){
        winMsg.remove();
    }
    
};


const randomiseMines = (numberOfMines, rowLength, columnLength) => {
    for (let i = 0; i < numberOfMines; i++) {
        let randomRow = Math.floor(Math.random() * rowLength);
        let randomColumn = Math.floor(Math.random() * columnLength);
        if (field[randomRow][randomColumn] !== 'm') {
            field[randomRow][randomColumn] = 'm';
        } else {
            i--;
            continue; 
        }
        for (let a = randomRow - 1; a <= randomRow + 1; a++) {
            for (let b = randomColumn - 1; b <= randomColumn + 1; b++) {
                if (a >= 0 && a < rowLength && b >= 0 && b < columnLength && (a !== randomRow || b !== randomColumn) && field[a] && field[a][b] !== 'm' && field[a][b] !== 'mnb') {
                    field[a][b] = 'mnb';
                }
            }
        }
    }
};    

const timeToStringConverter = (time) => {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    return `${formattedMM}:${formattedSS}`;
};
  
const startClock = () => {
    startTime = Date.now();
    setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = timeToStringConverter(elapsedTime);
    }, 1000);
};

function resetTime() {
    elapsedTime = 0;
    document.getElementById("timer").innerHTML = timeToStringConverter(elapsedTime);
  }
  
const detectMine = () => {
const id = state.currentTile.id;
    let row = parseFloat(id[1]); 
    let column = parseFloat(id[3]); 
    if(field[row][column] === 'm') {
    landedOnMine();
    } else if (field[row][column] !== 1) {
    minesInProximity(row, column);  
    state.revealedTiles += 1;
    }
};

const minesInProximity = (row, column) => {
    for (let i = row - 1; i <= row + 1; i++) {
        for (let c = column - 1; c <= column + 1; c++) {
            if (i === row && c === column) {
                continue; 
            }
            if (i >= 0 && i <= rowLength - 1 && c >= 0 && c <= columnLength - 1) {
                if (field[i][c] === 'm') {
                    minesNearBy++;    
                }else{
                recursion(row, column);
               }
            }
        }
    }
    displayMinesNearBy();
    render(row, column);
    checkWinner();
};    

const render = (row, column) => {
    field[row][column] = 1;
}

const displayMinesNearBy = () => { 
let cellDisplay = minesNearBy;
if(cellDisplay === 0 ){
    state.currentTile.style.innerText = ' ';
    
}else{
    state.currentTile.innerText = cellDisplay;
}
if(cellDisplay === 1){
    state.currentTile.style.color = 'blue';
    
    
}
if(cellDisplay === 2){
state.currentTile.style.color = 'green'; 
}
if(cellDisplay === 3){
    state.currentTile.style.color = 'red'; 
}
if(cellDisplay === 4){
    state.currentTile.style.color = 'dark blue'; 
}
if(cellDisplay === 5){
    state.currentTile.style.color = 'maroon'; 
}
if(cellDisplay === 4){
    state.currentTile.style.color = 'dark blue'; 
}
state.currentTile.style.fontSize = '1.5rem';
state.currentTile.style.alignItems = 'center';
state.currentTile.style.justifyContent = 'center';

state.currentTile.style.border= '0.2vmin solid darkgrey';
minesNearBy = null;
};


const landedOnMine = () => {
    state.currentTile.style.backgroundImage = "url('images/mine.png')";
    state.currentTile.style.backgroundSize = '100% 100%';
    state.currentTile.style.backgroundRepeat = 'no-repeat';
    state.currentTile.style.border = '0.2vmin solid darkgrey';
    const gameOverAlert = () => { 
        gameOver();
   }   
   setTimeout(gameOverAlert, 1000); 
};

const gameOver = () => {
    const toRemove = document.body.getElementsByClassName('cell');
       [...toRemove].forEach((e) =>
       e.remove());
       mineDisplay.innerText = `Mines: 0`
       goButton.style.display = 'inline';
       const loseMsg = document.createElement('h1');
       loseMsg.setAttribute('id', 'lose');
const field = document.getElementById('field');
loseMsg.innerText = 'BOOM!';
loseMsg.style.color = 'red';
loseMsg.style.fontSize = '25vh';
loseMsg.style.position = 'absolute';
loseMsg.style.alignItems = 'center';
loseMsg.style.justifyContent = 'center';
loseMsg.style.display = 'block';
document.getElementById('field').appendChild(loseMsg);


}

const mineCounterDisplay = (message) => {
    mineDisplay.innerText = `Mines:${state.minesInPlay}`;
}

const placeFlag = () => {
    const id = state.currentTile.id;
    let row = parseFloat(id[1]); 
    let column = parseFloat(id[3]);
    if (field[row][column] === 1){
    return;
    }else{
    state.currentTile.style.backgroundImage = "url('images/flag.png')";
    state.currentTile.style.backgroundSize = '100% 100%';
    state.currentTile.style.backgroundRepeat = 'no-repeat';
    state.currentTile.style.border = '0.2vmin solid darkgrey';
        if(field[row][column] === 'm') {
           mineDisplay.innerText = `Mines:${state.minesInPlay -= 1}`; 
        } 

}
checkWinner();
};

const checkWinner = () => {
    if (state.minesInPlay === 0 ) {
        gameWon();
    }
};


const recursion = (row, column) => {
    let recursionElement =  document.getElementById(`r${row}c${column}`);
    if (row < 0 || row >= field.length || column < 0 || column >= field[0].length || field[row][column] === 'm' || field[row][column] === 'mnb' ||field[row][column] === '1') {
        return;
    }
    if (recursionElement.style.border === '0.2vmin solid darkgrey'){
        return;
    }else{
    recursionElement.style.border = '0.2vmin solid darkgrey';
    state.revealedTiles += 1;
    recursion(row - 1, column - 1);
    recursion(row - 1, column);
    recursion(row - 1, column + 1);
    recursion(row, column - 1);
    recursion(row, column + 1);
    recursion(row + 1, column - 1);
    recursion(row + 1, column);
    recursion(row + 1, column + 1);
    }
};

const gameWon = () => {
 const toRemove = document.body.getElementsByClassName('cell');
       [...toRemove].forEach((e) =>
       e.remove());
mineDisplay.innerText = `Mines: 0`
goButton.style.display = 'inline';
winMsg = document.createElement('h1');
const field = document.getElementById('field');
winMsg.innerText = 'Well done!';
winMsg.style.color = 'red';
winMsg.style.fontSize = '25vh';
winMsg.style.position = 'absolute';
winMsg.style.alignItems = 'center';
winMsg.style.justifyContent = 'center';
document.getElementById('field').appendChild(winMsg);

};

