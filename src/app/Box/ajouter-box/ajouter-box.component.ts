import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-ajouter-box',
  templateUrl: './ajouter-box.component.html',
  styleUrls: ['./ajouter-box.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class AjouterBoxComponent {
  box = {
    mois: null,
    annee: null,
    nom: '',
    dateDebut: '',
    dateFin: '',
    statut: 'OUVERTE'
  };

  @Output() boxAdded = new EventEmitter<any>();
  @Output() boxGenerated = new EventEmitter<void>(); 

  constructor(private boxService: BoxService) {}

  onSubmit() {
    if (this.box.mois && this.box.annee && this.box.nom && this.box.dateDebut && this.box.dateFin && this.box.statut) {
      this.boxService.ajouterBox(this.box)
        .then(response => {
          const closeButton = document.querySelector('#addBoxModal .btn-close') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
          this.boxAdded.emit(response);
          this.resetForm();
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la box:', error);
          alert('Erreur lors de l\'ajout de la box');
        });
    }
  }
  gererBox() {
    this.boxService.gererBoxMensuelle().then(() => {
      this.boxGenerated.emit(); // notifie le parent !
    }).catch(err => console.error('Erreur:', err));
  }
  
  resetForm() {
    this.box = {
      mois: null,
      annee: null,
      nom: '',
      dateDebut: '',
      dateFin: '',
      statut: 'OUVERTE'
    };
  }
}
