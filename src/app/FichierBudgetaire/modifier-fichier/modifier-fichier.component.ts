import { Component, Input, OnInit } from '@angular/core';
import { BoxService } from '../../services/box.service';
import { FichierService } from '../../services/fichier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

declare var bootstrap: any; // Nécessaire pour utiliser Bootstrap JS

@Component({
  selector: 'app-modifier-fichier',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './modifier-fichier.component.html',
  styleUrls: ['./modifier-fichier.component.css']
})
export class ModifierFichierComponent implements OnInit {

  @Input() fichier: any = {};
  selectedFile: File | null = null;
  boxes: any[] = [];

  constructor(
    private boxService: BoxService,
    private fichierService: FichierService
  ) {}

  ngOnInit(): void {
    this.loadBoxes();
  }

  loadBoxes() {
    this.boxService.getBoxesOuvertes()
      .then(boxes => this.boxes = boxes)
      .catch(error => console.error('Erreur chargement boxes:', error));
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
        console.log('Fichier mis à jour:', response);

        // ✅ Fermer le modal avec Bootstrap
        const modalElement = document.getElementById('modifierFichierModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }
      })
      .catch(error => console.error('Erreur modification fichier:', error));
  }
}
