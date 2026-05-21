import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit {

  produitService = inject(ProduitService);
  categorieService = inject(CategorieService);

  fb = inject(FormBuilder);

  editingId = signal<number | null>(null);

  form = this.fb.group({
    nomProduit: ['', Validators.required],

    prixUnitaireProduit: [
      1,
      [
        Validators.required,
        Validators.min(0.01),
      ],
    ],

    categorieId: [
      null as number | null,
      Validators.required,
    ],
  });

  async ngOnInit() {

    await this.categorieService.loadCategories();

    const firstCategorie =
      this.categorieService.categories()[0];

    if (firstCategorie) {
      this.form.patchValue({
        categorieId: firstCategorie.id,
      });
    }

    await this.produitService.loadProduits();
  }

  async submit() {

    console.log('FORM VALUE', this.form.value);
    console.log('FORM VALID', this.form.valid);
    console.log('FORM ERRORS', this.form.errors);

    if (this.form.invalid) {
      return;
    }

    const data = {
      nomProduit: this.form.value.nomProduit!,
      prixUnitaireProduit: Number(
        this.form.value.prixUnitaireProduit
      ),
      categorieId: Number(
        this.form.value.categorieId
      ),
    };

    try {

      if (this.editingId()) {

        await this.produitService.updateProduit(
          this.editingId()!,
          data
        );

      } else {

        await this.produitService.createProduit(data);

      }

      this.cancelEdit();

    } catch (error) {

      console.error(error);

    }
  }

  edit(produit: any) {

    this.editingId.set(produit.id);

    this.form.patchValue({
      nomProduit: produit.nomProduit,

      prixUnitaireProduit:
        produit.prixUnitaireProduit,

      categorieId: produit.categorieId,
    });
  }

  async delete(id: number) {

    await this.produitService.deleteProduit(id);

  }

  cancelEdit() {

    const firstCategorie =
      this.categorieService.categories()[0];

    this.editingId.set(null);

    this.form.reset({
      nomProduit: '',
      prixUnitaireProduit: 1,
      categorieId: firstCategorie?.id ?? null,
    });
  }
}