export {};

declare global {
  interface Window {
    electronAPI: {
    getClients: () => Promise<any>;
    createClient: (data: any) => Promise<any>;
    updateClient: (id: number, data: any) => Promise<any>;
    deleteClient: (id: number) => Promise<any>;

    getCategories: () => Promise<any>;
    createCategory: (data: any) => Promise<any>;
    updateCategory: (id: number, data: any) => Promise<any>;
    deleteCategory: (id: number) => Promise<any>;

    getProduits: () => Promise<any>;
    createProduit: (data: any) => Promise<any>;
    updateProduit: (id: number, data: any) => Promise<any>;
    deleteProduit: (id: number) => Promise<any>;

    getDimensions: () => Promise<any[]>;
    createDimension: (data: any) => Promise<any>;
    updateDimension: (id: number, data: any) => Promise<any>;
    deleteDimension: (id: number) => Promise<any>;

    getCommandes: () => Promise<any[]>;
    createCommande: (data: any) => Promise<any>;
    updateCommande: (id: number, data: any) => Promise<any>;
    deleteCommande: (id: number) => Promise<any>;

    getCommandeProduits: () => Promise<any[]>;
    createCommandeProduit: (data: any) => Promise<any>;
    updateCommandeProduit: (ids: any, data: any) => Promise<any>;
    deleteCommandeProduit: (ids: any) => Promise<any>;

    getPersonnels: () => Promise<any[]>;
    createPersonnel: (data: any) => Promise<any>;
    updatePersonnel: (id: string, data: any) => Promise<any>;
    deletePersonnel: (id: string) => Promise<any>;

    getPersonnelCommandes: () => Promise<any[]>;
    createPersonnelCommande: (data: any) => Promise<any>;
    deletePersonnelCommande: (ids: any) => Promise<any>;

    getCodesPostaux: () => Promise<any[]>;
    createCodePostal: (data: any) => Promise<any>;
    updateCodePostal: (codePostal: string, data: any) => Promise<any>;
    deleteCodePostal: (codePostal: string) => Promise<any>;
   
    getChantiers: () => Promise<any[]>;
    createChantier: (data: any) => Promise<any>;
    updateChantier: (id: number, data: any) => Promise<any>;
    deleteChantier: (id: number) => Promise<any>;

    getClientChantiers: () => Promise<any[]>;
    createClientChantier: (data: any) => Promise<any>;
    deleteClientChantier: (ids: any) => Promise<any>;
    };
  }
}