import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoxService } from '../../services/box.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-box.component.html',
  styleUrls: ['./modifier-box.component.css']
})
export class ModifierBoxComponent {
  @Input() box: any = null;
  @Output() boxUpdated = new EventEmitter<void>();

  constructor(private boxService: BoxService) {}

  updateBox() {
    if (this.box) {
      console.log('Mise à jour de la box', this.box); // Vérifie les données avant l'envoi
      this.boxService.modifierBox(this.box.id, {
        mois: this.box.mois,
        annee: this.box.annee,
        nom: this.box.nom,
        dateDebut: this.box.dateDebut,
        dateFin: this.box.dateFin,
        statut: this.box.statut
      }).then(() => {
        console.log('Box mise à jour avec succès');
        this.boxUpdated.emit(); // Émettre l'événement
  
        // Sélectionner le modal et simuler un clic sur le bouton de fermeture
        const modalElement = document.getElementById('modifyBoxModal');
        if (modalElement) {
          const closeButton = modalElement.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
          if (closeButton) {
            closeButton.click(); // Simuler un clic pour fermer le modal
          }
        }
      }).catch(err => console.error("Erreur lors de la mise à jour de la box", err));
    }
  }
  
}
