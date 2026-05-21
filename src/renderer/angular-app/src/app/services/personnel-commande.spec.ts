import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonnelCommandeService {
  personnelCommandes = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalAffectations = computed(() => this.personnelCommandes().length);

  async loadPersonnelCommandes() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getPersonnelCommandes();
      this.personnelCommandes.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des affectations.');
    } finally {
      this.loading.set(false);
    }
  }

  async createPersonnelCommande(data: any) {
    await window.electronAPI.createPersonnelCommande(data);
    await this.loadPersonnelCommandes();
  }

  async deletePersonnelCommande(ids: any) {
    await window.electronAPI.deletePersonnelCommande(ids);
    await this.loadPersonnelCommandes();
  }
}