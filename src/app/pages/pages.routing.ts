import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";

export const PagesRoutes: Routes = [

    {
        path: '',
        children: [  {
            path: 'register',
            component: RegisterComponent
        }]
    }
];