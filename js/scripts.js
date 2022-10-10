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
            if (GetResult() === false) {
                return;
            }
            GenerateTask();
        });
    }
)
let alreadyUsedVerbs = [];
let inputFirstForm = document.querySelector(".answer-field-first");
let inputSecondForm = document.querySelector(".answer-field-second");
let inputThirdForm = document.querySelector(".answer-field-third");
let inputTranslateForm = document.querySelector(".answer-field-translation");
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
}
function GetResult() {
    let userAnswer = [inputFirstForm.value.trim(), inputSecondForm.value.trim(), inputThirdForm.value.trim(), inputTranslateForm.value.trim()];
    //let userAnswer = inputField.value.trim().split(/[\s,]+/);
    if (CheckResult(userAnswer, verbsArray[rndVerb]) === false) {
        return false;
    };
    inputFirstForm.value = "";
    inputSecondForm.value = "";
    inputThirdForm.value = "";
    inputTranslateForm.value = "";
}
function CheckResult(userAnswer, initialLine) {
    console.log(userAnswer);
    console.log(initialLine);
    let numberOfRight = 0;
    let wordsWithMistakes = [];
    if (userAnswer.length !== initialLine.length) {
        checkResultsField.textContent = "Введено неверное количество слов!";
        return false;
    }
    for (let i = 0; i < userAnswer.length; i++) {
        wordsWithMistakes.push(userAnswer[i]);
        if (userAnswer[i].toLowerCase() === initialLine[i]) {
            numberOfRight++;
            wordsWithMistakes[i] += "\n";
        }
        else if (initialLine[i].includes("/")) {
            let variants = initialLine[i].split("/");
            let flag = false;
            variants.forEach( el => {
                if (!flag && userAnswer[i].toLowerCase() === el) {
                    numberOfRight++;
                    wordsWithMistakes[i] += "\n";
                    flag = true;
                }
            });
            if (!flag) {
                wordsWithMistakes[i] += `=> ${initialLine[i]}\n`;
            }
            /*if (initialLine[i].includes(userAnswer[i].toLowerCase())) {
                numberOfRight++;
                wordsWithMistakes[i] += "\n";
            }*/
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