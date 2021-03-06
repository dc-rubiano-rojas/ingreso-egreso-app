import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos = 0;
  egresos = 0;

  totalEgresos = 0;
  totalIngresos = 0;
  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithIngreso>) {}

  ngOnInit() {
    this.store.select('ingresosEgresos')
        .subscribe( ({items}) => this.generarEstadistica(items) );
  }

  generarEstadistica(items: IngresoEgreso[]) {

    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData = [ [this.totalIngresos, this.totalEgresos] ];

  }

}
