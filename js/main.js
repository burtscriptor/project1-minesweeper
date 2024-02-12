/*----- state variables -----*/
const state = {
    currentTile: null, // tracks the selectored cell
    minesInPlay: null, // number of mines without flags, a descending number
    flags: null, // flags left to use, a decending number
    limbsLeft: null, // counts the number of limbs left( lives), is a decending mumber
};

const field = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];


/*-----Variables-----*/

const rowLength = 8; // neesd to think about how to change these three when it comes to difficulyt selector
const columnLength = 8;
const numberOfMines = 10;

let time = 10000000; // need to move to init?
let startTime;    
let elapsedTime;
  
/*----- cached elements  -----*/
//const goButton = document.getElementById('go'); 
//const mineField = Array.from(document.querySelectorAll('#field > div'));

  
 /*----- event listeners -----*/
 //mineField.forEach(function (cell){
   // cell.addEventListener('click', detectMine);
 //});

 //document.querySelector('input[name="difficulty"]:checked')
  
  // WE NEED THE EVENT LISTENER AKA EVENT HANDLER (function)??
  
  
  
/*----- functions -----*/
const makeField = (size) => {
    for(let i = 0; i < size; i++ ) {
       const makeCell = document.createElement('div');
        makeCell.style.color = 'white';
        makeCell.classList.add('cell');
        document.getElementById('field').appendChild(makeCell);
        makeCell.innerText = i;
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
    const mineField = Array.from(document.querySelectorAll('#field > div'));
    mineField.forEach(function (cell){
        cell.addEventListener('click', function() {
        state.currentTile = cell;
        detectMine();
        });
     });  
};

const init = () => {
    makeField(64);
    timeToStringConverter(time);
    startClock();
    
    
};


const randomiseMines = (numberOfMines, rowLength, columnLength) => {
    for(let i = 0; i < numberOfMines; i++) {
      let randomRow =  Math.floor(Math.random() * rowLength)
      let randomColumn = Math.floor(Math.random() * columnLength)
      field[randomRow][randomColumn] !== 'm' ? field[randomRow][randomColumn] = 'm' : i--;
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
  
const detectMine = () => {
console.log(typeof state.currentTile);
const id = state.currentTile.id;
// assuming rXcX
// indexes: 0123
const row = id[1]; // first X
const column = id[3]; // second X

console.log(row, column);

if(field[row][column] === 'm') {
console.log('bang');
}
};