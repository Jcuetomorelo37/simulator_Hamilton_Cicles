
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    findHamiltonianCycle: (graph) => ipcRenderer.invoke('find-hamiltonian-cycle', graph),
});

contextBridge.exposeInMainWorld('apiDirect', {
    findAllHamiltonianCyclesDirected: (graph) => ipcRenderer.invoke('find-hamiltonian-cycle-direct', graph),
});