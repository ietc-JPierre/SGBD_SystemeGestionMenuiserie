import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommandeProduitService } from '../../services/commande-produit.service';
import { CommandeService } from '../../services/commande.service';
import { ProduitService } from '../../services/produit.service';
import { DimensionService } from '../../services/dimension.service';

@Component({
  selector: 'app-commande-produits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commande-produits.component.html',
  styleUrl: './commande-produits.component.css',
})
export class CommandeProduitsComponent implements OnInit {
  commandeProduitService = inject(CommandeProduitService);
  commandeService = inject(CommandeService);
  produitService = inject(ProduitService);
  dimensionService = inject(DimensionService);
  fb = inject(FormBuilder);

  editingIds = signal<any | null>(null);

  form = this.fb.group({
    commandeId: [1, Validators.required],
    produitId: [1, Validators.required],
    dimensionId: [1, Validators.required],
    quantite: [1, [Validators.required, Validators.min(1)]],
    prixUnitaire: [0, [Validators.required, Validators.min(0)]],
  });

  async ngOnInit() {
    await this.commandeService.loadCommandes();
    await this.produitService.loadProduits();
    await this.dimensionService.loadDimensions();
    await this.commandeProduitService.loadCommandeProduits();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      commandeId: Number(this.form.value.commandeId),
      produitId: Number(this.form.value.produitId),
      dimensionId: Number(this.form.value.dimensionId),
      quantite: Number(this.form.value.quantite),
      prixUnitaire: Number(this.form.value.prixUnitaire),
    };

    if (this.editingIds()) {
      await this.commandeProduitService.updateCommandeProduit(this.editingIds(), {
        quantite: data.quantite,
        prixUnitaire: data.prixUnitaire,
      });
    } else {
      await this.commandeProduitService.createCommandeProduit(data);
    }

    this.cancelEdit();
  }

  edit(ligne: any) {
    const ids = {
      commandeId: ligne.commandeId,
      produitId: ligne.produitId,
      dimensionId: ligne.dimensionId,
    };

    this.editingIds.set(ids);

    this.form.patchValue({
      commandeId: ligne.commandeId,
      produitId: ligne.produitId,
      dimensionId: ligne.dimensionId,
      quantite: ligne.quantite,
      prixUnitaire: ligne.prixUnitaire,
    });
  }

  async delete(ligne: any) {
    await this.commandeProduitService.deleteCommandeProduit({
      commandeId: ligne.commandeId,
      produitId: ligne.produitId,
      dimensionId: ligne.dimensionId,
    });
  }

  cancelEdit() {
    this.editingIds.set(null);

    this.form.reset({
      commandeId: 1,
      produitId: 1,
      dimensionId: 1,
      quantite: 1,
      prixUnitaire: 0,
    });
  }
}