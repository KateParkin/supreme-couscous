//the following three functions retrieve the json data for the question depending on the level
// selected by the user 
// but I don't then know how to put this data into the game

function getBeginner() {
    var requestURL = 'https://KateParkin.github.io/supreme-couscous/data/configuration.json';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onload = function () {
        var problemDataText = xhr.response;
        var problemData = JSON.parse(problemDataText);
        showProblems(problemData);
    }
    function showProblems(jsonObj) {
        var problems = jsonObj["problems"];
        var questionArray = [];
        for (let i = 0; i < problems.length; i++) {
            if (problems[i].level === "beginner") {
                var questionArray = problems[i].data;
                console.log(questionArray);
            }
        }
    }
}

function getIntermediate() {
    var requestURL = 'https://KateParkin.github.io/supreme-couscous/data/configuration.json';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onload = function () {
        var problemDataText = xhr.response;
        var problemData = JSON.parse(problemDataText);
        showProblems(problemData);
    }
    function showProblems(jsonObj) {
        var problems = jsonObj["problems"];
        var questionArray = [];
        for (let i = 0; i < problems.length; i++) {
            if (problems[i].level === "intermediate") {
                var questionArray = problems[i].data[i].statement;
                console.log(questionArray);
            }
        }
    }
}
function getAdvanced() {
    var requestURL = 'https://KateParkin.github.io/supreme-couscous/data/configuration.json';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onload = function () {
        var problemDataText = xhr.response;
        var problemData = JSON.parse(problemDataText);
        showProblems(problemData);
    }
    function showProblems(jsonObj) {
        var problems = jsonObj["problems"];
        var questionArray = [];
        for (let i = 0; i < problems.length; i++) {
            if (problems[i].level === "advanced") {
                var questionArray = problems[i].data[i].statement;
                console.log(questionArray);
            }
        }
    }
}