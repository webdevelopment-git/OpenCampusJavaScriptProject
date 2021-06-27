document.addEventListener("DOMContentLoaded", function() {
    keepValuesUpdated();
});

let frequency = 5.0;
let probability = 0.5;
let boardHeight = 3;
let boardWidth = 3;
let cellSize = 32;

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
    });
    document.getElementById("probabilityInput").addEventListener("change", function(){
        probability = document.getElementById("probabilityInput").value;
        document.getElementById("probabilitySlider").value = probability;
    });
    document.getElementById("boardHeightSlider").addEventListener("change", function(){
        boardHeight = document.getElementById("boardHeightSlider").value;
        document.getElementById("boardHeightInput").value = boardHeight;
    });
    document.getElementById("boardHeightInput").addEventListener("change", function(){
        boardHeight = document.getElementById("boardHeightInput").value;
        document.getElementById("boardHeightSlider").value = boardHeight;
    });
    document.getElementById("boardWidthSlider").addEventListener("change", function(){
        boardWidth = document.getElementById("boardWidthSlider").value;
        document.getElementById("boardWidthInput").value = boardWidth;
    });
    document.getElementById("boardWidthInput").addEventListener("change", function(){
        boardWidth = document.getElementById("boardWidthInput").value;
        document.getElementById("boardWidthSlider").value = boardWidth;
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

/*
button startRun
button stopRun
button resetRun
button stepForward
button toggleRun
button stepBackward
*/