import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  commandes = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalCommandes = computed(() => this.commandes().length);

  totalChiffreAffaire = computed(() =>
    this.commandes().reduce((total, commande) => total + commande.totalCommande, 0)
  );

  anneeActuelle = new Date().getFullYear();
moisActuel = new Date().getMonth();

commandesAnnee = computed(() =>
  this.commandes().filter((commande) => {
    const date = new Date(commande.dateCommande);

    return date.getFullYear() === this.anneeActuelle;
  })
);

commandesMois = computed(() =>
  this.commandes().filter((commande) => {
    const date = new Date(commande.dateCommande);

    return (
      date.getFullYear() === this.anneeActuelle &&
      date.getMonth() === this.moisActuel
    );
  })
);

chiffreAffaireAnnuel = computed(() =>
  this.commandesAnnee().reduce(
    (total, commande) => total + commande.totalCommande,
    0
  )
);

chiffreAffaireMensuel = computed(() =>
  this.commandesMois().reduce(
    (total, commande) => total + commande.totalCommande,
    0
  )
);

totalPaye = computed(() =>
  this.commandes().reduce(
    (total, commande) => total + commande.montantPaye,
    0
  )
);

resteAPayerTotal = computed(() =>
  this.commandes().reduce(
    (total, commande) => total + commande.resteAPayer,
    0
  )
);

  async loadCommandes() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await window.electronAPI.getCommandes();
      this.commandes.set(data);
    } catch {
      this.error.set('Erreur lors du chargement des commandes.');
    } finally {
      this.loading.set(false);
    }
  }

  async createCommande(data: any) {
    await window.electronAPI.createCommande(data);
    await this.loadCommandes();
  }

  async updateCommande(id: number, data: any) {
    await window.electronAPI.updateCommande(id, data);
    await this.loadCommandes();
  }

  async deleteCommande(id: number) {
    await window.electronAPI.deleteCommande(id);
    await this.loadCommandes();
  }
}