import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';

@NgModule({
    declarations: [
        AppComponent,
        BasicLayoutComponent,
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        CommonModule ,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        AuthModule,
        HomeModule
    ]
})
export class AppModule { }