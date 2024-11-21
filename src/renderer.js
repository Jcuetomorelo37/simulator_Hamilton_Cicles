document.getElementById("direccion").addEventListener("change", async () => {
    if (this.checked) {
        grafoDirigido();
    } else {
        grafoNoDirigido();
    }
});

function grafoNoDirigido() {
    document.getElementById('find-cycle').addEventListener('click', async () => {
        const input = document.getElementById('graph-input').value;
    
        try {
            const graph = JSON.parse(input);
    
            if (!Array.isArray(graph) || !graph.every(row => Array.isArray(row) && row.length === graph.length)) {
                throw new Error('La matriz de adyacencia debe ser cuadrada.');
            }
    
            const cycles = await window.api.findHamiltonianCycle(graph);
    
            console.log('Respuesta de la API:', cycles);
    
            if (!cycles) {
                document.getElementById('output').value="";
                document.getElementById('hamiltonian-paths').value="";
                document.getElementById('graph-container').value="";
                throw new Error('No se encontró un ciclo hamiltoniano.');
            }
    
            drawGraph(graph, Array.isArray(cycles[0]) ? cycles : [cycles]);
    
            const output = document.getElementById('output');
            const hamiltonianPaths = document.getElementById('hamiltonian-paths');
    
            if (Array.isArray(cycles[0])) {
                output.textContent = `Ciclos Hamiltonianos encontrados: ${cycles.length} .`;
                hamiltonianPaths.innerHTML = `
                    <p><strong>Ciclos Hamiltonianos:</strong></p>
                    <ul>
                        ${cycles.map(cycle => `<li>${cycle.join(' -> ')}</li>`).join('')}
                    </ul>
                `;
            } else {
                output.textContent = 'Se encontró un ciclo hamiltoniano.';
                hamiltonianPaths.innerHTML = `
                    <p><strong>Ciclo Hamiltoniano:</strong></p>
                    <ul>
                        <li>${cycles.join(' -> ')}</li>
                    </ul>
                `;
            }
    
            hamiltonianPaths.classList.remove('is-hidden');
            output.classList.remove('is-hidden');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Por favor, introduce una matriz de adyacencia válida.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
    
    function drawGraph(graph, cycles) {
        const elements = [];
        const n = graph.length;
    
        for (let i = 0; i < n; i++) {
            elements.push({ data: { id: `node${i}`, label: `${i}` } });
        }
    
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (graph[i][j]) {
                    elements.push({
                        data: {
                            id: `edge${i}-${j}`,
                            source: `node${i}`,
                            target: `node${j}`,
                            weight: graph[i][j],
                        },
                    });
                }
            }
        }
    
        const cycleColors = ['#f00', '#00f', '#0f0', '#ff0', '#0ff', '#f0f'];
        if (cycles) {
            cycles.forEach((cycle, index) => {
                const color = cycleColors[index % cycleColors.length];
                for (let k = 0; k < cycle.length - 1; k++) {
                    elements.push({
                        data: {
                            id: `cycle${index}-${cycle[k]}-${cycle[k + 1]}`,
                            source: `node${cycle[k]}`,
                            target: `node${cycle[k + 1]}`,
                        },
                        classes: `highlighted-cycle-${index}`,
                    });
                }
            });
        }
    
        const cy = cytoscape({
            container: document.getElementById('graph-container'),
            elements: elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        label: 'data(label)',
                        color: '#fff',
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 2,
                        'line-color': '#ccc',
                        label: 'data(weight)',
                    },
                },
                ...cycleColors.map((color, index) => ({
                    selector: `.highlighted-cycle-${index}`,
                    style: {
                        'line-color': color,
                        width: 4,
                    },
                })),
            ],
            layout: {
                name: 'circle',
            },
        });
    }
    
}

function grafoDirigido() {
    document.getElementById('find-cycle').addEventListener('click', async () => {
        const input = document.getElementById('graph-input').value;

        try {
            // Parsear la entrada como una matriz de adyacencia
            const graph = JSON.parse(input);

            if (!Array.isArray(graph) || !graph.every(row => Array.isArray(row) && row.length === graph.length)) {
                throw new Error('La matriz de adyacencia debe ser cuadrada.');
            }

            // Llamar a la API para encontrar ciclos Hamiltonianos dirigidos
            const cycles = await window.apiDirect.findAllHamiltonianCyclesDirected(graph);

            if (!cycles || cycles.length === 0) {
                document.getElementById('output').value="";
                document.getElementById('hamiltonian-paths').value="";
                document.getElementById('graph-container').value="";
                throw new Error('No se encontró ningún ciclo Hamiltoniano.');
            }

            // Dibujar el grafo y los ciclos encontrados
            drawGraph(graph, cycles);

            // Actualizar la interfaz con los resultados
            const output = document.getElementById('output');
            const hamiltonianPaths = document.getElementById('hamiltonian-paths');

            output.textContent = `Ciclos Hamiltonianos encontrados: ${cycles.length}.`;
            hamiltonianPaths.innerHTML = `
                <p><strong>Ciclos Hamiltonianos:</strong></p>
                <ul>
                    ${cycles.map(cycle => `<li>${cycle.join(' -> ')}</li>`).join('')}
                </ul>
            `;

            hamiltonianPaths.classList.remove('is-hidden');
            output.classList.remove('is-hidden');
        } catch (error) {
            // Mostrar error con SweetAlert
            Swal.fire({
                title: 'Error',
                text: error.message || 'Por favor, introduce una matriz de adyacencia válida.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    });

    // Función para dibujar el grafo y resaltar los ciclos
    function drawGraph(graph, cycles) {
        const elements = [];
        const n = graph.length;

        // Agregar nodos
        for (let i = 0; i < n; i++) {
            elements.push({ data: { id: `node${i}`, label: `${i}` } });
        }

        // Agregar aristas dirigidas
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (graph[i][j]) {
                    elements.push({
                        data: {
                            id: `edge${i}-${j}`,
                            source: `node${i}`,
                            target: `node${j}`,
                            weight: graph[i][j],
                        },
                    });
                }
            }
        }

        // Resaltar ciclos Hamiltonianos
        const cycleColors = ['#f00', '#00f', '#0f0', '#ff0', '#0ff', '#f0f'];
        if (cycles) {
            cycles.forEach((cycle, index) => {
                const color = cycleColors[index % cycleColors.length];
                for (let k = 0; k < cycle.length - 1; k++) {
                    elements.push({
                        data: {
                            id: `cycle${index}-${cycle[k]}-${cycle[k + 1]}`,
                            source: `node${cycle[k]}`,
                            target: `node${cycle[k + 1]}`,
                        },
                        classes: `highlighted-cycle-${index}`,
                    });
                }
            });
        }

        // Renderizar el grafo con Cytoscape
        const cy = cytoscape({
            container: document.getElementById('graph-container'),
            elements: elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        label: 'data(label)',
                        color: '#fff',
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 2,
                        'line-color': '#ccc',
                        label: 'data(weight)',
                    },
                },
                ...cycleColors.map((color, index) => ({
                    selector: `.highlighted-cycle-${index}`,
                    style: {
                        'line-color': color,
                        width: 4,
                    },
                })),
            ],
            layout: {
                name: 'circle',
            },
        });
    }
}
