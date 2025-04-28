import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoxService } from '../../services/box.service';
import { FichierService } from '../../services/fichier.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-les-boxs',
  standalone: true,
  templateUrl: './les-boxs.component.html',
  styleUrl: './les-boxs.component.css',
  imports: [CommonModule, FormsModule]
})
export class LesBoxsComponent implements OnInit {
  boxes: any[] = [];
  annee: number = new Date().getFullYear();
  statistiquesByBox: { [key: number]: any } = {}; 

  constructor(
    private boxService: BoxService,
    private fichierService: FichierService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadBoxesByYear(this.annee); // Charger directement les boxes de l'année actuelle
  }

  async loadBoxesByYear(annee: number): Promise<void> {
    if (!annee) return;
  
    try {
      const boxes = await this.boxService.getAllBoxesByYear(annee);
  
      // 🔥 TRIER les boxes par mois AVANT d'afficher
      this.boxes = boxes.sort((a, b) => a.mois - b.mois);
  
      this.loadAllStatistiques();
    } catch (err: any) {
      console.error('Erreur lors du chargement des boxes:', err);
    }
  }
  

  loadAllStatistiques() {
    this.boxes.forEach(box => {
      this.loadStatistiquesForBox(box.id);
    });
  }

  async loadStatistiquesForBox(boxId: number) {
    try {
      const stats = await this.fichierService.getStatistiquesByBox(boxId);
      this.statistiquesByBox[boxId] = stats;
    } catch (err: any) {
      console.error(`Erreur de statistiques pour la box ${boxId}:`, err);
    }
  }

  getMonthName(monthNumber: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[monthNumber - 1] || 'Mois Invalide';
  }

  openDocuments(boxId: number) {
    this.router.navigate(['/fichier', boxId]);
    localStorage.setItem('activeElement', 'box'); // <-- ajoute ceci
  }
  
}
