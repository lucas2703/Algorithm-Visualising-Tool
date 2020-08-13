var selectedAlgorithm; 

// only select one checkbox in the nav-menu (used for choosing only ONE algorithm)
function selectAlgorithm(checkbox, algorithm) {
    selectedAlgorithm = algorithm;
    console.log("algorithm selceted: ", selectedAlgorithm);
    var checkboxes = document.getElementsByName('check')

    var grid_title = document.getElementById("layout");
    //grid_title.innerHTML = "Pathfinding Algorithm: ", selectedAlgorithm;   

    // uncheck all other boses
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}