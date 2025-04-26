import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FichierService {
  private url = "http://localhost:8076/api/fichiers/all";

  constructor() { }

  getAllFichiers(): Promise<any> {
    return fetch(`${this.url}`) // <--- ici c'était le souci
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des fichiers');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fichiers récupérés:', data);
        return data;
      })
      .catch(error => {
        console.error('Erreur fetch:', error);
        throw error;
      });
  }
}
