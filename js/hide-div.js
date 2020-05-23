function hideDiv() {
  var elems = document.getElementsByClassName("hideable");
  for (var i = 0; i < elems.length; i++) {
    elems[i].classList.toggle("hidden");
  }
  var el = document.getElementById("start-button");
  el.classList.toggle("start");
}
