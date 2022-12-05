import { Component, ElementRef, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';



interface SensorDataParameters {
  deviceId: string;
  sensorId: string;
  sinceAfter?: string;
  since?: Date;
  to?: Date;
  limit?: number;
};
interface AppProps {
  astarteUrl: URL;
  realm: string;
  token: string;
  deviceId: string;
};

@Component({
  standalone: true,
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.sass'],
  imports: [CommonModule, HttpClientModule, NgChartsModule]
})
export class LineChartComponent implements OnInit {


  title = 'ng2-charts-demo';
  public appProps: AppProps | undefined;
  settings: any | undefined;
  public lineChartData: ChartConfiguration<'line'>['data'] | undefined;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      title: {
        text: 'Battery Percentage',
        display: true
      }
    }
  };
  public lineChartLegend = true;

  constructor(public elementRef: ElementRef, private http: HttpClient) {
    this.appProps = JSON.parse(this.elementRef.nativeElement.getAttribute('appProps'));
    this.settings = JSON.parse(this.elementRef.nativeElement.getAttribute('settings'));
  }

  ngOnInit() {


    const interfaceName = "io.edgehog.devicemanager.BatteryStatus";
    const slot = 0;
    const path = `appengine/v1/${this.appProps?.realm}/devices/${this.appProps?.deviceId}/interfaces/${interfaceName}/${slot}`;
    const requestUrl = new URL(path, this.appProps?.astarteUrl);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.appProps?.token}`
      })
    };

    const response = this.http.get(requestUrl.toString(), httpOptions)
    response.subscribe((resp: any) => {
      const data = resp.data as Array<any>;
      this.lineChartData = {
        labels: data.map(d => d.timestamp),
        datasets: [
          {
            data: data.map(d => d.levelPercentage),
            label: this.appProps?.deviceId,
            tension: 0.5
          }
        ]
      };
    })
  }
}
