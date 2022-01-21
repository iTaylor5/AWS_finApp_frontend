import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public doughnutChartLabels = ['Q1 Growth', 'Q2 Growth', 'Q3 Growth', 'Q4 Growth'];
  public doughnutChartData = [80, 83, 94, 87];
  public doughnutChartType = 'doughnut' as const;

  constructor() { }

  ngOnInit(): void {
  }
}
