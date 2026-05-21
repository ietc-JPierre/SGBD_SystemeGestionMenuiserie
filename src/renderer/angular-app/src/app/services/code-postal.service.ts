import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodePostalService {
  codesPostaux = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalCodesPostaux = computed(() => this.codesPostaux().length);

  async loadCodesPostaux() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getCodesPostaux();
      this.codesPostaux.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des codes postaux.');
    } finally {
      this.loading.set(false);
    }
  }

  async createCodePostal(data: any) {
    await window.electronAPI.createCodePostal(data);
    await this.loadCodesPostaux();
  }

  async updateCodePostal(codePostal: string, data: any) {
    await window.electronAPI.updateCodePostal(codePostal, data);
    await this.loadCodesPostaux();
  }

  async deleteCodePostal(codePostal: string) {
    await window.electronAPI.deleteCodePostal(codePostal);
    await this.loadCodesPostaux();
  }
}