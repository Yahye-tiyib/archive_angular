import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AjouterBoxComponent } from '../ajouter-box/ajouter-box.component';
import { ModifierBoxComponent } from '../modifier-box/modifier-box.component';
import { CommonModule } from '@angular/common';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  standalone: true,
  imports: [CommonModule, AjouterBoxComponent, ModifierBoxComponent]
})
export class BoxComponent {
  boxes: any[] = [];
  selectedBox: any = null;

  constructor(
    private boxService: BoxService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadBoxes();
  }

  loadBoxes() {
    this.boxService.getAllBoxes().then(data => {
      this.boxes = data;
      console.log(data)
    }).catch(err => console.error(err));
  }

  openModal(box: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedBox = { ...box };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyBoxModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          });
        }
      }, 0);
    }
  }
  
  onBoxUpdated() {
    console.log('Box mise à jour');
    this.loadBoxes(); // Recharger les données des boxes
    
    // Ajouter un petit délai pour garantir que les actions sont bien synchronisées
    setTimeout(() => {
      const modalElement = document.getElementById('modifyBoxModal');
      if (modalElement) {
        import('bootstrap').then((bootstrap) => {
          const modal = new bootstrap.Modal(modalElement);
          modal.hide(); // Fermer le modal après la mise à jour
        });
      }
    }, 100); // Délai de 100ms
  }
  
  
  

  deleteBox(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Box ?')) {
      this.boxService.supprimerBox(id).then(() => {
        this.boxes = this.boxes.filter(box => box.id !== id);
      }).catch(err => console.error(err));
    }
  }

  onBoxAdded(newBox: any) {
    const modalElement = document.getElementById('addBoxModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      });
    }
    this.boxes = [...this.boxes, newBox];
  }
  gererBox() {
    this.boxService.gererBoxMensuelle().then(() => {
      console.log('Box générée automatiquement');
      this.loadBoxes(); // recharge la liste des box dans l'interface
    }).catch(err => console.error('Erreur:', err));
  }
  
  
}
