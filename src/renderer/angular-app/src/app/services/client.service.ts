import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalClients = computed(() => this.clients().length);

  async loadClients() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getClients();
      this.clients.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des clients.');
    } finally {
      this.loading.set(false);
    }
  }

  async createClient(client: any) {
    await window.electronAPI.createClient(client);
    await this.loadClients();
  }

  async updateClient(id: number, client: any) {
    await window.electronAPI.updateClient(id, client);
    await this.loadClients();
  }

  async deleteClient(id: number) {
    await window.electronAPI.deleteClient(id);
    await this.loadClients();
  }
}
