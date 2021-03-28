var kérdés;
var KérdésSorszáma = 0;

function letöltés() {
    fetch('question.json')
        .then(response => response.json())
        .then(data => letöltésKész(data));
}

function letöltésKész(d) {
    console.log("Letöltés sikeres")
    console.log(d)
    kérdés = d
    kérdésMegjelenítés(0);
}

var kérdésMegjelenítés = function (kérdésSzáma) {

    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let kép = document.getElementById("kép1");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");

    kérdés_szöveg.innerHTML = kérdés[kérdésSzáma].questionText

    if (kérdés[kérdésSzáma].image != "") {
        kép.src = "https://szoft1.comeback.hu/hajo/" + kérdés[kérdésSzáma].image;
    }
    else {
        kép.src = "";
    }

    válasz1.innerText = kérdés[kérdésSzáma].answer1
    válasz2.innerText = kérdés[kérdésSzáma].answer2
    válasz3.innerText = kérdés[kérdésSzáma].answer3
}


window.onload = () => {

    letöltés();

    document.getElementById("vissza").onclick = () => {

        document.getElementById("válasz1").style.backgroundColor = "lightblue";
        document.getElementById("válasz2").style.backgroundColor = "lightblue";
        document.getElementById("válasz3").style.backgroundColor = "lightblue";

        document.getElementById("válasz1").style.pointerEvents = 'auto';
        document.getElementById("válasz2").style.pointerEvents = 'auto';
        document.getElementById("válasz3").style.pointerEvents = 'auto';

        if (KérdésSorszáma == 0) {
            KérdésSorszáma = kérdés.length - 1
            kérdésMegjelenítés(KérdésSorszáma);
        }
        else {
            kérdésMegjelenítés(--KérdésSorszáma);
        }

    }

    document.getElementById("előre").onclick = () => {

        document.getElementById("válasz1").style.backgroundColor = "lightblue";
        document.getElementById("válasz2").style.backgroundColor = "lightblue";
        document.getElementById("válasz3").style.backgroundColor = "lightblue";

        document.getElementById("válasz1").style.pointerEvents = 'auto';
        document.getElementById("válasz2").style.pointerEvents = 'auto';
        document.getElementById("válasz3").style.pointerEvents = 'auto';

        if (KérdésSorszáma == kérdés.length - 1) {
            KérdésSorszáma = 0;
            kérdésMegjelenítés(KérdésSorszáma);
        }
        else {
            kérdésMegjelenítés(++KérdésSorszáma);
        }

    }


    document.getElementById("válasz1").onclick = () => {

        if (kérdés[KérdésSorszáma].correctAnswer == 1) {
            document.getElementById("válasz1").style.background = "green";
        }
        else {
            document.getElementById("válasz1").style.background = "lightcoral";
            document.getElementById("válasz" + kérdés[KérdésSorszáma].correctAnswer).style.background = "green";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';

    }

    document.getElementById("válasz2").onclick = () => {

        if (kérdés[KérdésSorszáma].correctAnswer == 2) {
            document.getElementById("válasz2").style.background = "green";
        }
        else {
            document.getElementById("válasz2").style.background = "lightcoral";
            document.getElementById("válasz" + kérdés[KérdésSorszáma].correctAnswer).style.background = "green";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';
    }

    document.getElementById("válasz3").onclick = () => {

        if (kérdés[KérdésSorszáma].correctAnswer == 3) {
            document.getElementById("válasz3").style.background = "green";
        }
        else {
            document.getElementById("válasz3").style.background = "lightcoral";
            document.getElementById("válasz" + kérdés[KérdésSorszáma].correctAnswer).style.background = "green";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';
    }
}
