var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }        
    }
    
        //kérdések száma
        fetch("questions/count")
            .then(result => result.text())
            .then(n => { numberOfQuestions = parseInt(n) })
        //előre-hátra gombok
    document.getElementById("előre_gomb").addEventListener("click", előre);
    document.getElementById("vissza_gomb").addEventListener("click", vissza);

    //mentett állapot beolvasása
    if (localStorage.getItem("hotlist")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion=parseInt(localStorage.getItem("displayedQuestion"))
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion=parseInt(localStorage.getItem("nextQuestion"))
    }

    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i)
            nextQuestion++;
        }
    }
    else {console.info="local storage-ból beolvasott kérdésekkel dolgozunk"
            kérdésMegjelenítés();
        }
    }
};

function kérdésMegjelenítés() {
    let kerdes = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kerdes].questionText
    document.getElementById("válasz1").innerHTML = kérdések[kerdes].answer1
    document.getElementById("válasz2").innerHTML = kérdések[kerdes].answer2
    document.getElementById("válasz3").innerHTML = kérdések[kerdes].answer3

    if (kerdes.image) {
        document.getElementById("kép1").src = kerdes.image;
        document.getElementById("kép1").style.display = "block"
    }
    else {
        document.getElementById("kép1").style.display = "none";
    }

    for (var i = 1; i <=3; i++) 
        document.getElementById("válasz" + n).classList.remove("jó", "rossz")
        document.getElementById("válaszok").style.pointerEvents = "Auto";
    

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotList ${destination.helyére}`);
            if (displayedQuestion===undefined&&destination==0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
}
    function előre() {
        clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
}

    function választás(n) {
        let kerdes = hotList[displayedQuestion].question;
        if (n === kerdes.correctAnswer) {
            document.getElementById("válasz" + n).classList.add("jó")
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers === 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++;
                
            }
        }
        else {
            document.getElementById("válasz" + n).classList.add("rossz")
            document.getElementById("válasz" + kerdes.correctAnswer).classList.add("jó")
            hotList[displayedQuestion].goodAnswers = 0;
        }

        document.getElementById("válaszok").style.pointerEvents = "none";
        timerHandler = setTimeout(előre, 3000);

        localStorage.setItem("hotlist", JSON.stringify(hotList));
        localStorage.setItem("displayedQuestion", JSON.stringify(displayedQuestion));
        localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion));
    }
}