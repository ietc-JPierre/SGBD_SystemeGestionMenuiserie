import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChantierService {
  chantiers = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalChantiers = computed(() => this.chantiers().length);

  async loadChantiers() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getChantiers();
      this.chantiers.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des chantiers.');
    } finally {
      this.loading.set(false);
    }
  }

  async createChantier(data: any) {
    await window.electronAPI.createChantier(data);
    await this.loadChantiers();
  }

  async updateChantier(id: number, data: any) {
    await window.electronAPI.updateChantier(id, data);
    await this.loadChantiers();
  }

  async deleteChantier(id: number) {
    await window.electronAPI.deleteChantier(id);
    await this.loadChantiers();
  }
}