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
  fichiersTraites: any[] = [];
  fichiersNonTraites: any[] = [];
  boxId: string | null = null; 
  boxName: string | null = null;

  showTraites: boolean = false;
  showNonTraites: boolean = false;

  constructor(
    private fichierService: FichierService,
    private route: ActivatedRoute,
    private boxService: BoxService
  ) {}

  ngOnInit(): void {
    const boxId = this.route.snapshot.paramMap.get('id');
    if (boxId) {
      this.boxId = boxId;

      this.fichierService.getFichiersByBox(Number(boxId))
        .then((data: any) => {
          this.fichiers = data;
          this.fichiersTraites = this.fichiers.filter(fichier => fichier.traiter === true);
          this.fichiersNonTraites = this.fichiers.filter(fichier => fichier.traiter === false);
        })
        .catch((error: any) => {
          console.error("Erreur dans le chargement des fichiers :", error);
        });

      this.boxService.getBoxById(Number(boxId))
        .then((boxData: any) => {
          this.boxName = boxData.nom;
        })
        .catch((error: any) => {
          console.error("Erreur dans le chargement du box :", error);
        });
    }
  }

  getFichierUrl(fichier: string): string {
    const filename = fichier.split('/').pop();
    return `http://localhost:8070/uploads/fichiersBudgeters/${filename}`;
  }

  toggleTraites() {
    this.showTraites = !this.showTraites;
    if (this.showTraites) {
      this.showNonTraites = false;
    }
  }

  toggleNonTraites() {
    this.showNonTraites = !this.showNonTraites;
    if (this.showNonTraites) {
      this.showTraites = false;
    }
  }
}
