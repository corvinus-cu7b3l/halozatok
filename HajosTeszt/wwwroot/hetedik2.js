var kérdések;
var kérdésSorszám = 0;

window.onload = function () {
    letöltés();

};

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data))
};

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d
    kérdésMegjelenítés(0)
};

function kérdésMegjelenítés() { 
    let kerdes = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kerdes].questionText
    document.getElementById("válasz1").innerHTML = kérdések[kerdes].answer1
    document.getElementById("válasz2").innerHTML = kérdések[kerdes].answer2
    document.getElementById("válasz3").innerHTML = kérdések[kerdes].answer3

    if (kerdes.image)
    {
        document.getElementById("kép1").src = kerdes.image;
        document.getElementById("kép1").style.display="block"
    }
    else
    {
        document.getElementById("kép1").style.display = "none";
    }
    //document.getElementById("kép1").src = `https://szoft1.comeback.hu/hajo/${kérdések[kerdes].image}`
}

window.onload = init;

function vissza() {
    if (kérdésSorszám != 0) {
        kérdésSorszám = kérdésSorszám - 1;
        kérdésMegjelenítés(kérdésSorszám)
    } else {
        kérdésSorszám = 2; kérdésMegjelenítés(kérdésSorszám)
    }
    törlés()
};

function előre() {
    if (kérdésSorszám != 2) {
        kérdésSorszám = kérdésSorszám + 1;
        kérdésMegjelenítés(kérdésSorszám);
    } else {
        kérdésSorszám = 0; kérdésMegjelenítés(kérdésSorszám)
    }
    törlés()
};

function klikk() {
    if (this.innerHTML == "Vissza") {
        if (kérdésSorszám != 0) {
            kérdésSorszám = kérdésSorszám - 1;
            kérdésMegjelenítés(kérdésSorszám)
        } else {
            kérdésSorszám = 2; kérdésMegjelenítés(kérdésSorszám)
        }
    } else {
        if (kérdésSorszám != 2) {
            kérdésSorszám = kérdésSorszám + 1;
            kérdésMegjelenítés(kérdésSorszám);
        } else { kérdésSorszám = 0; kérdésMegjelenítés(kérdésSorszám) };
    };
}

function megoldás(jó) {
    if (kérdések[kérdésSorszám].correctAnswer == jó) {
        document.getElementById(`válasz${jó}`).classList.add("jó")
    } else {
        for (var i = 1; i < kérdések.length + 1; i++) {
            if (kérdések[kérdésSorszám].correctAnswer == i) {
                document.getElementById(`válasz${kérdések[kérdésSorszám].correctAnswer}`).classList.add("jó")
            } else {
                document.getElementById(`válasz${i}`).classList.add("rossz")
            }
        }
    }

}

function törlés() {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`válasz${i}`).classList.remove("rossz")
        document.getElementById(`válasz${i}`).classList.remove("jó")
    }
} 