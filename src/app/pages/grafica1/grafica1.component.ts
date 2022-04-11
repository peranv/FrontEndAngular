import { Component } from '@angular/core';
import { ChartData} from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1: string[] = [ 'Pan2', 'Refresco', 'Tacos' ];
  public labels2: string[] = [ 'Pan', 'Vegetales', 'Tacos' ];
  data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 10, 20, 40 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        //hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
   
  }

  data2: ChartData<'doughnut'> = {
    labels: this.labels2,
    datasets: [
      { data: [ 30, 10, 50 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        //hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
   
  }

}
