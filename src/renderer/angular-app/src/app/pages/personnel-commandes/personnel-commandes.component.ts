import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PersonnelCommandeService } from '../../services/personnel-commande.service';
import { PersonnelService } from '../../services/personnel.service';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-personnel-commandes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personnel-commandes.component.html',
  styleUrl: './personnel-commandes.component.css',
})
export class PersonnelCommandesComponent implements OnInit {
  personnelCommandeService = inject(PersonnelCommandeService);
  personnelService = inject(PersonnelService);
  commandeService = inject(CommandeService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    personnelId: ['', Validators.required],
    commandeId: [1, Validators.required],
  });

  async ngOnInit() {
    await this.personnelService.loadPersonnels();
    await this.commandeService.loadCommandes();
    await this.personnelCommandeService.loadPersonnelCommandes();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      personnelId: this.form.value.personnelId!,
      commandeId: Number(this.form.value.commandeId),
    };

    await this.personnelCommandeService.createPersonnelCommande(data);

    this.form.reset({
      personnelId: '',
      commandeId: 1,
    });
  }

  async delete(affectation: any) {
    await this.personnelCommandeService.deletePersonnelCommande({
      personnelId: affectation.personnelId,
      commandeId: affectation.commandeId,
    });
  }
}