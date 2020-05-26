// this is the code that runs the game for a single question given in a string variable at the start

var origString = "What is your name ?";
var ans = "What is your name?";

//creates a map of the original question words to compare with in the game
var origMap = new Map();
origMap.set(0, origString);
console.log(origMap);

// converts question string to an array to randomise
var origArray = origString.split(" ");
console.log(origArray);

//default values at start of game
var tileValue = [];
var tileID = [];
var tilesTurned = 0;

// function to randomise original question word order
Array.prototype.scramble = function () {
  var i = this.length,
    j,
    tempValue;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    tempValue = this[j];
    this[j] = this[i];
    this[i] = tempValue;
  }
};

function start() {
    // change the colour and text of the start button
  var element = document.getElementById("start-button");
  element.innerHTML = "Restart";
  element.style.background = "white";
  element.style.border = "white";
  element.style.color = "#f21a1d";
  tilesTurned = 0;
  var output = "";
  // scramble the original question array and make the "tiles" (divs) for the game and invoke revealTile function
  origArray.scramble();
  for (var i = 0; i < origArray.length; i++) {
    output +=
      '<div class="redTile" id="tile_' +
      i +
      '" onclick="revealTile(this,\'' +
      origArray[i] +
      "')\"></div>";
  }
  //displays new game
  document.getElementById("memory-game").innerHTML = output;

// shows the scrambled array for testing the game
  console.log(origArray);

// gives a timed alert to the player of the randomised word order  
  var ansString = origArray.join(" ");
  setTimeout(function () {
    swal({
      title: ansString,
      timer: 3000,
    });
  }, 500);
}

// this function pushes the data into the div and  
// compares the played array with the original question array
function revealTile(tile, val) {
  var element = document.getElementById("start-button");
  var ansString = origArray.join(" ");
  if (element.innerHTML === "Help") {
    element.onclick = function () {
      swal({
        title: ansString,
        timer: 3000,
      });
    };
  }
// for the length of the question (origArray) the index value is pushed into the div and displayed in 
// a different colour on click
  if (tile.innerHTML == "" && tileValue.length < origArray.length) {
    tile.style.background = "#fff";
    tile.style.color = "#f21a1d";
    tile.innerHTML = val;

    if (tileValue.length < origArray.length) {
      tileValue.push(val);
      tileID.push(tile.id);
      tilesTurned += 1;
      console.log(tilesTurned);
      console.log(tileValue);

// when the number of values pushed to the divs (tileValue) length matches the scrambled question (origArray) 
// length the contents of those two arrays are compared as maps. 

      if (tileValue.length == origArray.length) {
        var newString = tileValue.join(" ");
        console.log(newString);
        var newMap = new Map();
        newMap.set(0, newString);
        console.log(newMap);
        compareMaps();

        function compareMaps() {
          var testVal;
          // compares map sizes
          if (origMap.size !== newMap.size) {
            return false;
          }
          for (var [key, val] of origMap) {
            testVal = newMap.get(key);
            // checks for matching values and undefined keys
            if (
              testVal !== val ||
              (testVal === undefined && !newMap.has(key))
            ) {
              console.log("not equal to");
              
              //Try again alert
              setTimeout(function () {
                var ele = document.getElementById("start-button");
                ele.innerHTML = "Try again";
                ele.style.background = "#f21a1d";
                ele.style.border = "#f21a1d";
                ele.style.color = "white";
                tileValue = [];
                tileID = [];
                swal({
                  title: "Try again",
                  icon: "error",
                });
              }, 500);
            } else {
              console.log("equal to");
              
              //success alert
                setTimeout(function () {
                var ele = document.getElementById("start-button");
                ele.innerHTML = "Next";
                ele.style.background = "#f21a1d";
                ele.style.color = "white";
                ele.style.border = "#f21a1d";
                tileValue = [];
                tileID = [];
                  swal({
                    title: "Congratulations!",
                    text: ans,
                    icon: "success",
                  });
                }, 500);
              }
            }
          }
        }
      }
    }
  }

