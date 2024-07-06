import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeMainViewComponent } from "./components/home-main-view/home-main-view.component";

const routes: Routes = [
  {
    path: 'Home',
    children: [
      { path: '', component: HomeMainViewComponent, title: 'Inicio', },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

