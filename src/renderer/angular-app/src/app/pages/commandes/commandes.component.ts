import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommandeService } from '../../services/commande.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css',
})
export class CommandesComponent implements OnInit {
  commandeService = inject(CommandeService);
  clientService = inject(ClientService);
  fb = inject(FormBuilder);

  editingId = signal<number | null>(null);

  form = this.fb.group({
    dateCommande: ['', Validators.required],
    montantPaye: [0, [Validators.required, Validators.min(0)]],
    resteAPayer: [0, [Validators.required, Validators.min(0)]],
    statutCommande: ['En attente', Validators.required],
    totalCommande: [0, [Validators.required, Validators.min(0)]],
    clientId: [1, Validators.required],
  });

  async ngOnInit() {
    await this.clientService.loadClients();
     const firstClient = this.clientService.clients()[0];

  if (firstClient) {
    this.form.patchValue({
      clientId: firstClient.id,
    });
  }
    await this.commandeService.loadCommandes();
  }

  async submit() {
    if (this.form.invalid) return;

    const data = {
      dateCommande: this.form.value.dateCommande!,
      montantPaye: Number(this.form.value.montantPaye),
      resteAPayer: Number(this.form.value.resteAPayer),
      statutCommande: this.form.value.statutCommande!,
      totalCommande: Number(this.form.value.totalCommande),
      clientId: Number(this.form.value.clientId),
    };

    if (this.editingId()) {
      await this.commandeService.updateCommande(this.editingId()!, data);
    } else {
      await this.commandeService.createCommande(data);
    }

    this.cancelEdit();
  }

  edit(commande: any) {
    this.editingId.set(commande.id);

    this.form.patchValue({
      dateCommande: commande.dateCommande,
      montantPaye: commande.montantPaye,
      resteAPayer: commande.resteAPayer,
      statutCommande: commande.statutCommande,
      totalCommande: commande.totalCommande,
      clientId: commande.clientId,
    });
  }

  async delete(id: number) {
    await this.commandeService.deleteCommande(id);
  }

  cancelEdit() {
    const firstClient = this.clientService.clients()[0];

    this.editingId.set(null);

    this.form.reset({
      dateCommande: '',
      montantPaye: 0,
      resteAPayer: 0,
      statutCommande: 'En attente',
      totalCommande: 0,
      clientId: firstClient ? firstClient.id : null,

    });
  }
}