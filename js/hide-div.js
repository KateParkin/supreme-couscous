// this is a function that makes the level buttons disappear after being clicked 
// and the start button appear

function hideDiv() {
  var elems = document.getElementsByClassName("hideable");
  for (var i = 0; i < elems.length; i++) {
    elems[i].classList.toggle("hidden");
  }
  var el = document.getElementById("start-button");
  el.classList.toggle("start");
}
