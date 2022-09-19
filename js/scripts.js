const verbsLink = "https://api.npoint.io/2035457e2b96b215b654";
let verbsArray = [];
let str = "";
fetch(verbsLink)
.then (response => response.json())
.then(data => verbsArray = data)
.then (
    function() {
        GenerateTask();
        document.querySelector(".answer-btn").addEventListener("click", function() {
            GetResult();
            GenerateTask();
        });
    }
)
let alreadyUsedVerbs = [];
let inputField = document.querySelector(".answer-field");
let taskField = document.querySelector(".task-field");
let checkResultsField = document.querySelector(".check-results-field");
let rndVerb;
let rndForm;
const formsNumber = 4;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function GenerateTask() {
    rndVerb = getRandomInt(verbsArray.length);
    while (alreadyUsedVerbs.includes(rndVerb)) {
        rndVerb = getRandomInt(verbsArray.length);
    }
    rndForm = getRandomInt(formsNumber);
    taskField.textContent = verbsArray[rndVerb][rndForm];
    alreadyUsedVerbs.push(rndVerb);
    if (alreadyUsedVerbs.length === verbsArray.length) {
        alreadyUsedVerbs = [];
    }
    console.log(verbsArray[rndVerb][rndForm]);
    console.log(inputField);
}
function GetResult() {
    let userAnswer = inputField.value.trim().split(/[\s,]+/);
    CheckResult(userAnswer, verbsArray[rndVerb]);
    inputField.value = "";
}
function CheckResult(userAnswer, initialLine) {
    console.log(userAnswer);
    console.log(initialLine);
    let numberOfRight = 0;
    let wordsWithMistakes = [];
    if (userAnswer.length !== initialLine.length) {
        checkResultsField.textContent = "Введено недостаточное количество слов!";
        return;
    }
    for (let i = 0; i < userAnswer.length; i++) {
        wordsWithMistakes.push(userAnswer[i]);
        if (userAnswer[i].toLowerCase() === initialLine[i]) {
            numberOfRight++;
            wordsWithMistakes[i] += "\n";
        }
        else {
            wordsWithMistakes[i] += `=> ${initialLine[i]}\n`;
        }
    }
    console.log(wordsWithMistakes);
    if (numberOfRight === initialLine.length) {
        checkResultsField.textContent = "Верно!";
    }
    else { 
        checkResultsField.textContent = `Неверно!\n ${arrayToString(wordsWithMistakes)}`;
    }
}
function arrayToString(array) {
    let resStr = "";
    array.forEach(element => {
        resStr += `${element} `;
    });
    return resStr;
}