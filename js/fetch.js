const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = (response) => response.json();

fetch("https://KateParkin.github.io/supreme-couscous/data/configuration.json")
  .then(status)
  .then(json)
  .then(function (data) {
    var problemData = data;
    console.log(problemData);
    var origString = problemData.problems[0].data[0].statement;
    var ans = problemData.problems[0].data[0].answers;
    console.log(origString);
    console.log(ans);
  })
  
  .catch((error) => {
    console.log("Request failed", error);
  });
