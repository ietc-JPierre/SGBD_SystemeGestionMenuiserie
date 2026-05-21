import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalProduits = computed(() => this.produits().length);

  async loadProduits() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getProduits();
      this.produits.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des produits.');
    } finally {
      this.loading.set(false);
    }
  }

  async createProduit(data: any) {
    await window.electronAPI.createProduit(data);
    await this.loadProduits();
  }

  async updateProduit(id: number, data: any) {
    await window.electronAPI.updateProduit(id, data);
    await this.loadProduits();
  }

  async deleteProduit(id: number) {
    await window.electronAPI.deleteProduit(id);
    await this.loadProduits();
  }
}