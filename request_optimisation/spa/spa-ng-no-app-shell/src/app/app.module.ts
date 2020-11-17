import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { Content1Component } from './content1/content1.component';
import { Content2Component } from './content2/content2.component';

import { HttpClientModule } from "@angular/common/http"; 


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    Content1Component,
    Content2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
