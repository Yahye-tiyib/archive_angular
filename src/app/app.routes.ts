import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoxComponent } from './Box/box/box.component';
import { authGuard } from './auth.guard';
import { FichierComponent } from './FichierBudgetaire/fichier/fichier.component';
import { LesBoxsComponent } from './Box/les-boxs/les-boxs.component';
import { FichierDuBoxComponent } from './FichierBudgetaire/fichier-du-box/fichier-du-box.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, data: { showNavbar: false } },
  { path: 'box', component: BoxComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'fichier', component: FichierComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'fichier/:id', component: FichierDuBoxComponent, canActivate: [authGuard], data: { showNavbar: true } },

  { path: 'boxs', component: LesBoxsComponent, canActivate: [authGuard], data: { showNavbar: true } },


];