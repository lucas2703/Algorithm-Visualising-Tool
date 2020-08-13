var selectedAlgorithm; 

// only select one checkbox in the nav-menu (used for choosing only ONE algorithm)
function selectAlgorithm(checkbox, algorithm) {
    selectedAlgorithm = algorithm;
    console.log("algorithm selceted: ", selectedAlgorithm);
    var checkboxes = document.getElementsByName('check')

    // update title
    var grid_title_id = document.getElementById("grid_title_id");
    grid_title_id.innerText = "Pathfinding Algorithm: " + selectedAlgorithm;   

    // uncheck all other boses
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}