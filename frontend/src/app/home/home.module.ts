import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { HomeMainViewComponent } from './components/home-main-view/home-main-view.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeMainViewComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ]
})
export class HomeModule { }
