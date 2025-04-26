import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  private baseUrl = 'http://localhost:8076/api/box';

  constructor() { }

  // ✅ Récupérer toutes les BoxMensuelle
  getAllBoxes(): Promise<any[]> {
    return fetch(`${this.baseUrl}/all`)
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
  
  

  // ✅ Supprimer une BoxMensuelle
  supprimerBox(id: number): Promise<void> {
    return fetch(`${this.baseUrl}/supprimer/${id}`, {
      method: 'DELETE'
    }).then(() => {});
  }
}
