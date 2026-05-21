import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ChantierService } from '../../services/chantier.service';
import { CodePostalService } from '../../services/code-postal.service';

@Component({
  selector: 'app-chantiers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chantiers.component.html',
  styleUrl: './chantiers.component.css',
})
export class ChantiersComponent implements OnInit {
  chantierService = inject(ChantierService);
  codePostalService = inject(CodePostalService);
  fb = inject(FormBuilder);

  editingId = signal<number | null>(null);

  form = this.fb.group({
    nomChantier: ['', Validators.required],
    rue: ['', Validators.required],
    dateDebutChantier: ['', Validators.required],
    dateFinChantier: ['', Validators.required],
    codePostal: ['', Validators.required],
  });

  async ngOnInit() {
    await this.codePostalService.loadCodesPostaux();
    await this.chantierService.loadChantiers();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      nomChantier: this.form.value.nomChantier!,
      rue: this.form.value.rue!,
      dateDebutChantier: this.form.value.dateDebutChantier!,
      dateFinChantier: this.form.value.dateFinChantier!,
      codePostal: this.form.value.codePostal!,
    };

    if (this.editingId()) {
      await this.chantierService.updateChantier(this.editingId()!, data);
    } else {
      await this.chantierService.createChantier(data);
    }

    this.cancelEdit();
  }

  edit(chantier: any) {
    this.editingId.set(chantier.id);

    this.form.patchValue({
      nomChantier: chantier.nomChantier,
      rue: chantier.rue,
      dateDebutChantier: chantier.dateDebutChantier,
      dateFinChantier: chantier.dateFinChantier,
      codePostal: chantier.codePostal,
    });
  }

  async delete(id: number) {
    await this.chantierService.deleteChantier(id);
  }

  cancelEdit() {
    this.editingId.set(null);

    this.form.reset({
      nomChantier: '',
      rue: '',
      dateDebutChantier: '',
      dateFinChantier: '',
      codePostal: '',
    });
  }
}