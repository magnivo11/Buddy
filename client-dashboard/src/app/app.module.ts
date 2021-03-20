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
import { PlantsCounterComponent } from './plants-counter/plants-counter.component';
import { GardenDetailsComponent } from './components/garden-details/garden-details.component';
import { GardenListComponent } from './components/garden-list/garden-list.component';
import { GardensViewComponent } from './components/gardens-view/gardens-view.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component'; 
const config: SocketIoConfig = { url: 'http://localhost:8080' , options:{}}; 


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersCounterComponent,
    ViewsComponent,
    PlantsCounterComponent,
    GardenDetailsComponent,
    GardenListComponent,
    GardensViewComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
