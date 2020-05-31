const CONFIG_ENDPOINT =
  "https://KateParkin.github.io/supreme-couscous/data/config.json";
let config = null;
let level = null;
let currentIssue = 0;

// this is the code that runs the game for a single question given in a string variable at the start
let origString;
let ans;

//creates a map of the original question words to compare with in the game
let origMap = new Map();

// converts question string to an array to randomise
let origArray;

//default values at start of game
let tileValue = [];
let tileID = [];
let tilesTurned = 0;

function selectLevel(aLevel) {
  hideDiv();
  level = aLevel;
}

function selectStatement(level, restart) {
  if (restart) {
    // if player clicks restart then reset the question
    currentIssue = currentIssue > 0 ? currentIssue - 1 : 0;
    tileValue = [];
  }
  // else move on to the next question
  let issue = config[level].data[currentIssue++];
  if (!issue) {
    // if player has run out of questions at one level move to next level
    level = moveUpLevel(level);
    if (level) {
      // at start of new level set question count to 0 then move onto next questions as before
      currentIssue = 0;
      issue = config[level].data[currentIssue++];
    } else {
      levelComplete(); // player has completed all levels so change content
    }
  }

  function levelComplete() {
    var el = document.getElementById("buttonDiv");
    el.parentNode.removeChild(el);
    var el1 = document.getElementById("memory-game");
    el1.innerHTML =
      "Come and visit one of our schools to practice your skills some more!";
    el1.classList.add("medium-text");
    var el3 = "";
    el3 += `<button class="button-level intermediate" onclick="window.location.href='https://KateParkin.github.io/supreme-couscous/index.html';">Contact us</button>`;
    document.getElementById("completed").innerHTML = el3;
    swal({
      title: "Well done!",
      text: "You have completed all the levels",
      icon: "success",
    });
  }

  origString = issue.statement;
  ans = issue.answers[0];
  origMap.set(0, origString);
  origArray = origString.split(" ");
  tilesTurned = 0;
}

function moveUpLevel(currentLevel) {
  if (currentLevel === "beginner") {
    return "intermediate";
  } else if (currentLevel === "intermediate") {
    return "advanced";
  }
  return null;
}

function start() {
  // change the colour and text of the start button
  var element = document.getElementById("start-button");
  selectStatement(level, element.innerHTML === "Restart");
  element.innerHTML = "Restart";
  element.style.background = "white";
  element.style.border = "white";
  element.style.color = "#f21a1d";

  var output = "";
  // scramble the original question array and make the "tiles" (divs) for the game and invoke revealTile function
  origArray.scramble();
  for (var i = 0; i < origArray.length; i++) {
    output += `<div class="redTile" id="tile_${i}" onclick="revealTile(this, '${origArray[i]}')"></div>`;
  }
  //displays new game
  document.getElementById("memory-game").innerHTML = output;

  // shows the scrambled array for testing the game
  console.log(origArray);

  // gives a timed alert to the player of the randomised word order. Time for alert depends on legth of question
  var ansString = origArray.join(" ");
  setTimeout(function () {
    if (origArray.length <= 6)
      swal({
        title: "3, 2, 1...",
        text: ansString,
        timer: 3000,
        buttons: false,
      });
  }, 500);
  setTimeout(function () {
    if (origArray.length > 6)
      swal({
        title: "5, 4, 3, 2, 1...",
        text: ansString,
        timer: 5000,
        buttons: false,
      });
  }, 500);
}

// this function pushes the data into the div and
// compares the played array with the original question array
function revealTile(tile, val) {
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
        compareMaps(origMap, newMap);
      }
    }
  }
}

function compareMaps(origMap, newMap) {
  var testVal;
  // compares map sizes
  if (origMap.size !== newMap.size) {
    return false;
  }
  for (var [key, val] of origMap) {
    testVal = newMap.get(key);
    // checks for matching values and undefined keys
    if (testVal !== val || (testVal === undefined && !newMap.has(key))) {
      console.log("not equal to");

      //Try again alert
      setTimeout(function () {
        var ele = document.getElementById("start-button");
        ele.innerHTML = "Restart";
        ele.style.background = "#f21a1d";
        ele.style.border = "#f21a1d";
        ele.style.color = "white";
        tileValue = [];
        tileID = [];
        swal({
          title: "Try again",
          icon: "error",
          buttons: {
            cancel: "OK",
          },
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

function getGameConfiguration() {
  return new Promise((resolve, reject) => {
    $.getJSON(CONFIG_ENDPOINT)
      .done((json) => resolve(json))
      .fail((jqxhr, textStatus, error) => {
        let msg = `Request Failed: ${textStatus}, ${error}`;
        console.log(msg);
        reject(msg);
      });
  });
}

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

function hideDiv() {
  var elems = document.getElementsByClassName("hideable");
  for (var i = 0; i < elems.length; i++) {
    elems[i].classList.toggle("hidden");
  }
  var el = document.getElementById("start-button");
  el.classList.toggle("start");
}

function main() {
  getGameConfiguration().then((response) => {
    config = response;
  });
}

main();
