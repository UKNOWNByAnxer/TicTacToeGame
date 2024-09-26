// script.js
const selectBox = document.querySelector(".select-box");
SelectXBtn = selectBox.querySelector(".playerX");
SelectOBtn = selectBox.querySelector(".playerO");
playBoard = document.querySelector(".play-board");
allBox = document.querySelectorAll("section span");
players = document.querySelector(".players");
resultBox = document.querySelector(".result-box");
wonText = resultBox.querySelector(".won-text p");
playAgainBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times"; // Icono para X
let playerOIcon = "far fa-circle"; // Icono para O
let playerSign = "X"; // Signo inicial del jugador
let currentPlayer = "player"; // Nueva variable para el control del turno
let runBot = true;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
    SelectXBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        playerSign = "X"; // El jugador X comienza
        currentPlayer = "player"; // Control de turno
    }
    SelectOBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        playerSign = "O"; // El jugador O comienza
        currentPlayer = "player"; // Control de turno
        players.classList.add("active"); // La animación se aplica con la clase `active`
    }

    playAgainBtn.onclick = () => {
        window.location.reload(); // Recargar la página para reiniciar el juego
    }
}

function clickedBox(element) {
    if (currentPlayer === "player") {
        if (playerSign === "O") {
            element.innerHTML = `<i class="${playerOIcon}"></i>`;
            element.setAttribute("id", "O");
        } else {
            element.innerHTML = `<i class="${playerXIcon}"></i>`;
            element.setAttribute("id", "X");
        }
        element.style.pointerEvents = "none";
        currentPlayer = "bot"; // Cambiar el turno al bot
        players.classList.toggle("active"); // Cambiar la animación

        if (!selectWinner()) { // Solo ejecutar bot si no hay ganador
            let randomDelayTime = (Math.floor(Math.random() * 1000) + 200).toFixed();
            setTimeout(() => {
                bot();
            }, randomDelayTime);
        }
    }
}

function bot() {
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    
    if (array.length > 0) {
        if (playerSign === "O") {
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
            allBox[randomBox].setAttribute("id", "X");
        } else {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
            allBox[randomBox].setAttribute("id", "O");
        }
        currentPlayer = "player"; // Cambiar el turno de nuevo al jugador
        players.classList.toggle("active"); // Cambiar la animación
        selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
}

function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkThreeClasses(val1, val2, val3, sign) {
    return getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign;
}

function selectWinner() {
    let winner = null;
    if (checkThreeClasses(1, 2, 3, "X") ||
        checkThreeClasses(4, 5, 6, "X") ||
        checkThreeClasses(7, 8, 9, "X") ||
        checkThreeClasses(1, 4, 7, "X") ||
        checkThreeClasses(2, 5, 8, "X") ||
        checkThreeClasses(3, 6, 9, "X") ||
        checkThreeClasses(1, 5, 9, "X") ||
        checkThreeClasses(3, 5, 7, "X")) {
        winner = "X";
    } else if (checkThreeClasses(1, 2, 3, "O") ||
               checkThreeClasses(4, 5, 6, "O") ||
               checkThreeClasses(7, 8, 9, "O") ||
               checkThreeClasses(1, 4, 7, "O") ||
               checkThreeClasses(2, 5, 8, "O") ||
               checkThreeClasses(3, 6, 9, "O") ||
               checkThreeClasses(1, 5, 9, "O") ||
               checkThreeClasses(3, 5, 7, "O")) {
        winner = "O";
    }

    if (winner) {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
        wonText.textContent = winner; // Mostrar el ganador en el div result-box
        return true;
    }
    return false;
}
