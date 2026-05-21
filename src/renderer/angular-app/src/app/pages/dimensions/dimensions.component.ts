import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DimensionService } from '../../services/dimension.service';

@Component({
  selector: 'app-dimensions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dimensions.component.html',
  styleUrl: './dimensions.component.css',
})
export class DimensionsComponent implements OnInit {
  dimensionService = inject(DimensionService);
  fb = inject(FormBuilder);

  editingId = signal<number | null>(null);

  form = this.fb.group({
    hauteur: [0, [Validators.required, Validators.min(0)]],
    section: [0, [Validators.required, Validators.min(0)]],
    largeur: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    this.dimensionService.loadDimensions();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      hauteur: Number(this.form.value.hauteur),
      section: Number(this.form.value.section),
      largeur: Number(this.form.value.largeur),
    };

    if (this.editingId()) {
      await this.dimensionService.updateDimension(this.editingId()!, data);
    } else {
      await this.dimensionService.createDimension(data);
    }

    this.cancelEdit();
  }

  edit(dimension: any) {
    this.editingId.set(dimension.id);

    this.form.patchValue({
      hauteur: dimension.hauteur,
      section: dimension.section,
      largeur: dimension.largeur,
    });
  }

  async delete(id: number) {
    await this.dimensionService.deleteDimension(id);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.form.reset({
      hauteur: 0,
      section: 0,
      largeur: 0,
    });
  }
}