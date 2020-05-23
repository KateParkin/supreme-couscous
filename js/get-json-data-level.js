function getBeginner() {
    var requestURL = 'https://junokili.github.io/school-for-the-poor/data/configuration.json';
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
        var origString = "";
        for (let i = 0; i < problems.length; i++) {
            if (problems[i].level === "beginner") {
                var origString = problems[i].statement;
                console.log(origString);
            }
        }
    }
}

function getIntermediate() {
    var requestURL = 'https://junokili.github.io/school-for-the-poor/data/configuration.json';
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
        var origString = "";
        for (let i = 0; i < problems.length; i++) {
            if (problems[i].level === "intermediate") {
                var origString = problems[i].statement;
                console.log(origString);
            }
        }
    }
}
function getAdvanced() {
    var requestURL = 'https://junokili.github.io/school-for-the-poor/data/configuration.json';
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
        var origString = "";
        for (let i = 0; i < problems.length; i++) {
            if (problems[i].level === "advanced") {
                var origString = problems[i].statement;
                console.log(origString);
            }
        }
    }
}