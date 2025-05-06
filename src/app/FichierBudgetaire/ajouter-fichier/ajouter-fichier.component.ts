import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FichierService } from '../../services/fichier.service';
import { BoxService } from '../../services/box.service';  // Importer le service Box
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';  // Importer le module NgSelectModule

@Component({
  selector: 'app-ajouter-fichier',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],  // Ajouter NgSelectModule dans imports
  templateUrl: './ajouter-fichier.component.html',
  styleUrls: ['./ajouter-fichier.component.css']
})
export class AjouterFichierComponent implements OnInit {
  fichier: any = {
    nomfichier: '',
    dateReception: '',
    traiter: false,
    boxId: ''
  };

  selectedFile: File | null = null;
  listeFichiers: any[] = [];
  boxes: any[] = [];  // Liste des boxes récupérées du service
  @Output() fichierAdded = new EventEmitter<any>(); // Émettre l'événement fichier ajouté

  constructor(private fichierService: FichierService, private boxService: BoxService) {}

  ngOnInit(): void {
    console.log('AjouterFichierComponent initialisé');
    this.loadFichiers();
    this.loadBoxes();  // Charger les boxes dès le début
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('nomfichier', this.fichier.nomfichier);
    formData.append('dateReception', this.fichier.dateReception);
    formData.append('traiter', this.fichier.traiter.toString());
    formData.append('boxId', this.fichier.boxId.toString());
    formData.append('file', this.selectedFile);

    this.fichierService.ajouterFichier(formData)
      .then(data => {
        console.log('Fichier ajouté:', data);

        // Fermer le modal
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }

        // Émettre l'événement à l'extérieur
        this.fichierAdded.emit(data);

        // Réinitialiser les champs
        this.fichier = { nomfichier: '', dateReception: '', traiter: false, boxId: '' };
        this.selectedFile = null;

        // Recharger la liste des fichiers
        this.loadFichiers();
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }

  loadFichiers() {
    this.fichierService.getAllFichiers()
      .then(fichiers => {
        this.listeFichiers = fichiers;
        console.log('Liste fichiers:', this.listeFichiers);
      })
      .catch(error => {
        console.error('Erreur chargement fichiers:', error);
      });
  }

  loadBoxes() {
    this.boxService.getAllBoxes()
      .then(boxes => {
        this.boxes = boxes;
        console.log('Liste des boxes:', this.boxes);
      })
      .catch(error => {
        console.error('Erreur chargement boxes:', error);
      });
  }
}
