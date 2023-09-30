import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { privateRouting } from './private.routing';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    privateRouting
  ]
})
export class PrivateModule { }
