import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CodePostalService } from '../../services/code-postal.service';

@Component({
  selector: 'app-codes-postaux',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './codes-postaux.component.html',
  styleUrl: './codes-postaux.component.css',
})
export class CodesPostauxComponent implements OnInit {
  codePostalService = inject(CodePostalService);
  fb = inject(FormBuilder);

  editingCodePostal = signal<string | null>(null);

  form = this.fb.group({
    codePostal: ['', Validators.required],
    ville: ['', Validators.required],
  });

  ngOnInit() {
    this.codePostalService.loadCodesPostaux();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      codePostal: this.form.value.codePostal!,
      ville: this.form.value.ville!,
    };

    if (this.editingCodePostal()) {
      await this.codePostalService.updateCodePostal(this.editingCodePostal()!, {
        ville: data.ville,
      });
    } else {
      await this.codePostalService.createCodePostal(data);
    }

    this.cancelEdit();
  }

  edit(code: any) {
    this.editingCodePostal.set(code.codePostal);

    this.form.patchValue({
      codePostal: code.codePostal,
      ville: code.ville,
    });

    this.form.controls.codePostal.disable();
  }

  async delete(codePostal: string) {
    await this.codePostalService.deleteCodePostal(codePostal);
  }

  cancelEdit() {
    this.editingCodePostal.set(null);
    this.form.controls.codePostal.enable();

    this.form.reset({
      codePostal: '',
      ville: '',
    });
  }
}