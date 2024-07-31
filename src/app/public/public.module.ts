import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './header/header.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BooksComponent } from './pages/books/books.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    BooksComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PublicModule { }
