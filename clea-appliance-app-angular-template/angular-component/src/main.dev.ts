import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LineChartComponent } from "./app/line-chart/line-chart.component";

const app = platformBrowserDynamic();
app.bootstrapModule(AppModule)
    .catch(err => console.error(err));

const lineChartElement = createCustomElement(LineChartComponent, {
    injector: app.injector,
});

customElements.get('app-line-chart') || customElements.define('app-line-chart', lineChartElement);


