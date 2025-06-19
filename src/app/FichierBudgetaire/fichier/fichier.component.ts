import { Component, OnInit } from '@angular/core';// adapte le chemin si besoin
import { FichierService } from '../../services/fichier.service';
import { CommonModule } from '@angular/common';
import { AjouterFichierComponent } from '../ajouter-fichier/ajouter-fichier.component';
import { ModifierFichierComponent } from '../modifier-fichier/modifier-fichier.component';

@Component({
  selector: 'app-fichier',
  imports:[CommonModule,AjouterFichierComponent,ModifierFichierComponent],
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css'] // ici c'était "styleUrl" -> il faut "styleUrls"
})
export class FichierComponent implements OnInit {

  fichiers: any[] = [];
  fichierAModifier: any = null;

  constructor(private fichierService: FichierService) {}

  ngOnInit(): void {
    this.fichierService.getAllFichiers().then(data => {
      this.fichiers = data;
      console.log("Fichiers dans le composant :", this.fichiers);
    }).catch(error => {
      console.error("Erreur dans le composant :", error);
    });
  }
  getFichierUrl(fichier: string): string {
    const filename = fichier.split('/').pop(); // Récupère juste le nom du fichier
    return `http://localhost:8070/uploads/fichiersBudgeters/${filename}`;
  }
  
  onFichierAdded(nouveauFichier: any) {
    console.log('Fichier ajouté reçu:', nouveauFichier);
    this.fichiers = [...this.fichiers, nouveauFichier];
  }

  ouvrirModalModification(fichier: any) {
  this.fichierAModifier = { ...fichier }; // On clone pour éviter de modifier la liste directement
}
  
  
  
  

}
