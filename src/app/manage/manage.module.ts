import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { NavComponent } from './nav/nav.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MoneyComponent } from './pages/money/money.component';
import { CreateTrasactionComponent } from './pages/money/create-trasaction/create-trasaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSpinnerComponent } from './elements/mat-spinner/mat-spinner.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HomeComponent } from './pages/home/home.component';
import { TransactionsComponent } from './pages/money/transactions/transactions.component';
import { ExpenceTypesComponent } from './pages/money/expence-types/expence-types.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LendersComponent } from './pages/money/lenders/lenders.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TypesComponent } from './pages/money/types/types.component';
import { ClearbuttonComponent } from './pages/money/lenders/clearbutton/clearbutton.component';
import { MatBadgeModule } from '@angular/material/badge';
import { OverviewComponent } from './pages/money/overview/overview.component';
import { AccountsComponent } from './pages/money/accounts/accounts.component';
import { UpdateComponent } from './pages/money/accounts/update/update.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CalculatorComponent } from './pages/money/calculator/calculator.component';
import { MatMenuModule } from '@angular/material/menu';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NotesComponent } from './pages/notes/notes.component';
import { CalendarComponent } from './pages/notes/calendar/calendar.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { DateBookComponent } from './pages/date-book/date-book.component';
import { DatepickercustomComponent } from './general/datepickercustom/datepickercustom.component';
import { DatepickereditorComponent } from './general/datepickereditor/datepickereditor.component';
import { QuickCopyComponent } from './pages/quick-copy/quick-copy.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskLabelsComponent } from './pages/tasks/task-labels/task-labels.component'
import { GoogleChartsModule } from 'angular-google-charts';
import { ReportsComponent } from './pages/money/reports/reports.component';
import {MatSelectModule} from '@angular/material/select';
import { AlleventsComponent } from './pages/notes/calendar/allevents/allevents.component';
import { CredBookComponent } from './pages/cred-book/cred-book.component';
import { StatementComponent } from './pages/money/accounts/statement/statement.component';
import { NotepadComponent } from './pages/money/notepad/notepad.component';
import { QuillModule } from 'ngx-quill';
import { ActivitiesComponent } from './pages/notes/calendar/types/activities/activities.component';
import {MatSliderModule} from '@angular/material/slider';
import { CartComponent } from './pages/cart/cart.component';
import { FilegalleryComponent } from './pages/filegallery/filegallery.component';
import { FileuploaderComponent } from './general/fileuploader/fileuploader.component';
import { FileviewerComponent } from './general/fileviewer/fileviewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ConfirmComponent } from './general/confirm/confirm.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { DocumentsEditorComponent } from './pages/documents-editor/documents-editor.component';
import { CardManagerComponent } from './pages/card-manager/card-manager.component';
import { CardFormComponent } from './pages/card-manager/card-form/card-form.component';
import { SpinnerComponent } from './general/spinner/spinner.component';
import { EstimationComponent } from './pages/money/estimation/estimation.component';
import { EstimationListComponent } from './pages/money/estimation-list/estimation-list.component';
import { TransactionFormComponent } from './pages/card-manager/transaction-form/transaction-form.component';
import { ViewTrasactionsComponent } from './pages/card-manager/view-trasactions/view-trasactions.component';

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}
@NgModule({
  declarations: [
    ManageComponent,
    NavComponent,
    MoneyComponent,
    CreateTrasactionComponent,
    MatSpinnerComponent,
    HomeComponent,
    TransactionsComponent,
    ExpenceTypesComponent,
    LendersComponent,
    TypesComponent,
    ClearbuttonComponent,
    OverviewComponent,
    AccountsComponent,
    UpdateComponent,
    CalculatorComponent,
    NotesComponent,
    CalendarComponent,
    DateBookComponent,
    DatepickercustomComponent,
    DatepickereditorComponent,
    QuickCopyComponent,
    ContactsComponent,
    TasksComponent,
    TaskLabelsComponent,
    ReportsComponent,
    AlleventsComponent,
    CredBookComponent,
    StatementComponent,
    NotepadComponent,
    ActivitiesComponent,
    CartComponent,
    FilegalleryComponent,
    FileuploaderComponent,
    FileviewerComponent,
    ConfirmComponent,
    DocumentsComponent,
    DocumentsEditorComponent,
    CardManagerComponent,
    CardFormComponent,
    SpinnerComponent,
    EstimationComponent,
    EstimationListComponent,
    TransactionFormComponent,
    ViewTrasactionsComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    NgxDocViewerModule,
    MatSnackBarModule,
    AngularFirestoreModule,
    Ng2SmartTableModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatMenuModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    MatSelectModule,
    QuillModule.forRoot()
 
    

    
  ]
})
export class ManageModule { }
