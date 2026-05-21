import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DimensionService {
  dimensions = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalDimensions = computed(() => this.dimensions().length);

  async loadDimensions() {
    this.loading.set(true);

    try {
      const data = await window.electronAPI.getDimensions();
      this.dimensions.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des dimensions.');
    } finally {
      this.loading.set(false);
    }
  }

  async createDimension(data: any) {
    await window.electronAPI.createDimension(data);
    await this.loadDimensions();
  }

  async updateDimension(id: number, data: any) {
    await window.electronAPI.updateDimension(id, data);
    await this.loadDimensions();
  }

  async deleteDimension(id: number) {
    await window.electronAPI.deleteDimension(id);
    await this.loadDimensions();
  }
}