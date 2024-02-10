/*----- state variables -----*/
const state = {
    currentTile: null, // tracks the selectored cell
    minesInPlay: null, // number of mines without flags, a descending number
    flags: null, // flags left to use, a decending number
    limbsLeft: null, // counts the number of limbs left( lives), is a decending mumber
};
let time = 10000000; // NEED TO MOVE THIS TO INIT
let startTime;
let elapsedTime;
/*-----Variables-----*/
const difficulty = {
    mild: 10,
    moderate: 40,
    severe: 99,
}
  
  /*----- cached elements  -----*/
  //const cells = d
 const goButton = document.getElementById('go'); 
 /*let difficultyButtons = document.querySelector('radio').value; // Radio buttons for difficulty 
 
 
 /*-----Opening actions----*/
 
  
 /*----- event listeners -----*/
 goButton.addEventListener('click', init);
  // loop through squares and listen for a click on each
 // squares.forEach(function(square) {
   // square.addEventListener('click', placeTile);
 // });
  
  
  // WE NEED THE EVENT LISTENER AKA EVENT HANDLER (function)??
  
  
  
  /*----- functions -----*/
  const makefield = (size) => {
    for(let i = 0; i < size; i++ ) {
       const makeCell = document.createElement('div');
       // makeCell.style.backgroundColor = 'light grey';
        makeCell.style.color = 'white';
        makeCell.innerText = i;
        makeCell.setAttribute('id', 'cell_' + i);
        document.getElementById('field').appendChild(makeCell);
    } 
   };
  
  const init = () => {
    makefield(64);
    timeToStringConverter(time);
    startClock();

    field = [
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0]
    ]
    }
  
  
  
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
  }
  
  const startClock = () => {
    startTime = Date.now();
    setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      document.getElementById("timer").innerHTML = timeToStringConverter(elapsedTime);
    }, 1000);
  }
  
  