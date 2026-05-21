import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClientChantierService } from '../../services/client-chantier.service';
import { ClientService } from '../../services/client.service';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-client-chantiers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-chantiers.component.html',
  styleUrl: './client-chantiers.component.css',
})
export class ClientChantiersComponent implements OnInit {
  clientChantierService = inject(ClientChantierService);
  clientService = inject(ClientService);
  chantierService = inject(ChantierService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    clientId: [1, Validators.required],
    chantierId: [1, Validators.required],
  });

  async ngOnInit() {
    await this.clientService.loadClients();
    await this.chantierService.loadChantiers();
    await this.clientChantierService.loadClientChantiers();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      clientId: Number(this.form.value.clientId),
      chantierId: Number(this.form.value.chantierId),
    };

    await this.clientChantierService.createClientChantier(data);

    this.form.reset({
      clientId: 1,
      chantierId: 1,
    });
  }

  async delete(association: any) {
    await this.clientChantierService.deleteClientChantier({
      clientId: association.clientId,
      chantierId: association.chantierId,
    });
  }
}