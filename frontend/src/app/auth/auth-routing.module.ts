import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./components/login-form/login-form.component";

const routes: Routes = [
  {
    path: 'Auth',
    children: [
      { path: '', component: LoginFormComponent, title: 'Ingreso', data: { accessRoles: ['all'] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

