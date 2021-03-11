import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersCounterComponent } from './components/users-counter/users-counter.component';
import { SocketIoModule , SocketIoConfig } from 'ngx-socket-io';
import { ViewsComponent } from './components/views/views.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component'; 
const config: SocketIoConfig = { url: 'http://localhost:8080' , options:{}}; 


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersCounterComponent,
    ViewsComponent,
    UsersListComponent,
    UsersDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
