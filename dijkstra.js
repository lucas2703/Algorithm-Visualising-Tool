// Function to find the lowest cost neighbouring node 
const shortestNodeDistance = (distances, visited) => {
    // Var for shortest 
    var shortest = null;

    // for each node in the distances JS object
    for (var node in distances)
    {
        // if no node is assigned or the new distance is shorter 
        let temp = shortest == null || distances[node] < distances[shortest];

        // and if the current node hasn't been visited 
        if (temp && !visited.includes(node))
        {
            shortest = node;
        }
    }
    return shortest;
};

//const Dijkstra = function(graph, startNode, finishNode)
const Dijkstra = (graph, startNode, finishNode) =>
{   
    // Hash object to track each nodes DISTANCES from start node
    var distances = {};
    // set highest val 'Infinity' so next (smaller) value is selected
    distances[finishNode] = Infinity;
    distances = Object.assign(distances, graph[startNode]);

    // Hash object to track the ROUTE from start node
    var route = { finishNode: null };
    for (var child in graph[startNode])
    {
        route[child] = startNode;
    }

    // array of visited nodes
    var visitedNodes = [];

    // use the distances hash object and visited nodes array in
    // shortestNodeDistnace function to find the nearest node
    var nearestNode = shortestNodeDistance(distances, visitedNodes);

    // for the nearest node:
    while (nearestNode)
    {
        //document.getElementById(nearestNode).className = 'solving';

        // find the distance to the nearestNode
        let distanceToNode = distances[nearestNode];
        // child of nearestNode
        let childrenOfNode = graph[nearestNode];

        // make sure the child node is not startNode
        for (let child in childrenOfNode)
        {
            if (String(child) == String(startNode))
            {   
                // do nothing
                continue;
            }
            else
            {
                // calculate distance from the nearestNode to the startNode
                let newDistance = distanceToNode + childrenOfNode[child];

                // if no recorded distance from start node to child node in distances hash object
                // or if recorded distance < previously stored distance
                if (!distances[child] || newDistance < distances[child])
                {
                    // store new distance
                    distances[child] = newDistance;
                    // record path
                    route[child] = nearestNode;
                }
            }
        }
    
        // push the nearestNode into visitedNodes to avoid repeating on next iteration
        visitedNodes.push(nearestNode);

        // move to the next nearest node
        nearestNode = shortestNodeDistance(distances, visitedNodes);
    }

    // record shortest path by traversing through the route object and reversing the array (so it goes from start to finish)
    var optimalPath = [finishNode];
    var parentNode = route[finishNode];
    while (parentNode)
    {
        optimalPath.push(parentNode);
        parentNode = route[parentNode];
    }
    optimalPath.reverse(); 
  
    const results = 
    {
        distance: distances[finishNode],
        path: optimalPath
    }

    return results;
};