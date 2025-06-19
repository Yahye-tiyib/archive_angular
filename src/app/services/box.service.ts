import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  private baseUrl = 'http://localhost:8070/api/box';

  constructor() { }

  // ✅ Récupérer toutes les BoxMensuelle
  getAllBoxes(): Promise<any[]> {
    return fetch(`${this.baseUrl}/all`)
      .then(res => res.json());
  }
  getBoxesOuvertes(): Promise<any[]> {
  return fetch(`${this.baseUrl}/ouvertes`)
    .then(res => res.json());
  }

  // ✅ Ajouter une BoxMensuelle
  ajouterBox(box: any): Promise<any> {
    return fetch(`${this.baseUrl}/ajouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(box)
    }).then(res => res.json());
  }

  // ✅ Gérer automatiquement la box mensuelle
  gererBoxMensuelle(): Promise<void> {
    return fetch(`${this.baseUrl}/gerer`, {
      method: 'POST'
    }).then(() => {});
  }

  // ✅ Modifier une BoxMensuelle
  modifierBox(id: number, box: any): Promise<any> {
    return fetch(`${this.baseUrl}/modifier/${id}`, {  // L'ID est passé dans l'URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(box)  // Envoi de l'objet box complet dans le corps de la requête
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error('Erreur lors de la requête fetch :', err);
      throw err;  // Relance l'erreur pour la capturer dans le composant
    });
  }
  async getAllBoxesByYear(annee: number): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/boxes_year?annee=${annee}`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des Box');
    }
    return await response.json();
  }
  
  

  // ✅ Supprimer une BoxMensuelle
  supprimerBox(id: number): Promise<void> {
    return fetch(`${this.baseUrl}/supprimer/${id}`, {
      method: 'DELETE'
    }).then(() => {});
  }
  getBoxById(boxId: number): Promise<any> {
    const url = `http://localhost:8070/api/box/${boxId}`;
  
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();  // Parse la réponse JSON
      })
      .then(data => {
        console.log('Box récupéré:', data);  // Vérifie la réponse du backend
        return data;  // Retourne les détails du box
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du box :', error);
        throw error;  // Gère l'erreur
      });
  }
  
}
