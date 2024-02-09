/*----- state variables -----*/
const state = {
    currentTile: null; // tracks the selectored cell
    tilesUncovered: null; // counts the number of cells uncovered, ascending number
    minesInPlay: null; // number of mines without flags, a descending number
    flags: null; // flags left to use, a decending number
    limbsLeft: null; // counts the number of limbs left( lives), is a decending mumber
};
  
  /*----- cached elements  -----*/
  //const cells = d
  
  /*----- event listeners -----*/
  // loop through squares and listen for a click on each
  squares.forEach(function(square) {
    square.addEventListener('click', placeTile);
  });
  
  
  // WE NEED THE EVENT LISTENER AKA EVENT HANDLER (function)??
  
  
  
  /*----- functions -----*/

  
  
  
  
  
  

