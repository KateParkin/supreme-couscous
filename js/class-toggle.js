function changeColour() {
    var element = document.getElementById("button");element.classList.toggle("startClicked");
    if (element.innerHTML == "Start" || element.innerHTML =="Next" || element.innerHTML =="Try again"){
        element.innerHTML = "Restart"; element.onclick = function (){
        tileID = [];
        tileValue = [];
        tilesTurned = 0;
        start();}
        } else {
            element.innerHTML = "Start";}
}