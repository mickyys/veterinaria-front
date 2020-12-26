import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin/admin-layout/admin-layout.component";

export const AppRoutes: Routes = [
    {
        path: 'dashboard',
        component: AdminLayoutComponent,
    },
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)    
    }
];