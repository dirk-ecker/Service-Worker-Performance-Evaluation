import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {Content1Component} from './content1/content1.component';
import {HomeComponent} from './home/home.component';
import {Content2Component} from './content2/content2.component';

const routes: Routes = [
  {path: 'content1', component: Content1Component},
  {path: 'content2', component: Content2Component},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
