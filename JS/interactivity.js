document.addEventListener("DOMContentLoaded", function() {
    keepValuesUpdated();
    addControllListeners();
});

let frequency = 5.0;
let probability = 0.5;
let boardHeight = 3;
let boardWidth = 3;
let cellSize = 32;

let boardStates = [];

function keepValuesUpdated() {
    document.getElementById("frequencySlider").addEventListener("change", function(){
        frequency = document.getElementById("frequencySlider").value;
        document.getElementById("frequencyInput").value = frequency;
    });
    document.getElementById("frequencyInput").addEventListener("change", function(){
        frequency = document.getElementById("frequencyInput").value;
        document.getElementById("frequencySlider").value = frequency;
    });
    document.getElementById("probabilitySlider").addEventListener("change", function(){
        probability = document.getElementById("probabilitySlider").value;
        document.getElementById("probabilityInput").value = probability;
        initialiseBoard();
    });
    document.getElementById("probabilityInput").addEventListener("change", function(){
        probability = document.getElementById("probabilityInput").value;
        document.getElementById("probabilitySlider").value = probability;
        initialiseBoard();
    });
    document.getElementById("boardHeightSlider").addEventListener("change", function(){
        boardHeight = document.getElementById("boardHeightSlider").value;
        document.getElementById("boardHeightInput").value = boardHeight;
        initialiseBoard();
    });
    document.getElementById("boardHeightInput").addEventListener("change", function(){
        boardHeight = document.getElementById("boardHeightInput").value;
        document.getElementById("boardHeightSlider").value = boardHeight;
        initialiseBoard();
    });
    document.getElementById("boardWidthSlider").addEventListener("change", function(){
        boardWidth = document.getElementById("boardWidthSlider").value;
        document.getElementById("boardWidthInput").value = boardWidth;
        initialiseBoard();
    });
    document.getElementById("boardWidthInput").addEventListener("change", function(){
        boardWidth = document.getElementById("boardWidthInput").value;
        document.getElementById("boardWidthSlider").value = boardWidth;
        initialiseBoard();
    });
    document.getElementById("cellSizeSlider").addEventListener("change", function(){
        cellSize = document.getElementById("cellSizeSlider").value;
        document.getElementById("cellSizeInput").value = cellSize;
        let cellDivs = document.getElementsByClassName("cell");
        for (let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].style.width = cellSize + "px";
            cellDivs[i].style.height = cellSize + "px";
        }
    });
    document.getElementById("cellSizeInput").addEventListener("change", function(){
        cellSize = document.getElementById("cellSizeInput").value;
        document.getElementById("cellSizeSlider").value = cellSize;
        let cellDivs = document.getElementsByClassName("cell");
        for (let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].style.width = cellSize + "px";
            cellDivs[i].style.height = cellSize + "px";
        }
    });
}

function addControllListeners() {
    document.getElementById("startRun").addEventListener("click", function() {
        console.log("Start run");
        initialiseBoard();
    });
    document.getElementById("stopRun").addEventListener("click", function() {
        console.log("Stop run");
    });
    document.getElementById("resetRun").addEventListener("click", function() {
        console.log("Reset run");
        initialiseBoard();
    });
    document.getElementById("stepForward").addEventListener("click", function() {
        console.log("One step forward");
    });
    document.getElementById("stepBackward").addEventListener("click", function() {
        console.log("One step backward");
    });
}

function initialiseBoard() {
    boardStates[0] = [];
    for (let row = 0; row < boardHeight; row++) {
        let rowCells = [];
        for (let column = 0; column < boardWidth; column++) {
            let randomNum = Math.floor(Math.random()*100)+1;
            rowCells[column] = (randomNum <= probability*100);
        }
        boardStates[0][row] = rowCells;
    }
    document.getElementById("board").innerHTML="";
    for (let row = 0; row < boardHeight; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        rowDiv.id = "row"+row;
        for (let column = 0; column < boardWidth; column++) {
            let cell = document.createElement("div");
            cell.className="cell";
            cell.id=row + "|" + column;
            if (boardStates[0][row][column]) {
                cell.style.backgroundColor = "#00AA00";
            } else {
                cell.style.backgroundColor = "#000000";
            }
            rowDiv.appendChild(cell);
        }
        document.getElementById("board").appendChild(rowDiv);
    }
    console.log(boardStates);
}