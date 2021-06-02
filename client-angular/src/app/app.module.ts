import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';  
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ContainerComponent } from './components/container/container.component';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { environment } from '../environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.baseUrl, options: {} };


@NgModule({ 
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UsersComponent,
    LoginComponent,
    ContainerComponent,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }