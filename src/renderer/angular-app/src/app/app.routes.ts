import { Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { DimensionsComponent } from './pages/dimensions/dimensions.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { CommandeProduitsComponent } from './pages/commande-produits/commande-produits.component';
import { PersonnelsComponent } from './pages/personnels/personnels.component';
import { PersonnelCommandesComponent } from './pages/personnel-commandes/personnel-commandes.component';
import {CodesPostauxComponent } from './pages/codes-postaux/codes-postaux.component';
import { ChantiersComponent } from './pages/chantiers/chantiers.component';
import { ClientChantiersComponent } from './pages/client-chantiers/client-chantiers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent, },
  { path: 'categories', component: CategoriesComponent, },
  { path: 'dimensions', component: DimensionsComponent, },
  { path: 'produits', component: ProduitsComponent, },
  { path: 'commandes', component: CommandesComponent, },
  { path: 'commande-produits', component: CommandeProduitsComponent, },
  { path: 'personnels', component: PersonnelsComponent, },
  { path: 'personnel-commandes', component: PersonnelCommandesComponent, },
  { path: 'codes-postaux', component: CodesPostauxComponent, },
  { path: 'chantiers', component: ChantiersComponent, },
  { path: 'client-chantiers', component: ClientChantiersComponent, },
  { path: 'dashboard', component: DashboardComponent, },
];