import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  clientService = inject(ClientService);
  fb = inject(FormBuilder);

  editingId = signal<number | null>(null);

  form = this.fb.group({
    nomClient: ['', Validators.required],
    adresseClient: ['', Validators.required],
    telClient: ['', Validators.required],
    typeClientId: [1, Validators.required],
  });

  ngOnInit() {
    this.clientService.loadClients();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    if (this.editingId()) {
      await this.clientService.updateClient(this.editingId()!, data);
    } else {
      await this.clientService.createClient(data);
    }

    this.form.reset({
      nomClient: '',
      adresseClient: '',
      telClient: '',
      typeClientId: 1,
    });

    this.editingId.set(null);
  }

  edit(client: any) {
    this.editingId.set(client.id);

    this.form.patchValue({
      nomClient: client.nomClient,
      adresseClient: client.adresseClient,
      telClient: client.telClient,
      typeClientId: client.typeClientId,
    });
  }

  async delete(id: number) {
    await this.clientService.deleteClient(id);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.form.reset({
      nomClient: '',
      adresseClient: '',
      telClient: '',
      typeClientId: 1,
    });
  }
}