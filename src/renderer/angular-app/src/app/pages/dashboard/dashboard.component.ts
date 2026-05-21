import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { CommandeService } from '../../services/commande.service';
import { ClientService } from '../../services/client.service';
import { ProduitService } from '../../services/produit.service';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  commandeService = inject(CommandeService);
  clientService = inject(ClientService);
  produitService = inject(ProduitService);
  chantierService = inject(ChantierService);

  async ngOnInit() {
    await this.commandeService.loadCommandes();
    await this.clientService.loadClients();
    await this.produitService.loadProduits();
    await this.chantierService.loadChantiers();
  }
}