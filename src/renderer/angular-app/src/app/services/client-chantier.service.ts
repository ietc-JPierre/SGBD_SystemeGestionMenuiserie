import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientChantierService {
  clientChantiers = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalAffectations = computed(() => this.clientChantiers().length);

  async loadClientChantiers() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getClientChantiers();
      this.clientChantiers.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des associations client-chantier.');
    } finally {
      this.loading.set(false);
    }
  }

  async createClientChantier(data: any) {
    await window.electronAPI.createClientChantier(data);
    await this.loadClientChantiers();
  }

  async deleteClientChantier(ids: any) {
    await window.electronAPI.deleteClientChantier(ids);
    await this.loadClientChantiers();
  }
}