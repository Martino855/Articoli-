import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { privateRouting } from './private.routing';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    privateRouting,
    FormsModule,
  ]
})
export class PrivateModule { }
