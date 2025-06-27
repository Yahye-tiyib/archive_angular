import { Component, Input, OnInit } from '@angular/core';// adapte le chemin
import { BoxService } from '../../services/box.service';
import { FichierService } from '../../services/fichier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select'; 
@Component({
  selector: 'app-modifier-fichier',
  imports:[CommonModule,FormsModule,NgSelectModule],
  templateUrl: './modifier-fichier.component.html',
  styleUrls: ['./modifier-fichier.component.css']
})
export class ModifierFichierComponent implements OnInit {

  @Input() fichier: any = {};
  selectedFile: File | null = null;
  boxes: any[] = [];

  constructor(private boxService: BoxService, private fichierService: FichierService) { }

  ngOnInit(): void {
    this.loadBoxes();
  }

  loadBoxes() {
    this.boxService.getBoxesOuvertes()
      .then(boxes => {
        this.boxes = boxes;
      })
      .catch(error => {
        console.error('Erreur chargement boxes:', error);
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpdate() {
    const formData = new FormData();
    formData.append('nomEtablissement', this.fichier.nomEtablissement);
    formData.append('referenceLettre', this.fichier.referenceLettre);
    formData.append('objet', this.fichier.objet);
    formData.append('dateReception', this.fichier.dateReception);
    formData.append('traiter', this.fichier.traiter ? 'true' : 'false');
    formData.append('boxId', this.fichier.boxId);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.fichierService.updateFichier(this.fichier.id, formData)
      .then(response => {
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
        console.log('Fichier mis à jour:', response);
        // Optionnel : Fermer le modal ici
      })
      .catch(error => {
        console.error('Erreur modification fichier:', error);
      });
  }
}
