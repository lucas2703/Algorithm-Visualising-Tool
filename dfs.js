const test_graph = {
    start: {A: 1, B: 1},
    A: {C: 1, D: 1},
    B: {A: 1, D: 1},
    C: {D: 1, finish: 1},
    D: {finish: 1},
    finish: {}
};
// Depth-First Search for shortest path
const DFS = (graph, startNode, finishNode) => {
    var stack = [startNode];
    var parent = {};
    var seen = [startNode]
    while(Array.isArray(stack) && stack.length)
    {
        vertex = stack.pop();
        //console.log(vertex); //start
        for (var u in graph[vertex])
        {

            // For visualisation
            if (u != 'start')
            {
                dfs_solving_path.push(u);
            }
            //console.log(seen);
            if (!seen.includes(u))
            {
                seen.push(u);
                stack.push(u);
                parent[u] = vertex;
            }
        }
    }

    var path_solution = [];
    var current_node = 'finish';
    path_solution.push(current_node);
    // safety measure
    let count = 0;
    while (count < 10000)
    {
        path_solution.push(parent[current_node]);
        current_node = parent[current_node];
        if (current_node == 'start')
        {
            break;
        }
        count++;
    }

    path_solution.reverse();

    return(path_solution);

}

//console.log(DFS(test_graph, 'start', 'finish'));