/*const test_graph = {
    start: {A: 1, B: 1},
    A: {C: 1, D: 1},
    B: {A: 1, D: 1},
    C: {D: 1, finish: 1},
    D: {finish: 1},
    finish: {}
};*/

// Breadth-first search
const BFS = (graph, start, fin) => {
    const queue = [[start]];
    const visited = new Set();

    while (queue.length)
    {
        // get first path on queue
        const path = queue.shift();
        //console.log(path); // ["start"]
        
        // get the last node in the path
        const vertex = path[path.length - 1];
        //console.log(vertex); // start
        
        // if end
        if (vertex == fin)
        {
            return path;
        }
        else if (!visited.has(vertex))
        {
            if (vertex != start)
            {
                bfs_solving_path.push(vertex);
            }
            // for all adjvant nodes, construct new path and push into queue
            for (const neighbour in (graph[vertex]))
            {
                queue.push(path.concat(neighbour));
            }

            visited.add(vertex);
        }
    }
}

//console.log(BFS(test_graph, 'start', 'finish'));