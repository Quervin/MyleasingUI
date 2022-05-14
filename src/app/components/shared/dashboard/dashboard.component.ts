import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  items: MenuItem[];

  chartData: any;

  chartOptions: any;
  
  constructor() { 
    this.items = [];
  }

  ngOnInit(): void {
    this.updateChartOptions();

    this.items = [
      {label: 'Add New', icon: 'pi pi-fw pi-plus'},
      {label: 'Remove', icon: 'pi pi-fw pi-minus'}
    ];

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: '#2f4860',
              borderColor: '#2f4860',
              tension: .4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              backgroundColor: '#00bb7e',
              borderColor: '#00bb7e',
              tension: .4
          }
      ]
  };
  }

  updateChartOptions() {
    this.chartOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color:  '#ebedef',
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color:  '#ebedef',
              }
          },
      }
  };
  }

}
