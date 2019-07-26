import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
