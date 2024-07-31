import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './header/header.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatTabsModule
  ]
})
export class PublicModule { }
