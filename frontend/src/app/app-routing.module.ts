import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { HomeMainViewComponent } from './home/components/home-main-view/home-main-view.component';

const routes: Routes = [
    { path: '', component: HomeMainViewComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
