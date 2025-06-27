import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FichierService } from '../services/fichier.service';
import { Chart, registerables, ChartConfiguration, ChartOptions } from 'chart.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  @ViewChild('traitementChartCanvas') traitementChartCanvas!: ElementRef<HTMLCanvasElement>;
  traitementChart!: Chart;
  @ViewChild('statutPieCanvas') statutPieCanvas!: ElementRef<HTMLCanvasElement>;
  statutPieChart!: Chart;
  @ViewChild('topEtablissementsCanvas') topEtablissementsCanvas!: ElementRef<HTMLCanvasElement>;
  topEtablissementsChart!: Chart;

  dataLabels: string[] = [];
  dataValues: number[] = [];
  annee__: number = 0;
  dataReady = false;

  constructor(private fichierService: FichierService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const annee = new Date().getFullYear();
    this.loadBoxesByYear(annee);
  }

  loadBoxesByYear(annee: number) {
    if (!annee || annee < 1900) return;
    this.annee__ = annee;

    this.fichierService.getFichiersParMois(annee).then(data => {
      this.dataLabels = Object.keys(data).map(mois => `Mois ${mois}`);
      this.dataValues = Object.values(data) as number[];
      this.dataReady = true;
      this.tryCreateChart();
    });

    this.fichierService.getTraitementParMois(annee).then(data => {
      const dataMap = new Map<number, { traites: number, nonTraites: number }>(
        Object.entries(data).map(([key, value]) => [Number(key), value])
      );

      const moisOrdonnes = Array.from(dataMap.keys()).sort((a, b) => a - b);
      const labels = moisOrdonnes.map(mois => `Mois ${mois}`);
      const traites: number[] = [];
      const nonTraites: number[] = [];

      moisOrdonnes.forEach(mois => {
        const valeur = dataMap.get(mois);
        if (valeur) {
          traites.push(valeur.traites);
          nonTraites.push(valeur.nonTraites);
        } else {
          traites.push(0);
          nonTraites.push(0);
        }
      });

      this.createTraitementBarChart(labels, traites, nonTraites);
    });

    this.fichierService.getStatutBoxes().then(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.createStatutPieChart(labels, values);
    });

    this.fichierService.getTopEtablissements().then(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.createTopEtablissementsChart(labels, values);
    });
  }

  ngAfterViewInit(): void {
    this.tryCreateChart();
  }

  tryCreateChart() {
    if (this.dataReady && this.chartCanvas) {
      if (this.chart) {
        this.chart.destroy();
      }
      const config: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: this.dataLabels,
          datasets: [{
            label: 'Nombre de fichiers',
            data: this.dataValues,
            backgroundColor: 'rgba(66, 165, 245, 0.7)',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          }
        } as ChartOptions<'bar'>
      };
      this.chart = new Chart(this.chartCanvas.nativeElement, config);
    }
  }

  createTraitementBarChart(labels: string[], traites: number[], nonTraites: number[]) {
    if (this.traitementChart) {
      this.traitementChart.destroy();
    }

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Fichiers traités',
            data: traites,
            backgroundColor: 'rgba(76, 175, 80, 0.7)',
          },
          {
            label: 'Fichiers non traités',
            data: nonTraites,
            backgroundColor: 'rgba(244, 67, 54, 0.7)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    };

    this.traitementChart = new Chart(this.traitementChartCanvas.nativeElement, config);
  }

  createStatutPieChart(labels: string[], values: number[]) {
    if (this.statutPieChart) {
      this.statutPieChart.destroy();
    }

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Statut des boxes',
          data: values,
          backgroundColor: [
            'red',
            'green'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    };

    this.statutPieChart = new Chart(this.statutPieCanvas.nativeElement, config);
  }

  createTopEtablissementsChart(labels: string[], values: number[]) {
    if (this.topEtablissementsChart) {
      this.topEtablissementsChart.destroy();
    }

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Top établissements',
          data: values,
          backgroundColor: 'rgba(33, 150, 243, 0.7)',
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    };

    this.topEtablissementsChart = new Chart(this.topEtablissementsCanvas.nativeElement, config);
  }
}
