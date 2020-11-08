// A* pathfinding algorithm 
const a_star = (graph, startNode, finishNode) =>
{   

    start_node = {g : 0, h : 0, f : 0};
    finish_node = {g : 0, h : 0, f : 0};

    // Initialise open and closed lists (as arrays)
    var openList = [];
    var closedList = [];

    // Push start node into list
    openList.push(startNode);

    // Loop till the end node is found
    while (openList.length > 0)
    {
        // get the current node to be worked on
        let currentNode = openList[0];
        let index = 0;
    }
}

function initialise_heuristic(graph)
{
    return;
}
