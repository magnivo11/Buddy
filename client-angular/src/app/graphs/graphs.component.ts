import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { Chart } from 'chart.js';
import { Statistic } from '../models/statistic';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartData = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true
        }
      }]
    }
   

  };
  public barChartLegend = true;

  constructor(private stat: StatisticsService) { }

  ngOnInit(): void {
    this.load();

  }

  load() {
    this.stat.getPlantsStatistic().subscribe(res => {

      var count = res.map(o => o.count);
      var plant = res.map(o => o._id);
      this.doughnutChartLabels = plant;
      this.doughnutChartData = count
      this.doughnutChartType = 'doughnut';


    });

    this.stat.getPostsStatistic().subscribe(res => {

      var post = res.map(o => o._id);
      var count = res.map(o => o.count);
      this.barChartLabels = post;
      this.barChartData = [{ data: count, label: 'Count Of Comments' }]

    });

  }



  public colors: any = [{
    borderColor: 'black',
    backgroundColor: ["#f9f990",
      "#90f997",
      "#9790f9",
      "#99e5e5",
      "#f7bd83",
      "#ffbb33",
      "#004d66",
      "#339966",
      "#ffbb33",
      "#ffbb35",
      "#00FFFF",
      "#00FF00",
      "#FFE4C4",
      "#87CEFA",
      "#FFFFE0",
      "#FF00FF",
      "#90f997",
      "#9790f9",
      "#99e5e5",
      "#f7bd83",
      "#ffbb33",
      "#004d66",
      "#339966",
      "#ffbb33",
      "#ffbb35",
      "#00FFFF",
      "#00FF00",
      "#FFE4C4",
      "#87CEFA",
      "#FFFFE0",
      "#FF00FF",
      "#90f997",
      "#9790f9",
      "#99e5e5",
      "#f7bd83",
      "#ffbb33",
      "#004d66",
      "#339966",
      "#ffbb33",
      "#ffbb35",
      "#00FFFF",
      "#00FF00",
      "#FFE4C4",
      "#87CEFA",
      "#FFFFE0",
      "#FF00FF",
      "#90f997",
      "#9790f9",
      "#99e5e5",
      "#f7bd83",
      "#ffbb33",
      "#004d66",
      "#339966",
      "#ffbb33",
      "#ffbb35",
      "#00FFFF",
      "#00FF00",
      "#FFE4C4",
      "#87CEFA",
      "#FFFFE0",
      "#FF00FF",
    ]
  }];

}
