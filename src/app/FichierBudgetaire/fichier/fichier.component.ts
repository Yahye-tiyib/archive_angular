import { Component, OnInit } from '@angular/core';// adapte le chemin si besoin
import { FichierService } from '../../services/fichier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fichier',
  imports:[CommonModule],
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css'] // ici c'était "styleUrl" -> il faut "styleUrls"
})
export class FichierComponent implements OnInit {

  fichiers: any[] = [];

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
    return `http://localhost:8076/uploads/fichiers/${filename}`;
  }
  
  
  
  

}
