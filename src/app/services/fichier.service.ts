import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FichierService {
  private url = "http://localhost:8070/api/fichiers";

  constructor() { }

  // 1. Récupérer tous les fichiers
  getAllFichiers(): Promise<any> {
    return fetch(`${this.url}/all`)
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
  // 2. Supprimer un fichier par son ID
    deleteFichier(id: number): Promise<void> {
      return fetch(`${this.url}/supprimer/${id}`, {
        method: 'DELETE'
      }).then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du fichier");
        }
        console.log(`Fichier avec ID ${id} supprimé`);
      }).catch(error => {
        console.error('Erreur de suppression :', error);
        throw error;
      });
    }


  // 2. Récupérer les fichiers d'un box donné
  getFichiersByBox(boxId: number): Promise<any> {
    return fetch(`${this.url}/box/${boxId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des fichiers du box');
        }
        return response.json();
      })
      .then(data => {
        console.log(`Fichiers du box ${boxId}:`, data);
        return data;
      })
      .catch(error => {
        console.error('Erreur fetch:', error);
        throw error;
      });
  }

  // 3. Récupérer les statistiques d'un box donné
  getStatistiquesByBox(boxId: number): Promise<any> {
    return fetch(`${this.url}/statistiques/${boxId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des statistiques du box');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Erreur fetch statistiques:', error);
        throw error;
      });
  }
  ajouterFichier(formData: FormData): Promise<any> {
    return fetch(`${this.url}/ajouter`, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du fichier');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fichier ajouté:', data);
        return data;
      })
      .catch(error => {
        console.error('Erreur fetch ajout fichier:', error);
        throw error;
      });
  }

  updateFichier(id: number, fichierData: FormData): Promise<any> {
  return fetch(`${this.url}/modifier/${id}`, {
    method: 'PUT',
    body: fichierData
  }).then(res => res.json());
}

getFichiersParMois(annee: number): Promise<Map<number, number>> {
  return fetch(`${this.url}/statistiques/fichiers-par-mois?annee=${annee}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des fichiers par mois');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erreur fetch fichiers par mois:', error);
      throw error;
    });
}


getTraitementParMois(annee: number): Promise<Map<number, { traites: number, nonTraites: number }>> {
  return fetch(`${this.url}/statistiques/traitement-par-mois?annee=${annee}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du traitement par mois');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erreur fetch traitement par mois:', error);
      throw error;
    });
}


getStatutBoxes(): Promise<Map<string, number>> {
  return fetch(`${this.url}/statistiques/statut-boxes`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statuts des boxes');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erreur fetch statut boxes:', error);
      throw error;
    });
}

getTopEtablissements(): Promise<Map<string, number>> {
  return fetch(`${this.url}/statistiques/top-etablissements`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du top des établissements');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erreur fetch top établissements:', error);
      throw error;
    });
}

}
