function changeColour() {
  var element = document.getElementById("start-button");
  element.classList.toggle("startClicked");
    element.innerHTML = "Restart";
    element.onclick = function () {
      tileID = [];
      tileValue = [];
      tilesTurned = 0;
      start();
    };}