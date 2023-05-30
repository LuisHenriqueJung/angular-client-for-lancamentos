import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,

    PanelModule,
    ChartModule,

    CommonModule,
    DashboardRoutingModule,

  ],
  providers: [DecimalPipe]
})
export class DashboardModule { }
