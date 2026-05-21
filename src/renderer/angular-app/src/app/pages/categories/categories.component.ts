import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  categorieService = inject(CategorieService);
  fb = inject(FormBuilder);

  editingId = signal<number | null>(null);

  form = this.fb.group({
    nomCategorie: ['', Validators.required],
  });

  ngOnInit(): void {
    this.categorieService.loadCategories();
  }

  async submit() {

    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    try {

      if (this.editingId()) {

        await this.categorieService.updateCategory(
          this.editingId()!,
          data
        );

      } else {

        await this.categorieService.createCategory(data);

      }

      this.resetForm();

    } catch (error) {
      console.error(error);
    }

  }

  edit(category: any) {

    this.editingId.set(category.id);

    this.form.patchValue({
      nomCategorie: category.nomCategorie,
    });

  }

  async delete(id: number) {

    const confirmed = confirm(
      'Voulez-vous supprimer cette catégorie ?'
    );

    if (!confirmed) return;

    try {

      await this.categorieService.deleteCategory(id);

    } catch (error) {
      console.error(error);
    }

  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {

    this.editingId.set(null);

    this.form.reset({
      nomCategorie: '',
    });

  }

}