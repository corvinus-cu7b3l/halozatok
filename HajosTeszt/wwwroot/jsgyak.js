window.onload = function () {
    console.log("betöltődött");

    var fakt = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * fakt(n - 1)
        }
    }
    for (var sor = 0; sor < 10; sor++) {
        var newdiv = document.createElement("div");
        newdiv.classList.add("sor");
        document.getElementById("pascal").appendChild(newdiv);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var newdiv2 = document.createElement("div");
            newdiv2.classList.add("elem");
            newdiv2.innerText = fakt(sor) / (fakt(oszlop) * fakt(sor - oszlop));
            newdiv.appendChild(newdiv2);

            
        }
    }



}
