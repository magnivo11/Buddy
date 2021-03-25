import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import{FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersCounterComponent } from './components/users-counter/users-counter.component';
import { SocketIoModule , SocketIoConfig } from 'ngx-socket-io';
import { ViewsComponent } from './components/views/views.component';
import { UsersListComponent } from './components/users-list/users-list.component';
 import { GardenDetailsComponent } from './components/garden-details/garden-details.component';
import { GardenListComponent } from './components/garden-list/garden-list.component';
import { GardensViewComponent } from './components/gardens-view/gardens-view.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import {PlantsCounterComponent} from './components/plants-counter/plants-counter.component';
import { GardensCounterComponent } from './components/gardens-counter/gardens-counter.component';
import { SensorsCounterComponent } from './components/sensors-counter/sensors-counter.component';
import {ToDoTabComponent} from './components/to-do-tab/to-do-tab.component';
import {PhotosTabComponent} from './components/photos-tab/photos-tab.component';
import { StatisticsComponent } from './components/statistics/statistics.component'; 
import { RouterModule } from '@angular/router';

const config: SocketIoConfig = { url: 'http://localhost:8080' , options:{}}; 


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersCounterComponent,
    ViewsComponent,
    GardenDetailsComponent,
    GardenListComponent,
    GardensViewComponent,
    ToDoListComponent,
    PlantsCounterComponent,
    GardensCounterComponent,
    SensorsCounterComponent,
    ToDoTabComponent,
    StatisticsComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'todo-tab', component: ToDoTabComponent},
      {path: 'photos-tab', component: PhotosTabComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: '', redirectTo: '/statistics', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
