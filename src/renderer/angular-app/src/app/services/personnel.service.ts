import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {
  personnels = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalPersonnels = computed(() => this.personnels().length);

  async loadPersonnels() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getPersonnels();
      this.personnels.set(data);
    }catch (error: any) {
      this.error.set(error.message);
    } finally {
      this.loading.set(false);
    }
  }

  async createPersonnel(data: any) {
    await window.electronAPI.createPersonnel(data);
    await this.loadPersonnels();
  }

  async updatePersonnel(id: string, data: any) {
    await window.electronAPI.updatePersonnel(id, data);
    await this.loadPersonnels();
  }

  async deletePersonnel(id: string) {
    await window.electronAPI.deletePersonnel(id);
    await this.loadPersonnels();
  }
}