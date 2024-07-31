import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { CheckoutComponent } from '../public/pages/checkout/checkout.component';
import { BooksComponent } from './pages/books/books.component';

const routes: Routes = [{ path: '', component: PublicComponent ,
  children: [
    {path: '',component:BooksComponent},
    {path: 'checkout/:id',component:CheckoutComponent},
   
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
