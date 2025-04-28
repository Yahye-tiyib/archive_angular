import { Component } from '@angular/core';
import { FichierService } from '../../services/fichier.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-fichier-du-box',
  imports: [CommonModule],
  templateUrl: './fichier-du-box.component.html',
  styleUrl: './fichier-du-box.component.css'
})
export class FichierDuBoxComponent {

  fichiers: any[] = [];
  boxId: string | null = null; 
  boxName: string | null = null;
  
  constructor(private fichierService: FichierService,private route: ActivatedRoute ,private boxService: BoxService) {}

  ngOnInit(): void {
    const boxId = this.route.snapshot.paramMap.get('id');
    console.log('Box ID reçu:', boxId);
  
    if (boxId) {
      this.boxId = boxId;
  
      this.fichierService.getFichiersByBox(Number(boxId))
        .then((data: any) => {
          this.fichiers = data;
          console.log("Fichiers liés au box :", this.fichiers);
        })
        .catch((error: any) => {
          console.error("Erreur dans le chargement des fichiers :", error);
        });
  
        this.boxService.getBoxById(Number(boxId))
        .then((boxData: any) => {
          this.boxName = boxData.nom; // <-- maintenant c'est propre
          console.log("Nom du box récupéré :", this.boxName);
        })
        .catch((error: any) => {
          console.error("Erreur dans le chargement du box :", error);
        });
  
    } else {
      console.error("Aucun ID de box trouvé dans l'URL.");
    }
  }
  
  
  getFichierUrl(fichier: string): string {
    const filename = fichier.split('/').pop(); // Récupère juste le nom du fichier
    return `http://localhost:8076/uploads/fichiers/${filename}`;
  }

}
