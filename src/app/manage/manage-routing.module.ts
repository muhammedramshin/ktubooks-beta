import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DateBookComponent } from './pages/date-book/date-book.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountsComponent } from './pages/money/accounts/accounts.component';
import { CalculatorComponent } from './pages/money/calculator/calculator.component';
import { CreateTrasactionComponent } from './pages/money/create-trasaction/create-trasaction.component';
import { ExpenceTypesComponent } from './pages/money/expence-types/expence-types.component';
import { LendersComponent } from './pages/money/lenders/lenders.component';
import { MoneyComponent } from './pages/money/money.component';
import { OverviewComponent } from './pages/money/overview/overview.component';
import { ReportsComponent } from './pages/money/reports/reports.component';
import { TransactionsComponent } from './pages/money/transactions/transactions.component';
import { TypesComponent } from './pages/money/types/types.component';
import { AlleventsComponent } from './pages/notes/calendar/allevents/allevents.component';
import { CalendarComponent } from './pages/notes/calendar/calendar.component';
import { QuickCopyComponent } from './pages/quick-copy/quick-copy.component';
import { TaskLabelsComponent } from './pages/tasks/task-labels/task-labels.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CredBookComponent } from './pages/cred-book/cred-book.component';
import { NotepadComponent } from './pages/money/notepad/notepad.component';
import { NotesComponent } from './pages/notes/notes.component';
import { CartComponent } from './pages/cart/cart.component';
import { FilegalleryComponent } from './pages/filegallery/filegallery.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { DocumentsEditorComponent } from './pages/documents-editor/documents-editor.component';
import { CardManagerComponent } from './pages/card-manager/card-manager.component';
import { EstimationComponent } from './pages/money/estimation/estimation.component';
import { EstimationListComponent } from './pages/money/estimation-list/estimation-list.component';
import { BooksComponent } from '../manage/pages/books/books.component';
import { BooksFormComponent } from './pages/books/books-form/books-form.component';



const routes: Routes = [{ path: '', component: ManageComponent,
// redirect to home page
      children:[{path:'',component:HomeComponent},
      {path:'money',component:MoneyComponent,
             children:[
              {path:'',redirectTo:'create',pathMatch:'full'},
              {path:'create',component:CreateTrasactionComponent},
              {path:'transactions',component:TransactionsComponent},
              {path:'types',component:TypesComponent},
              {path:'lenders',component:LendersComponent},
              {path:'overview',component:OverviewComponent},
              {path:'accounts',component:AccountsComponent},
              {path:'report',component:ReportsComponent},
              {path:'notes',component:NotepadComponent},
              {path:'estimation/:id',component:EstimationComponent},
              {path:'estimation-list',component:EstimationListComponent},
              

              
            ]
          },
          {path:'books',component:BooksComponent},
          {path:'books/add',component:BooksFormComponent},
          {path:'cart',component:CartComponent},
          {path:'files',component:FilegalleryComponent},
          {path:'documents',component:DocumentsComponent},
          {path:'documents/:type/:id',component:DocumentsEditorComponent},
          {path:'documents/:type',component:DocumentsEditorComponent},
          {path:'notes',component:NotesComponent},
          {path:'calandar',component:CalendarComponent},
          {path:'allevents',component:AlleventsComponent},
          {path:'calculator',component:CalculatorComponent},
          {path:'date-book',component:DateBookComponent},
          {path:'cred-book',component:CredBookComponent},
          {path:'quickcopy',component:QuickCopyComponent},
          {path:'contacts',component:ContactsComponent},
          {path:'tasks',component:TasksComponent},
          {path:'tasklabels',component:TaskLabelsComponent},
          {path:'card-manager',component:CardManagerComponent},
        ]

      }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
