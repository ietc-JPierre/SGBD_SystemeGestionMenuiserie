import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';

@Component({
  selector: 'app-personnels',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personnels.component.html',
  styleUrl: './personnels.component.css',
})
export class PersonnelsComponent implements OnInit {
  personnelService = inject(PersonnelService);
  fb = inject(FormBuilder);

  editingId = signal<string | null>(null);

  form = this.fb.group({
    id: ['', Validators.required],
    nom: ['', Validators.required],
    role: ['', Validators.required],
  });

  ngOnInit() {
    this.personnelService.loadPersonnels();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      id: this.form.value.id!,
      nom: this.form.value.nom!,
      role: this.form.value.role!,
    };

    if (this.editingId()) {
      await this.personnelService.updatePersonnel(this.editingId()!, {
        nom: data.nom,
        role: data.role,
      });
    } else {
      await this.personnelService.createPersonnel(data);
    }

    this.cancelEdit();
  }

  edit(personnel: any) {
    this.editingId.set(personnel.id);

    this.form.patchValue({
      id: personnel.id,
      nom: personnel.nom,
      role: personnel.role,
    });

    this.form.controls.id.disable();
  }

  async delete(id: string) {
    await this.personnelService.deletePersonnel(id);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.form.controls.id.enable();

    this.form.reset({
      id: '',
      nom: '',
      role: '',
    });
  }
}