import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ColorPickerModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
  ]
})
export class PagesModule { }
