        /**************************** TO DO ********************************/

        // make start and end tiles one-click - drag and drop into table? 
        // implement visualisation for algorithm - step-by-step visualisation

        /*******************************************************************/


// global vars 
var lastClicked, startPoint, endPoint = null;
var isDown = false;

// specify row and column for grid
var grid = clickableGrid(26, 45, function(ele, row, col, cell) {
    //console.log("clicked on element:", ele);
    //console.log("clicked on row:", row);
    //console.log("clicked on col:", col);

    if (isDown)
    {
        // 'wall' element is filled
        ele.className = 'wall';
    }

    if (startPoint != null && endPoint == null)
    {
        // get the ending point in format NUMBER + LETTER
        endPoint = document.getElementsByClassName('wall')[0];
        let endPointId = endPoint.id;

        // end point has been clicked, set its class to 'end'
        document.getElementById(endPointId).className = 'end';
        
    } else if (!startPoint) {
        // get the starting point in format NUMBER + LETTER
        startPoint = document.getElementsByClassName('wall')[0];
        let startPointId = startPoint.id;

        // start point has been clicked, set its class to 'start'
        document.getElementById(startPointId).className = 'start';
    }
    else
    // stores the new box clicked element
    lastClicked = ele;
});

document.body.appendChild(grid);

function clickableGrid(rows, cols, callback) {
    // tables work best for this kind of situation (so far)
    var grid = document.createElement('table');
    var idAlphabetTemp = "abcdefghijklmnopqrstuvwxyz";
    grid.className = 'grid';
    // create grid of elements, tr = rows...
    for (var r = 0; r < rows; r++) {
        var tr = grid.appendChild(document.createElement('tr'));

        // ...td = columns
        for (var c = 0; c < cols; c++) {
            var cell = tr.appendChild(document.createElement('td'));
            // index purposes
            var str1 = idAlphabetTemp[r];
            // number + letter to determine element position
            cell.id = c + str1;

            // set text to blank so it's just an empty clickable box - here to be used later if need be
            cell.innerHTML = "";

            // event listeners to determine is mouse is up or down, storing in var isDown
            cell.addEventListener('mousedown', function() {
                console.log("mouse down");
                isDown = true;
            }, true);
            cell.addEventListener('mouseup', function() {
                console.log("mouse up");
                isDown = false;
            }, true);

            if (isDown)
            {

            }
            // add grid (table) click event
            cell.addEventListener('mousemove', (function(ele, r, c, cell) {
                return function() {
                callback(ele, r, c, cell);
                }
            })(cell, r, c, cell), true);
        }
    }

    return grid;
}

// create graph for the grid - %%automateThis
var gridGraph = {};

var gridRows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var gridColumns = [00, 01, 02, 03, 04, 05, 06, 07, 08, 09   , 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44];

    
// create an array of zeros
function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

var gridArray = zeros([gridRows.length, gridColumns.length]);

for (let i = 0; i < gridRows.length; i++)
{
    for (let j = 0; j < gridColumns.length; j++)
    {
        gridArray[i][j] = gridColumns[j] + gridRows[i];
    }
}     

// create the grid object containing all the grid tiles around it, at a distance of 1 from one another
for (let i = 0; i < gridRows.length; i++) // row
{
    for (let j = 0; j < gridColumns.length; j++) // column
    {
        // boundary conditions
        // top-side
        if (i == 0)
        {
            // LHS-top-corner
            if (j == 0)
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i + 1][j]] : 1,
                    [gridArray[i][j + 1]]: 1
                }
            }   
            // RHS-top-corner
            else if (j == gridColumns.length - 1)
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i + 1][j]] : 1,
                    [gridArray[i][j - 1]]: 1
                }
            }
            // top-side fill
            else
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i][j - 1]] : 1,
                    [gridArray[i][j + 1]] : 1,
                    [gridArray[i + 1][j]] : 1
                }
            }
        }
        // bottom-side
        else if (i == gridRows.length - 1)
        {
            // LHS-bottom-corner
            if (j == 0)
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i - 1][j]] : 1,
                    [gridArray[i][j + 1]]: 1
                }
            }
            // RHS-bottom-corner
            else if (j == gridColumns.length - 1)
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i - 1][j]] : 1,
                    [gridArray[i][j - 1]]: 1
                }
            }
            // bottom-side fill
            else
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i][j - 1]] : 1,
                    [gridArray[i][j + 1]] : 1,
                    [gridArray[i - 1][j]] : 1
                }
            }
        }
        // LHS
        else if (j == 0)
        {
            // not top-left-corner/bottom-left-corner (accounted for already)
            if (i != 0 || i != gridRows.length - 1)
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i - 1][j]] : 1,
                    [gridArray[i][j + 1]] : 1,
                    [gridArray[i + 1][j]] : 1
                }
            }
        }
        // RHS
        else if (j == gridColumns.length -1)
        {
            // not top-left-corner/bottom-left-corner (accounted for already)
            if (i != 0 || i != gridRows.length - 1)
            {
                gridGraph[gridArray[i][j]] = {
                    [gridArray[i - 1][j]] : 1,
                    [gridArray[i][j - 1]] : 1,
                    [gridArray[i + 1][j]] : 1 
                }
            }
        }
        // fill rest
        else
        {
            gridGraph[gridArray[i][j]] = {
                [gridArray[i - 1][j]] : 1,
                [gridArray[i][j - 1]] : 1,
                [gridArray[i + 1][j]] : 1,
                [gridArray[i][j + 1]] : 1
            };
        }
    }
}

console.log(gridGraph); 

// set START and END - used in debug
var startPoint = document.getElementById('15p');
startPoint.className = 'start';
var endPoint = document.getElementById('43k');
endPoint.className = 'end';

function convertElementToRowColumn (elementId)
{
    if (elementId.length == 2)
    {
        var coords = [gridRows.indexOf(elementId.substring(1, 2)), parseInt(elementId.substring(0, 1))];
    }
    else if (elementId.length == 3)
    {
        var coords = [gridRows.indexOf(elementId.substring(2, 3)), parseInt(elementId.substring(0, 2))];
    }
    else
    {
        return console.log("error, element id is invalid length");
    }
    return coords;
}

async function dijkstraSolve() {

    // set START point in gridGraph array and finish point into its surrounding tiles 
    if (startPoint && endPoint)
    {
        // START POINT STUFF
        // convert start element to row and column of the start point   
        var startPointCoords = convertElementToRowColumn(startPoint.id);

        // distance of 1 to the surroudning tiles from start point, wherever the start point is with boundary conditions
        // row = 0 = top
        if (startPointCoords[0] == 0)
        {
            //column = 0 = top-left-corner
            if (startPointCoords[1] == 0)
            {
                gridGraph.start = {
                    [gridArray[startPointCoords[0] + 1][startPointCoords[1]]] : 1,
                    [gridArray[startPointCoords[0]][startPointCoords[1] + 1]] : 1
                }
            }
            // column = end = top-right-corner
            else if (startPointCoords[1] == gridColumns.length - 1)
            {
                gridGraph.start = {
                    [gridArray[startPointCoords[0] + 1][startPointCoords[1]]] : 1,
                    [gridArray[startPointCoords[0]][startPointCoords[1] - 1]] : 1
                }
            }
            // non-corner condition
            else
            {
                gridGraph.start = {
                    [gridArray[startPointCoords[0]][startPointCoords[1] - 1]] : 1,
                    [gridArray[startPointCoords[0]][startPointCoords[1] + 1]] : 1,
                    [gridArray[startPointCoords[0] + 1][startPointCoords[1]]] : 1

                }
            }
        }
        // row = end = bottom
        else if (startPointCoords[0] == gridRows.length - 1)
        {
            // column = 0 = bottom-left-corner
            if (startPointCoords[1] == 0)
            {
                gridGraph.start = {
                    [gridArray[startPointCoords[0] - 1][startPointCoords[1]]] : 1,
                    [gridArray[startPointCoords[0]][startPointCoords[1] + 1]] : 1
                }
            }
            // column = end = bottom-right-corner
            else if (startPointCoords[1] == gridColumns.length - 1)
            {
                gridGraph.start = {
                    [gridArray[startPointCoords[0] - 1][startPointCoords[1]]] : 1,
                    [gridArray[startPointCoords[0]][startPointCoords[1] - 1]] : 1
                }
            }
            // non-corner-condition
            else
            {
                gridGraph.start = {
                    [gridArray[startPointCoords[0]][startPointCoords[1] + 1]] : 1,
                    [gridArray[startPointCoords[0]][startPointCoords[1] - 1]] : 1,
                    [gridArray[startPointCoords[0] - 1][startPointCoords[1]]] : 1
                }
            }
        }
        else
        {
            gridGraph.start = {
                [gridArray[startPointCoords[0] - 1][startPointCoords[1]]] : 1,
                [gridArray[startPointCoords[0]][startPointCoords[1] - 1]] : 1,
                [gridArray[startPointCoords[0] + 1][startPointCoords[1]]] : 1,
                [gridArray[startPointCoords[0]][startPointCoords[1] + 1]] : 1
            }
        }

        // END POINT STUFF
        // convert end element to row and column of end point
        endPointCoords = convertElementToRowColumn(endPoint.id);    

        // implement "finish" key-value into the tiles surrounding the END tile
        // row = 0 = top
        if (endPointCoords[0] == 0)
        {
            // column = 0 = top left hand corner
            if (endPointCoords[1] == 0)
            {
                gridGraph[gridArray[endPointCoords[0] + 1][endPointCoords[1]]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] + 1]]["finish"] = 1; 

            }
            // column = end = top right-hand corner
            else if (endPointCoords[1] == gridColumns.length - 1)
            {
                gridGraph[gridArray[endPointCoords[0] + 1][endPointCoords[1]]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] - 1]]["finish"] = 1; 
            }
            // non-corner condition
            else
            {
                gridGraph[gridArray[endPointCoords[0] + 1][endPointCoords[1]]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] + 1]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] - 1]]["finish"] = 1; 
            }
        }
        // row = end = bottom
        else if (endPointCoords[0] == gridRows.length - 1)
        {
            // column = 0 = bottom left corner
            if (endPointCoords[1] == 0)
            {
                gridGraph[gridArray[endPointCoords[0] - 1][endPointCoords[1]]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] + 1]]["finish"] = 1;
            }
            // column = end = bottom right corner
            else if (endPointCoords[1] == gridColumns.length - 1)
            {
                gridGraph[gridArray[endPointCoords[0] - 1][endPointCoords[1]]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] - 1]]["finish"] = 1;
            }
            // all non-corner conditions on bottom row
            else
            {
                gridGraph[gridArray[endPointCoords[0] - 1][endPointCoords[1]]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] + 1]]["finish"] = 1;
                gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] - 1]]["finish"] = 1; 
            }
        }
        else
        {
            gridGraph[gridArray[endPointCoords[0] - 1][endPointCoords[1]]]["finish"] = 1;
            gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] - 1]]["finish"] = 1;
            gridGraph[gridArray[endPointCoords[0] + 1][endPointCoords[1]]]["finish"] = 1;
            gridGraph[gridArray[endPointCoords[0]][endPointCoords[1] + 1]]["finish"] = 1;
        }

        // empty finish array for solution
        gridGraph.finish = {};

    }
    else
    {
        alert("Start and/or end point not set!");
        return; 
    }

    // account for any walls and set their classname
    var walls = document.getElementsByClassName('wall');
    for (let i = 0; i < walls.length; i++)
    {
        // find coords of the wall element
        var temp = convertElementToRowColumn(walls[i].id);
        // set walls to empty to avoid considering when solving
        gridGraph[gridArray[temp[0]][temp[1]]] = {};
    }


    // solve the distance using dijkstra.js and store the path
    var finalPath = Dijkstra(gridGraph, "start", "finish").path;

    // set the path (exlcuding START and END) tiles to .click to convert their colour
    for (let i = 1; i < finalPath.length - 1; i++)
    {
        let routeTemp = document.getElementById(finalPath[i]);
        routeTemp.className = 'route';
        await sleep(100);
    }
}

// shamelessly stolen off stack overflow
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function test()
{
    console.log("test123");
}