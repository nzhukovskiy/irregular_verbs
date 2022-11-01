const verbsLink = "https://api.npoint.io/2035457e2b96b215b654";
let verbsArray = [];
let alreadyUsedVerbs = [];
let isAnsRight = [false, false, false, false];
let inputFirstForm = document.querySelector(".answer-field-first");
let inputSecondForm = document.querySelector(".answer-field-second");
let inputThirdForm = document.querySelector(".answer-field-third");
let inputTranslateForm = document.querySelector(".answer-field-translation");
let inputForms = [inputFirstForm, inputSecondForm, inputThirdForm, inputTranslateForm];
let taskField = document.querySelector(".task-field");
let checkResultsField = document.querySelector(".check-results-field");
let audioPlayer = document.querySelector(".task-audio");
let audioFirst = document.querySelector(".audio-player-0");
let audioSecond = document.querySelector(".audio-player-1");
let audioThird = document.querySelector(".audio-player-2");
let audioPlayers = [audioFirst, audioSecond, audioThird];
let iconFirst = document.querySelector(".icon-0");
let iconSecond = document.querySelector(".icon-1");
let iconThird = document.querySelector(".icon-2");
let iconTranslate = document.querySelector(".icon-3");
let icons = [iconFirst, iconSecond, iconThird, iconTranslate];
let cancelIcons = [document.querySelector(".cancel-icon-0"), document.querySelector(".cancel-icon-1"), 
document.querySelector(".cancel-icon-2"), document.querySelector(".cancel-icon-3")]
let rightAnswersBlocks = [document.querySelector(".right-answer-0"), document.querySelector(".right-answer-1"),
document.querySelector(".right-answer-2"), document.querySelector(".right-answer-3")]
let checkBtn =  document.querySelector(".check-btn");
let nextBtn =  document.querySelector(".next-btn");
let rndVerb;
let rndForm;
let str = "";
fetch(verbsLink)
.then (response => response.json())
.then(data => verbsArray = data)
.then (
    function() {
        GenerateTask();
        nextBtn.addEventListener("click", function() {
            ClearForm();
            GenerateTask();
        });
        checkBtn.addEventListener("click", function() {
            checkBtn.classList.remove("check-btn-show");
            CheckResult();
            nextBtn.classList.add("next-btn-show");
        });
        inputFirstForm.addEventListener("input", function() {
            CheckCorrectness(0, inputFirstForm, audioFirst, iconFirst);
        });
        inputSecondForm.addEventListener("input", function() {
            CheckCorrectness(1, inputSecondForm, audioSecond, iconSecond);
        });
        inputThirdForm.addEventListener("input", function() {
            CheckCorrectness(2, inputThirdForm, audioThird, iconThird);
        });
        inputTranslateForm.addEventListener("input", function() {
            CheckCorrectness(3, inputTranslateForm, undefined, iconTranslate);
        });
    }
)

function CheckCorrectness(i, form, customisableForm, icon) {
    let userAns = form.value.trim().toLowerCase();
    if (userAns === verbsArray[rndVerb][i]) {
        form.classList.add("correct-input");
        icon.classList.add("icon-show");
        isAnsRight[i] = true;
        if (customisableForm != undefined) {
            customisableForm.classList.add("answer-audio-show");
        }
    }
    else if (verbsArray[rndVerb][i].includes("/")) {
        let variants = verbsArray[rndVerb][i].split("/");
        let flag = false;
        variants.forEach( el => {
            if (!flag && userAns === el) {
                flag = true;
            }
        });
        if (flag) {
            form.classList.add("correct-input");
            icon.classList.add("icon-show");
            isAnsRight[i] = true;
            if (customisableForm != undefined) {
                customisableForm.classList.add("answer-audio-show");
            }
        }
        else {
            form.classList.remove("correct-input");
            icon.classList.remove("icon-show");
            isAnsRight[i] = false;
            if (customisableForm != undefined) {
                customisableForm.classList.remove("answer-audio-show");
            }
        }
    }
    else {
        icon.classList.remove("icon-show");
        form.classList.remove("correct-input");
        if (customisableForm != undefined) {
            customisableForm.classList.remove("answer-audio-show");
        }
    }
}
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
    if (rndForm != 3) {
        audioPlayer.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][rndForm]}.mp3`;
    }
    else {
        audioPlayer.src = "";
    }
    audioFirst.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][0].split("/")[0]}.mp3`;
    audioSecond.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][1].split("/")[0]}.mp3`;
    audioThird.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][2].split("/")[0]}.mp3`;
    alreadyUsedVerbs.push(rndVerb);
    if (alreadyUsedVerbs.length === verbsArray.length) {
        alreadyUsedVerbs = [];
    }
}
function ClearForm() {
    inputForms.forEach(form => {
        form.value = "";
        form.classList.remove("correct-input", "wrong-input");
        form.readOnly = false;
    });
    icons.forEach(icon => {
        icon.classList.remove("icon-show");
    });
    cancelIcons.forEach(icon => {
        icon.classList.remove("icon-show");
    });
    audioPlayers.forEach(el => {
        el.classList.remove("answer-audio-show");
    });
    rightAnswersBlocks.forEach(el => {
        el.classList.remove("right-answer-show");
    })
    isAnsRight = [false, false, false, false];
    checkBtn.classList.add("check-btn-show");
    nextBtn.classList.remove("next-btn-show");
}
function CheckResult() {
    inputForms.forEach(form => {
        form.readOnly = true;
    });
    isAnsRight.forEach((el, i) => {
        if (el == false) {
            inputForms[i].classList.add("wrong-input");
            cancelIcons[i].classList.add("icon-show");
            rightAnswersBlocks[i].textContent = verbsArray[rndVerb][i];
            rightAnswersBlocks[i].classList.add("right-answer-show");
            if (i !== 3) {
                audioPlayers[i].classList.add("answer-audio-show");
            }
        }
    });
}