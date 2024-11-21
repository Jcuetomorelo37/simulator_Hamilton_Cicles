function isSafe(v, graph, path, pos) {
    if (!graph[path[pos - 1]][v]) return false;
    if (path.includes(v)) return false;
    return true;
}

function hamiltonianCycleUtil(graph, path, pos, allCycles) {
    if (pos === graph.length) {
        if (graph[path[pos - 1]][path[0]]) {
            allCycles.push([...path, path[0]]);
        }
        return;
    }

    for (let v = 1; v < graph.length; v++) {
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;
            hamiltonianCycleUtil(graph, path, pos + 1, allCycles);
            path[pos] = -1;
        }
    }
}


function findAllHamiltonianCycles(graph) {
    const path = Array(graph.length).fill(-1);
    const allCycles = [];
    path[0] = 0;

    hamiltonianCycleUtil(graph, path, 1, allCycles);

    return allCycles.length > 0 ? allCycles : null;
}

module.exports = { findAllHamiltonianCycles };
