import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { LineChartComponent } from "./app/line-chart/line-chart.component";
(async () => {

  const app = await createApplication({
    providers: [
      /* your global providers here */
    ]
  });

  const lineChartElement = createCustomElement(LineChartComponent, {
    injector: app.injector,
  });

  customElements.get('app-line-chart') || customElements.define('app-line-chart', lineChartElement);

})();
