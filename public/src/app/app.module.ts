import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GlobalService } from './global.service';
import { SortablejsModule } from 'angular-sortablejs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { LogsComponent } from './logs/logs.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { LocationsComponent } from './locations/locations.component';
import { RedirectComponent } from './redirect/redirect.component';

import { DashboardService } from './dashboard/dashboard.service';
import { LogService } from './log.service';
import { LogsService } from './logs/logs.service';
import { EquipmentService } from './equipment/equipment.service';
import { LocationService } from './locations/locations.service';
import { RedirectService } from './redirect/redirect.service';


const routes: Routes = [
  // {
  //     path: 'login',
  //     component: LoginComponent
  // },
  {
      path: '',
      component: LandingComponent,
      // canActivate: [AuthService, MeService],
      children: [
          {
              path: '',
              component: RedirectComponent
          },
          {
              path: 'miners',
              data: { currentPage: 'miners' },
              component: DashboardComponent
          },
          {
              path: 'equipment',
              data: { currentPage: 'equipment'},
              component: EquipmentComponent
          },
          {
              path: 'locations',
              data: { currentPage: 'locations' },
              component: LocationsComponent
          },
          {
              path: 'logs',
              data: { currentPage: 'logs' },
              component: LogsComponent
          }
      ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingComponent,
    GlobalService,
    LogsComponent,
    EquipmentComponent,
    LocationsComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
    HttpClientModule,
    SortablejsModule.forRoot({}),
    SortablejsModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    InfiniteScrollModule
  ],
  providers: [
    GlobalService,
    DashboardService,
    LogService,
    LogsService,
    EquipmentService,
    LocationService,
    RedirectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
