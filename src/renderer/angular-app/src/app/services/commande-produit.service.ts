import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandeProduitService {
  commandeProduits = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalLignes = computed(() => this.commandeProduits().length);

  montantTotalLignes = computed(() =>
    this.commandeProduits().reduce(
      (total, ligne) => total + ligne.quantite * ligne.prixUnitaire,
      0
    )
  );

  async loadCommandeProduits() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getCommandeProduits();
      this.commandeProduits.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des lignes de commande.');
    } finally {
      this.loading.set(false);
    }
  }

  async createCommandeProduit(data: any) {
    await window.electronAPI.createCommandeProduit(data);
    await this.loadCommandeProduits();
  }

  async updateCommandeProduit(ids: any, data: any) {
    await window.electronAPI.updateCommandeProduit(ids, data);
    await this.loadCommandeProduits();
  }

  async deleteCommandeProduit(ids: any) {
    await window.electronAPI.deleteCommandeProduit(ids);
    await this.loadCommandeProduits();
  }
}