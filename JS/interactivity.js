document.addEventListener("DOMContentLoaded", function() {
    keepValuesUpdated();
    addControllListeners();
});

let simulationParameters = {
frequency: 5.0,
probability: 0.5,
boardHeight: 3,
boardWidth: 3,
cellSize: 50
};
let currentStep = 0;
let interval;
let isRunning = false;
let cellToggling = false;
let boardStates = [[[false, false, false], [false, false, false], [false, false, false]]];

function keepSingleValueUpdated(valuePair) {
    let inputTypes = ["Slider", "Input"];
    for (let i = 0; i < inputTypes.length; i++) {
        document.getElementById(valuePair[0] + inputTypes[i%2]).addEventListener("change", function(){
            simulationParameters[valuePair[0]] = document.getElementById(valuePair[0] + inputTypes[i%2]).value;
            document.getElementById(valuePair[0] + inputTypes[(i+1)%2]).value = simulationParameters[valuePair[0]];
            if (valuePair[1]) {
                initialiseBoard();
            }
        });
    }
}

function keepValuesUpdated() {
    let valuePairs = [["frequency", false], ["probability", true], ["boardHeight", true], ["boardWidth", true]];
    valuePairs.forEach(keepSingleValueUpdated);
    document.getElementById("cellSizeSlider").addEventListener("change", function(){
        simulationParameters["cellSize"] = document.getElementById("cellSizeSlider").value;
        document.getElementById("cellSizeInput").value = simulationParameters["cellSize"];
        let rowDivs = document.getElementsByClassName("row");
        for (let i = 0; i < rowDivs.length; i++) {
            rowDivs[i].style.height = simulationParameters["cellSize"] + "px";
            let rowWidth = simulationParameters["boardWidth"] * simulationParameters["cellSize"];
            rowDivs[i].style.width = rowWidth + "px";
        }
        let cellDivs = document.getElementsByClassName("cell");
        for (let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].style.width = simulationParameters["cellSize"] + "px";
            cellDivs[i].style.height = simulationParameters["cellSize"] + "px";
        }
    });
    document.getElementById("cellSizeInput").addEventListener("change", function(){
        simulationParameters["cellSize"] = document.getElementById("cellSizeInput").value;
        document.getElementById("cellSizeSlider").value = simulationParameters["cellSize"];
        let rowDivs = document.getElementsByClassName("row");
        for (let i = 0; i < rowDivs.length; i++) {
            rowDivs[i].style.height = simulationParameters["cellSize"] + "px";
            let rowWidth = simulationParameters["boardWidth"] * simulationParameters["cellSize"];
            rowDivs[i].style.width = rowWidth + "px";
        }
        let cellDivs = document.getElementsByClassName("cell");
        for (let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].style.width = simulationParameters["cellSize"] + "px";
            cellDivs[i].style.height = simulationParameters["cellSize"] + "px";
        }
    });
}

function addControllListeners() {
    document.getElementById("reinitialiseRun").addEventListener("click", function() {
        stopRun();
        initialiseBoard();
    });
    document.getElementById("stepForward").addEventListener("click", function() {
        stepForward();
    });
    document.getElementById("resetRun").addEventListener("click", function() {
        stopRun();
        updateShownBoard(0);
        currentStep = 0;
    });
    document.getElementById("stepBackward").addEventListener("click", function() {
        stepBackward();
    });
    document.getElementById("toggleRun").addEventListener("click", function() {
        toggleRun();
    });
    document.getElementById("clearBoard").addEventListener("click", function() {
        clearBoard();
    });
    document.getElementById("toggleCellToggling").addEventListener("click", function() {
        toggleCellToggling();
    });
    
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            document.getElementById(row + "|" + column).addEventListener("click", function() {
                if (cellToggling) {
                    boardStates[currentStep][row][column] = !boardStates[currentStep][row][column];
                    updateShownBoard(currentStep);
                }
            })
        }
    }
}

function initialiseBoard() {
    currentStep = 0;
    boardStates = [[[false, false, false], [false, false, false], [false, false, false]]];
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        let rowCells = [];
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            let randomNum = Math.floor(Math.random()*100)+1;
            rowCells[column] = (randomNum <= simulationParameters["probability"]*100);
        }
        boardStates[0][row] = rowCells;
    }
    document.getElementById("board").innerHTML="";
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        rowDiv.id = "row"+row;
        rowDiv.style.height = simulationParameters["cellSize"] + "px";
        let rowWidth = simulationParameters["boardWidth"] * simulationParameters["cellSize"];
        rowDiv.style.width = rowWidth + "px";
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            let cell = document.createElement("div");
            cell.className="cell";
            cell.id = row + "|" + column;
            cell.style.width = simulationParameters["cellSize"] + "px";
            cell.style.height = simulationParameters["cellSize"] + "px";
            cell.style.backgroundColor = (boardStates[0][row][column]) ? "#006600" : "#000000";
            rowDiv.appendChild(cell);
        }
        document.getElementById("board").appendChild(rowDiv);
    }
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            document.getElementById(row + "|" + column).addEventListener("click", function() {
                if (cellToggling) {
                    boardStates[currentStep][row][column] = !boardStates[currentStep][row][column];
                    updateShownBoard(currentStep);
                }
            })
        }
    }
}

function updateShownBoard(stepNum) {
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            let cell = document.getElementById(row + "|" + column);
            cell.style.backgroundColor = boardStates[stepNum][row][column] ? "#006600" : "#000000";
        }
    }
}

function stepForward() {
    if (boardStates[0] == undefined) {
        initialiseBoard();
    }
    boardStates[currentStep+1] = [];
    let nextBoard = boardStates[currentStep+1];
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        nextBoard[row] = [];
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            let neighbours = countNeighbours(row, column, currentStep);
            nextBoard[row][column] =
            (boardStates[currentStep][row][column] && neighbours == 2) || (neighbours == 3);
        }
    }
    currentStep++;
    boardStates[currentStep] = nextBoard;
    updateShownBoard(currentStep);
}

function stepBackward() {
    if (currentStep == 0) {
        alert("There are no previous states!");
    } else {
        currentStep--;
        updateShownBoard(currentStep);
    }
}

function countNeighbours(row, column, currentBoard) {
    let neighbours = 0;
    for (let checkRow = row-1; checkRow <= row+1; checkRow ++) {
        for (let checkColumn = column-1; checkColumn <= column+1; checkColumn++) {
            if (!(checkRow == row && checkColumn == column)) {
                neighbours += safeValueAt(checkRow, checkColumn, currentBoard);
            }
        }
    }
    return neighbours;
}

function safeValueAt(row, column, currentBoard) {
    return !(row < 0 || column < 0 || simulationParameters["boardHeight"] <= row
    || simulationParameters["boardWidth"] <= column) &&
    (boardStates[currentBoard][row][column]);
}

function toggleRun() {
    if (isRunning) {
        stopRun();
    } else {
        interval = setInterval(() => {
            stepForward();
        }, (1000/simulationParameters["frequency"]));
        document.getElementById("toggleRun").innerText = "Stop";
        isRunning = true;
        setVisibility("hidden");
    }
}

function stopRun() {
    clearInterval(interval);
    isRunning = false;
    document.getElementById("toggleRun").innerText = "Start";
    setVisibility("visible");
}

function setVisibility(visibility) {
    let controllsToBeHidden = document.getElementsByTagName("input");
    for (let i = 0; i < controllsToBeHidden.length; i++) {
        controllsToBeHidden[i].style.visibility = visibility;
    }
    let labelToBeHidden = document.getElementsByTagName("label");
    for (let i = 0; i < labelToBeHidden.length; i++) {
        labelToBeHidden[i].style.visibility = visibility;
    }
    document.getElementById("stepForward").style.visibility = visibility;
    document.getElementById("stepBackward").style.visibility = visibility;
}

function clearBoard() {
    boardStates = [];
    let nextBoard = [];
    for (let row = 0; row < simulationParameters["boardHeight"]; row++) {
        let rowCells = [];
        for (let column = 0; column < simulationParameters["boardWidth"]; column++) {
            rowCells[column] = false;
        }
        nextBoard[row] = rowCells;
    }
    currentStep = 0;
    boardStates[currentStep] = nextBoard;
    updateShownBoard(currentStep);
    stopRun();
}

function toggleCellToggling() {
    document.getElementById("toggleCellToggling").innerText = (cellToggling) ?
    "Enable cell toggling" : "Disable cell toggling";
    cellToggling = !cellToggling;
}