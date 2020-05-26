//code below gets the json data, but only for a single value of question and answer atm
// also if I don't run the code asynchronously then the origString is undefined in 29 

function playgame() {
  var requestURL =
    "https://KateParkin.github.io/supreme-couscous/data/configuration.json";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", requestURL);
  xhr.responseType = "text";
  xhr.send();

  xhr.onload = function () {
    var problemDataText = xhr.response;
    var problemData = JSON.parse(problemDataText);
    console.log(problemData);
    var origString = problemData.problems[0].data[0].statement;
    var ans = problemData.problems[0].data[0].answers;

    console.log(origString);
    console.log(ans);

    //the following is the same code as in the scramble-game.js file, but now using the extracted json data

    var origMap = new Map();
    origMap.set(0, origString);
    console.log(origMap);

    var origArray = origString.split(" ");
    console.log(origArray);

    var tileValue = [];
    var tileID = [];
    var tilesTurned = 0;

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
// the start function is wrapped in the play game function, so picks up the json data
// it's invoked at the bottom of the code
    function start() {
      var element = document.getElementById("start-button");
      element.innerHTML = "Restart";
      element.style.background = "white";
      element.style.border = "white";
      element.style.color = "#f21a1d";
      tilesTurned = 0;
      var output = "";
      origArray.scramble();
      for (var i = 0; i < origArray.length; i++) {
        output +=
          '<div class="redTile" id="tile_' +
          i +
          '" onclick="revealTile(this,\'' +
          origArray[i] +
          "')\"></div>";
      }
      document.getElementById("memory-game").innerHTML = output;

      console.log(origArray);

      var ansString = origArray.join(" ");
      setTimeout(function () {
        swal({
          title: ansString,
          timer: 3000,
        });
      }, 500);
    }
// then here it stops working as now it doesn't recognise the origArray 
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

          if (tileValue.length == origArray.length) {
            var newString = tileValue.join(" ");
            console.log(newString);
            var newMap = new Map();
            newMap.set(0, newString);
            console.log(newMap);
            compareMaps();

            function compareMaps() {
              var testVal;
              if (origMap.size !== newMap.size) {
                return false;
              }
              for (var [key, val] of origMap) {
                testVal = newMap.get(key);
                if (
                  testVal !== val ||
                  (testVal === undefined && !newMap.has(key))
                ) {
                  console.log("not equal to");
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
    start();
    revealTile();
  };
}
