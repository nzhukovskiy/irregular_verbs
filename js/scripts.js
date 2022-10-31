const verbsLink = "https://api.npoint.io/2035457e2b96b215b654";
/*const audioFilePath = "https://raw.githubusercontent.com/thousandlemons/English-words-pronunciation-mp3-audio-download/master/data.json";
let audioLinks = [];
fetch(audioFilePath)
  .then(response => response.json())
  .then(data => audioLinks = data)*/
let verbsArray = [];
let alreadyUsedVerbs = [];
let inputFirstForm = document.querySelector(".answer-field-first");
let inputSecondForm = document.querySelector(".answer-field-second");
let inputThirdForm = document.querySelector(".answer-field-third");
let inputTranslateForm = document.querySelector(".answer-field-translation");
let taskField = document.querySelector(".task-field");
let checkResultsField = document.querySelector(".check-results-field");
let audioPlayer = document.querySelector(".task-audio");
let audioFirst = document.querySelector(".audio-player-0");
let audioSecond = document.querySelector(".audio-player-1");
let audioThird = document.querySelector(".audio-player-2");
let rndVerb;
let rndForm;
let str = "";
fetch(verbsLink)
.then (response => response.json())
.then(data => verbsArray = data)
.then (
    function() {
        GenerateTask();
        document.querySelector(".next-btn").addEventListener("click", function() {
            ClearForm();
            GenerateTask();
        });
        inputFirstForm.addEventListener("input", function() {
            CheckCorrectness(0, inputFirstForm, audioFirst);
        });
        inputSecondForm.addEventListener("input", function() {
            CheckCorrectness(1, inputSecondForm, audioSecond);
        });
        inputThirdForm.addEventListener("input", function() {
            CheckCorrectness(2, inputThirdForm, audioThird);
        });
        inputTranslateForm.addEventListener("input", function() {
            CheckCorrectness(3, inputTranslateForm);
        });
    }
)

function CheckCorrectness(i, form, customisableForm) {
    let userAns = form.value.trim().toLowerCase();
    if (userAns === verbsArray[rndVerb][i]) {
        form.style.backgroundColor = "#97daad";
        if (customisableForm != undefined) {
            customisableForm.style.display = "block";
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
            form.style.backgroundColor = "#97daad";
            if (customisableForm != undefined) {
                customisableForm.style.display = "block";
            }
        }
        else {
            form.style.backgroundColor = "white";
            if (customisableForm != undefined) {
                customisableForm.style.display = "none";
            }
        }
    }
    else {
        form.style.backgroundColor = "white";
        if (customisableForm != undefined) {
            customisableForm.style.display = "none";
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
    let isDefaultOk = true;
    /*fetch(`https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][0]}.mp3`)
    .then(response => {
        if (response.status == 200) {
            audioFirst.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][0]}.mp3`;
        }
        else {
            audioFirst.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-to_${verbsArray[rndVerb][0]}.mp3`;
        }
    })*/
    console.log(verbsArray[rndVerb][1].split("/")[0]);
    audioFirst.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][0].split("/")[0]}.mp3`;
    audioSecond.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][1].split("/")[0]}.mp3`;
    audioThird.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][2].split("/")[0]}.mp3`;
    //document.querySelector(`.audio-player-3`).src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-${verbsArray[rndVerb][3]}.mp3`;
    alreadyUsedVerbs.push(rndVerb);
    console.log(alreadyUsedVerbs);
    if (alreadyUsedVerbs.length === verbsArray.length) {
        alreadyUsedVerbs = [];
    }
}
function ClearForm() {
    inputFirstForm.value = "";
    inputSecondForm.value = "";
    inputThirdForm.value = "";
    inputTranslateForm.value = "";
    inputFirstForm.style.backgroundColor = "white";
    inputSecondForm.style.backgroundColor = "white";
    inputThirdForm.style.backgroundColor = "white";
    inputTranslateForm.style.backgroundColor = "white";
    audioFirst.style.display = "none";
    audioSecond.style.display = "none";
    audioThird.style.display = "none";
}
/*audioFirst.onerror = function() {
    audioFirst.src = `https://packs.shtooka.net/eng-wcp-us/mp3/En-us-to_${verbsArray[rndVerb][0]}.mp3`;
}*/