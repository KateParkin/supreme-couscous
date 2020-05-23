function writeToDocument(){
    var section = document.querySelector("section");

    var requestURL = 'https://junokili.github.io/school-for-the-poor/data/configuration.json';
    var xhr = new XMLHttpRequest();


xhr.open('GET', requestURL);
xhr.responseType = 'text';
xhr.send();

xhr.onload = function(){
    var problemDataText = xhr.response;
    var problemData = JSON.parse(problemDataText);
    showProblems(problemData);
}
    function showProblems(jsonObj){
        var problems = jsonObj["problems"];

        for(let i = 0; i < problems.length; i++){
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = problems[i].level;
        myPara1.textContent = "Question: " + problems[i].statement;
        myPara2.textContent = "Answers: ";

        var answerArray = problems[i].answers;
        for(let j = 0; j < answerArray.length; j++){
            const listItem = document.createElement('li');
            listItem.textContent = answerArray[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
      }
    }
}