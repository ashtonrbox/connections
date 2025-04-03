
let selectedTiles = [];
let correctlyAnswered = 0;
let submitting = false;
let history = [];

let group1 = ["LINKIN PARK", "SMITHS", "EDITORS", "U2"];
let group2 = ["COKE", "JEEP", "WINNING LOTTO", "MIFFY LAMP"];
let group3 = ["1", "2", "3", "4"];
let group4 = ["HENRY", "ARIA", "TORTOISE", "TIME MACHINE"];

let group1Name = "MUM'S MOST LISTENED TO BANDS";
let group2Name = "THINGS MUM WANTS";
let group3Name = "BLANK";
let group4Name = "NOUNS ILLUSTATED BY MUM";

let cannotContinue = false;


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("start").addEventListener("click", function() {
        document.getElementById("splash").style.animation = "disappear 1 0.5s ease";

        setTimeout(() => {
            document.getElementById("splash").style.animation = "";
            document.getElementById("splash").style.display = "none"
            document.getElementById("welcome").style.display = "none"
        },490)
    })

    document.getElementById("shuffle").addEventListener("click", function () {
        shuffle()
    });

    document.getElementById("deselect").addEventListener("click", function () {
        document.querySelectorAll(".selectedTile").forEach(selectedTile => {
            selectedTile.classList.remove("selectedTile");
            selectedTiles = []
        })

        if (document.querySelectorAll(".selectedTile").length > 3) {
            document.getElementById("submit").removeAttribute("disabled");
        } else {
            document.getElementById("submit").setAttribute("disabled", "disabled");
        }

        if (document.querySelectorAll(".selectedTile").length > 0) {
            document.getElementById("deselect").removeAttribute("disabled");
        } else {
            document.getElementById("deselect").setAttribute("disabled", "disabled");
        }
    });

    document.getElementById("submit").addEventListener("click", function () {
        if (!submitting) {
            checkAnswer()
            setHistory()
            submitting = true;
        }
    });



    let tiles = document.querySelectorAll(".tile");

    tiles.forEach(tile => {
        let fullList = (group1.join(`", "`) + `", "` + group2.join(`", "`) + `", "` + group3.join(`", "`) + `", "` + group4.join(`", "`)).split(`", "`)

        if (fullList.length === 16) {

            for (let i = 0; i < 16; i++) {
                if (tiles[i].querySelector("p").textContent !== fullList[i]) {
                    cannotContinue = true;
                }
            }

            if (!cannotContinue) {

                shuffle()

            }

        }

    });



    tiles.forEach(tile => {
        tile.addEventListener("click", function () {

            if (tile.classList.contains("selectedTile")) {
                tile.classList.remove("selectedTile");
                selectedTiles = selectedTiles.filter(t => t !== tile.querySelector("p").textContent);
                console.log(selectedTiles)
            } else {
                if (selectedTiles.length > 3) {

                } else {

                    tile.classList.add("selectedTile");
                    selectedTiles.push(tile.querySelector("p").textContent);
                    console.log(selectedTiles)

                    if (selectedTiles.length === 3) {
                        console.log("FINAL")
                    } else if (selectedTiles.length === 4) {

                    }
                }
            }

            if (document.querySelectorAll(".selectedTile").length > 3) {
                document.getElementById("submit").removeAttribute("disabled");
            } else {
                document.getElementById("submit").setAttribute("disabled", "disabled");
            }

            if (document.querySelectorAll(".selectedTile").length > 0) {
                document.getElementById("deselect").removeAttribute("disabled");
            } else {
                document.getElementById("deselect").setAttribute("disabled", "disabled");
            }


        })
    })


})


function shuffle() {
    const container = document.getElementById("incomplete");
    const tiles = Array.from(container.children);
    let textContents = document.querySelectorAll(".tileText");
    textContents.forEach(text => text.style.opacity = "0");

    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    setTimeout(() => {
        textContents.forEach(text => text.style.opacity = "1");
    }, 100)

    tiles.forEach(tile => container.appendChild(tile));
}

function checkAnswer() {

    let compare = [0, 0, 0, 0]

    console.log(selectedTiles)
    console.log(group1)
    console.log(group2)
    console.log(group3)
    console.log(group4)

    // Group 1 Compare
    if (group1.includes(selectedTiles[0])) { compare[0]++ }
    if (group1.includes(selectedTiles[1])) { compare[0]++ }
    if (group1.includes(selectedTiles[2])) { compare[0]++ }
    if (group1.includes(selectedTiles[3])) { compare[0]++ }

    // Group 2 Compare
    if (group2.includes(selectedTiles[0])) { compare[1]++ }
    if (group2.includes(selectedTiles[1])) { compare[1]++ }
    if (group2.includes(selectedTiles[2])) { compare[1]++ }
    if (group2.includes(selectedTiles[3])) { compare[1]++ }

    // Group 3 Compare
    if (group3.includes(selectedTiles[0])) { compare[2]++ }
    if (group3.includes(selectedTiles[1])) { compare[2]++ }
    if (group3.includes(selectedTiles[2])) { compare[2]++ }
    if (group3.includes(selectedTiles[3])) { compare[2]++ }

    // Group 4 Compare
    if (group4.includes(selectedTiles[0])) { compare[3]++ }
    if (group4.includes(selectedTiles[1])) { compare[3]++ }
    if (group4.includes(selectedTiles[2])) { compare[3]++ }
    if (group4.includes(selectedTiles[3])) { compare[3]++ }

    console.log(compare)

    if (compare[0] === 3) {
        oneAway()
        submitting = false;
    } else if (compare[0] === 4) {
        console.log("Group 1 correct. " + group1)
        migrate("1")
        submitting = false;
    }

    if (compare[1] === 3) {
        oneAway()
        submitting = false;
    } else if (compare[1] === 4) {
        console.log("Group 2 correct. " + group2)
        migrate("2")
        submitting = false;
    }

    if (compare[2] === 3) {
        oneAway()
        submitting = false;
    } else if (compare[2] === 4) {
        console.log("Group 3 correct. " + group3)
        migrate("3")
        submitting = false;
    }

    if (compare[3] === 3) {
        oneAway()
        submitting = false;
    } else if (compare[3] === 4) {
        console.log("Group 4 correct. " + group4)
        migrate("4")
        submitting = false;
    }

    if (!compare.includes(3) || !compare.includes(4)) {
        setTimeout(() => {
            selectedTiles.forEach(item => document.getElementById(item).parentElement.style.animation = "wrong 1 0.5s ease")

            setTimeout(() => {
                selectedTiles.forEach(item => document.getElementById(item).parentElement.style.animation = "")
                document.getElementById("deselect").click()
                submitting = false;
            }, 500)
        }, 1000)
    }

}

function setHistory() {
    let tempHistory = ["0", "0", "0", "0"]

    console.log(selectedTiles[0])
    console.log(selectedTiles[1])
    console.log(selectedTiles[2])
    console.log(selectedTiles[3])

    if (group1.includes(selectedTiles[0])) {
        tempHistory[0] = "1"
    } else if (group2.includes(selectedTiles[0])) {
        tempHistory[0] = "2"
    } else if (group3.includes(selectedTiles[0])) {
        tempHistory[0] = "3"
    } else if (group4.includes(selectedTiles[0])) {
        tempHistory[0] = "4"
    }

    if (group1.includes(selectedTiles[1])) {
        tempHistory[1] = "1"
    } else if (group2.includes(selectedTiles[1])) {
        tempHistory[1] = "2"
    } else if (group3.includes(selectedTiles[1])) {
        tempHistory[1] = "3"
    } else if (group4.includes(selectedTiles[1])) {
        tempHistory[1] = "4"
    }

    if (group1.includes(selectedTiles[2])) {
        tempHistory[2] = "1"
    } else if (group2.includes(selectedTiles[2])) {
        tempHistory[2] = "2"
    } else if (group3.includes(selectedTiles[2])) {
        tempHistory[2] = "3"
    } else if (group4.includes(selectedTiles[2])) {
        tempHistory[2] = "4"
    }

    if (group1.includes(selectedTiles[3])) {
        tempHistory[3] = "1"
    } else if (group2.includes(selectedTiles[3])) {
        tempHistory[3] = "2"
    } else if (group3.includes(selectedTiles[3])) {
        tempHistory[3] = "3"
    } else if (group4.includes(selectedTiles[3])) {
        tempHistory[3] = "4"
    }

    console.log(tempHistory)
    history.push(tempHistory)

}

function oneAway() {
    setTimeout(() => {
        selectedTiles.forEach(item => document.getElementById(item).parentElement.style.animation = "wrong 1 0.5s ease")

        document.getElementById("oneAwayAlert").style.animation = "oneAwayAppear 1 3s ease";

        setTimeout(() => {
            selectedTiles.forEach(item => document.getElementById(item).parentElement.style.animation = "")
            document.getElementById("oneAwayAlert").style.animation = "";
            document.getElementById("deselect").click()
        }, 2000)
    }, 1000)
}

function migrate(group) {

    setTimeout(() => {
        if (group === "1") {
            effect("1")

            setTimeout(() => {

                group1.forEach(item => document.getElementById(item).parentElement.style.opacity = "0")

                setTimeout(() => {
                    group1.forEach(item => document.getElementById(item).parentElement.remove())

                    let group1completeList = document.createElement("div")
                    group1completeList.classList.add("completeList", "first")

                    let group1completeListTitle = document.createElement("p")
                    group1completeListTitle.classList.add("completeListTitle")
                    group1completeListTitle.textContent = group1Name

                    let group1completeListItems = document.createElement("p")
                    group1completeListItems.classList.add("completeListItems")
                    group1completeListItems.textContent = group1.join(", ")

                    group1completeList.appendChild(group1completeListTitle)
                    group1completeList.appendChild(group1completeListItems)
                    group1completeList.style.animation = "appear 1 1s ease"
                    document.getElementById("complete").appendChild(group1completeList)
                    document.getElementById("incomplete").style.marginTop = "10px";


                }, 200)
            }, 2000)
        }

        if (group === "2") {
            effect("2")

            setTimeout(() => {

                group2.forEach(item => document.getElementById(item).parentElement.style.opacity = "0")

                setTimeout(() => {
                    group2.forEach(item => document.getElementById(item).parentElement.remove())

                    let group2completeList = document.createElement("div")
                    group2completeList.classList.add("completeList", "second")

                    let group2completeListTitle = document.createElement("p")
                    group2completeListTitle.classList.add("completeListTitle")
                    group2completeListTitle.textContent = group2Name

                    let group2completeListItems = document.createElement("p")
                    group2completeListItems.classList.add("completeListItems")
                    group2completeListItems.textContent = group2.join(", ")

                    group2completeList.appendChild(group2completeListTitle)
                    group2completeList.appendChild(group2completeListItems)
                    group2completeList.style.animation = "appear 1 1s ease"
                    document.getElementById("complete").appendChild(group2completeList)
                    document.getElementById("incomplete").style.marginTop = "10px";



                }, 200)
            }, 2000)
        }

        if (group === "3") {
            effect("3")

            setTimeout(() => {

                group3.forEach(item => document.getElementById(item).parentElement.style.opacity = "0")

                setTimeout(() => {
                    group3.forEach(item => document.getElementById(item).parentElement.remove())

                    let group3completeList = document.createElement("div")
                    group3completeList.classList.add("completeList", "third")

                    let group3completeListTitle = document.createElement("p")
                    group3completeListTitle.classList.add("completeListTitle")
                    group3completeListTitle.textContent = group3Name

                    let group3completeListItems = document.createElement("p")
                    group3completeListItems.classList.add("completeListItems")
                    group3completeListItems.textContent = group3.join(", ")

                    group3completeList.appendChild(group3completeListTitle)
                    group3completeList.appendChild(group3completeListItems)
                    group3completeList.style.animation = "appear 1 1s ease"
                    document.getElementById("complete").appendChild(group3completeList)
                    document.getElementById("incomplete").style.marginTop = "10px";

                }, 200)
            }, 2000)
        }

        if (group === "4") {
            effect("4")

            setTimeout(() => {

                group4.forEach(item => document.getElementById(item).parentElement.style.opacity = "0")

                setTimeout(() => {
                    group4.forEach(item => document.getElementById(item).parentElement.remove())

                    let group4completeList = document.createElement("div")
                    group4completeList.classList.add("completeList", "fourth")

                    let group4completeListTitle = document.createElement("p")
                    group4completeListTitle.classList.add("completeListTitle")
                    group4completeListTitle.textContent = group4Name

                    let group4completeListItems = document.createElement("p")
                    group4completeListItems.classList.add("completeListItems")
                    group4completeListItems.textContent = group4.join(", ")

                    group4completeList.appendChild(group4completeListTitle)
                    group4completeList.appendChild(group4completeListItems)
                    group4completeList.style.animation = "appear 1 1s ease"
                    document.getElementById("complete").appendChild(group4completeList)
                    document.getElementById("incomplete").style.marginTop = "10px";
                }, 200)
            }, 2000)
        }

        selectedTiles = []
        correctlyAnswered++;

        if (correctlyAnswered === 1) {
            document.getElementById("incomplete").style.height = "75%";
        } else if (correctlyAnswered === 2) {
            document.getElementById("incomplete").style.height = "50%";
        } else if (correctlyAnswered === 3) {
            document.getElementById("incomplete").style.height = "25%";
        } else if (correctlyAnswered === 4) {
            document.getElementById("incomplete").style.height = "0%";

            document.getElementById("submit").setAttribute("disabled", "disabled");
            document.getElementById("deselect").setAttribute("disabled", "disabled");

            console.log(history)

            history.forEach(row => {
                let rowDiv = document.createElement("div")
                rowDiv.classList.add("historyRow");

                row.forEach(guess => {
                    let guessDiv = document.createElement("div")
                    guessDiv.classList.add("guess");
                    guessDiv.classList.add("guess" + guess);

                    rowDiv.appendChild(guessDiv)
                })

                document.getElementById("historyPlacement").appendChild(rowDiv)
            })

            setTimeout(() => {
                document.getElementById("splash").style.animation = "simpleAppear 1 0.5s ease";
                document.getElementById("splash").style.display = "flex";
                document.getElementById("finished").style.display = "flex";

                setTimeout(() => { 
                    document.querySelectorAll(".remove").forEach(removeButton => { 
                        removeButton.style.display = "block"; 
                        removeButton.style.animation = "simpleAppear 1 0.3s ease";  
                    }) 
                }, 200)


                
let url = new URL(document.location).href;

if (url.split("?")[1]) {
    let [key, value] = url.split("?")[1].split("=")

    if (key === "w") {

        console.log("Wordle data found: " + value)

        document.querySelectorAll(".changeHREF").forEach(href => {
            href.setAttribute("href", `https://ashtonrbox.github.io/hub?w=${value}&c=${history.length}`)
        })

    } else {
        document.querySelectorAll(".changeHREF").forEach(href => {
            href.setAttribute("href", `https://ashtonrbox.github.io/hub?c=${history.length}`)
        })
    }
} else {
    document.querySelectorAll(".changeHREF").forEach(href => {
        href.setAttribute("href", `https://ashtonrbox.github.io/hub?c=${history.length}`)
    })
}
            }, 4500)

            if (document.querySelectorAll(".selectedTile").length > 3) {
                document.getElementById("submit").removeAttribute("disabled");
            } else {
                document.getElementById("submit").setAttribute("disabled", "disabled");
            }

            if (document.querySelectorAll(".selectedTile").length > 0) {
                document.getElementById("deselect").removeAttribute("disabled");
            } else {
                document.getElementById("deselect").setAttribute("disabled", "disabled");
            }
        }

    }, 400)
}

function effect(effectGroup) {
    if (effectGroup === "1") {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                document.getElementById(group1[i]).parentElement.style.animation = "jump 0.5s 1s ease";
                document.getElementById(group1[i]).parentElement.classList.add("goneTile")
            }, 50 + (i * 100));
        }
    } else if (effectGroup === "2") {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                document.getElementById(group2[i]).parentElement.style.animation = "jump 0.5s 1s ease"
                document.getElementById(group2[i]).parentElement.classList.add("goneTile")
            }, 50 + (i * 100));
        }
    } else if (effectGroup === "3") {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                document.getElementById(group3[i]).parentElement.style.animation = "jump 0.5s 1s ease"
                document.getElementById(group3[i]).parentElement.classList.add("goneTile")
            }, 50 + (i * 100));
        }
    } else if (effectGroup === "4") {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                document.getElementById(group4[i]).parentElement.style.animation = "jump 0.5s 1s ease"
                document.getElementById(group4[i]).parentElement.classList.add("goneTile")
            }, 50 + (i * 100));
        }
    }
}
