import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes:Routes = [{
    path:'home',
    component: HomeComponent
},
{
    path:'',
    redirectTo:'home',
    pathMatch:'full'
}]

export const privateRouting = RouterModule.forChild(routes)