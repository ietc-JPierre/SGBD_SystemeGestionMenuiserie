import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {

  getClients: () =>
    ipcRenderer.invoke('clients:getAll'),

  createClient: (data: any) =>
    ipcRenderer.invoke('clients:create', data),

  updateClient: (id: number, data: any) =>
    ipcRenderer.invoke('clients:update', id, data),

  deleteClient: (id: number) =>
    ipcRenderer.invoke('clients:delete', id),

  getCategories: () =>
  ipcRenderer.invoke('categories:getAll'),

  createCategory: (data: any) =>
    ipcRenderer.invoke('categories:create', data),

  updateCategory: (id: number, data: any) =>
    ipcRenderer.invoke('categories:update', id, data),

  deleteCategory: (id: number) =>
    ipcRenderer.invoke('categories:delete', id),

  getProduits: () =>
  ipcRenderer.invoke('produits:getAll'),

  createProduit: (data: any) =>
    ipcRenderer.invoke('produits:create', data),

  updateProduit: (id: number, data: any) =>
    ipcRenderer.invoke('produits:update', id, data),

  deleteProduit: (id: number) =>
    ipcRenderer.invoke('produits:delete', id),

  getDimensions: () => 
    ipcRenderer.invoke('dimensions:getAll'),
  createDimension: (data: any) => 
    ipcRenderer.invoke('dimensions:create', data),
  updateDimension: (id: number, data: any) =>
    ipcRenderer.invoke('dimensions:update', id, data),
  deleteDimension: (id: number) =>
    ipcRenderer.invoke('dimensions:delete', id),

  getCommandes: () => 
    ipcRenderer.invoke('commandes:getAll'),
  createCommande: (data: any) => 
    ipcRenderer.invoke('commandes:create', data),
  updateCommande: (id: number, data: any) =>
    ipcRenderer.invoke('commandes:update', id, data),
  deleteCommande: (id: number) =>
    ipcRenderer.invoke('commandes:delete', id),

  getCommandeProduits: () =>
  ipcRenderer.invoke('commandeProduits:getAll'),

  createCommandeProduit: (data: any) =>
    ipcRenderer.invoke('commandeProduits:create', data),

  updateCommandeProduit: (ids: any, data: any) =>
    ipcRenderer.invoke('commandeProduits:update', ids, data),

  deleteCommandeProduit: (ids: any) =>
    ipcRenderer.invoke('commandeProduits:delete', ids),

  getPersonnels: () => ipcRenderer.invoke('personnels:getAll'),

  createPersonnel: (data: any) =>
    ipcRenderer.invoke('personnels:create', data),

  updatePersonnel: (id: string, data: any) =>
    ipcRenderer.invoke('personnels:update', id, data),

  deletePersonnel: (id: string) =>
    ipcRenderer.invoke('personnels:delete', id),

  getPersonnelCommandes: () =>
  ipcRenderer.invoke('personnelCommandes:getAll'),

  createPersonnelCommande: (data: any) =>
    ipcRenderer.invoke('personnelCommandes:create', data),

  deletePersonnelCommande: (ids: any) =>
    ipcRenderer.invoke('personnelCommandes:delete', ids),

  getCodesPostaux: () =>
  ipcRenderer.invoke('codesPostaux:getAll'),

  createCodePostal: (data: any) =>
    ipcRenderer.invoke('codesPostaux:create', data),

  updateCodePostal: (codePostal: string, data: any) =>
    ipcRenderer.invoke('codesPostaux:update', codePostal, data),

  deleteCodePostal: (codePostal: string) =>
    ipcRenderer.invoke('codesPostaux:delete', codePostal),

  getChantiers: () => ipcRenderer.invoke('chantiers:getAll'),

  createChantier: (data: any) =>
    ipcRenderer.invoke('chantiers:create', data),

  updateChantier: (id: number, data: any) =>
    ipcRenderer.invoke('chantiers:update', id, data),

  deleteChantier: (id: number) =>
    ipcRenderer.invoke('chantiers:delete', id),

  getClientChantiers: () =>
  ipcRenderer.invoke('clientChantiers:getAll'),

  createClientChantier: (data: any) =>
    ipcRenderer.invoke('clientChantiers:create', data),

  deleteClientChantier: (ids: any) =>
    ipcRenderer.invoke('clientChantiers:delete', ids),
});