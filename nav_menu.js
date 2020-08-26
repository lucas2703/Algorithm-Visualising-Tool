var selectedAlgorithm; 

// only select one checkbox in the nav-menu (used for choosing only ONE algorithm)
function selectAlgorithm(checkbox, algorithm) {
    selectedAlgorithm = algorithm;
    let checkboxes = document.getElementsByName('check')

    // update title
    let grid_title_id = document.getElementById("grid_title_id");
    grid_title_id.innerText = "Pathfinding Algorithm: " + selectedAlgorithm;   

    // uncheck all other boses
    checkboxes.forEach((item) => 
    {
        if (item !== checkbox) 
        {
            item.checked = false
        }  
    })
}

// only select one checkbox in the nav-menu (used for choosing only ONE algorithm)
function selectMaze(checkbox, maze) {
    // get list of maze checkboxes: m_check
    var checkboxes = document.getElementsByName('m_check') 

    // uncheck all other boses
    checkboxes.forEach((item) => 
    {
        if (item !== checkbox) 
        {
            item.checked = false
        }  
    })

    // call the generate maze function in grid.js
    generateMaze(maze);
}

// reset button functionality to reset the wall class names to nothing
function resetGrid ()
{
    // remove START tile
    if (document.getElementsByClassName('start'))
    {
        // get walls and store
        let startTemp = document.getElementsByClassName('start');
        startTemp[0].classList.remove('start');

        // remove all traces of start tile location
        delete gridGraph["start"];
        startPoint = null;
    }

    // remove walls 
    if (document.getElementsByClassName('wall'))
    {
        // get walls and store
        let wallTemp = document.getElementsByClassName('wall');
        
        // iterate through walls object using forEach (Object.keys(wallTemp) gets keys in [ "", "", ""])
        Object.keys(wallTemp).forEach(function (){
            // object seemed to remove the element from the object, index 0 everytime worked
            wallTemp[0].classList.remove('wall');
        })
    }

    // if there are walls to be re-added
    if (Object.keys(deletedWalls).length != 0)
    {
        Object.keys(deletedWalls).forEach(function (i)
        {
            // re-implement the previously deleted walls into gridGraph
            gridGraph[i] = deletedWalls[i];
            
        })
    }

    // remove route cells
    if (document.getElementsByClassName('route'))
    {
        // get route and store
        let routeTemp = document.getElementsByClassName('route');
        
        Object.keys(routeTemp).forEach(function (){
            // object seemed to remove the element from the object, index 0 everytime worked
            routeTemp[0].classList.remove('route');
        })
    }

    // remove solving cells
    if (document.getElementsByClassName('solving'))
    {
        // get route and store
        let solvingTemp = document.getElementsByClassName('solving');
        
        Object.keys(solvingTemp).forEach(function (){
            // object seemed to remove the element from the object, index 0 everytime worked
            solvingTemp[0].classList.remove('solving');
        })

        solving_path = [];
    }
}