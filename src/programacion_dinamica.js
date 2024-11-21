function findAllHamiltonianCyclesDirected(graph) {
    const n = graph.length;
    const dp = Array.from({ length: 1 << n }, () => Array(n).fill(false));
    const parent = Array.from({ length: 1 << n }, () => Array(n).fill(-1));

    for (let i = 0; i < n; i++) {
        dp[1 << i][i] = true;
    }

    for (let mask = 0; mask < (1 << n); mask++) {
        for (let u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;

            for (let v = 0; v < n; v++) {
                if (graph[u][v] && !(mask & (1 << v))) {
                    const nextMask = mask | (1 << v);
                    dp[nextMask][v] = true;
                    parent[nextMask][v] = u;
                }
            }
        }
    }

    let lastNode = -1;
    for (let i = 0; i < n; i++) {
        if (dp[(1 << n) - 1][i] && graph[i][0]) {
            lastNode = i;
            break;
        }
    }

    if (lastNode === -1) return null;

    const cycle = [];
    let mask = (1 << n) - 1;
    while (lastNode !== -1) {
        cycle.push(lastNode);
        const prev = parent[mask][lastNode];
        mask &= ~(1 << lastNode);
        lastNode = prev;
    }

    return cycle.reverse();
}

module.exports = { findAllHamiltonianCyclesDirected };
