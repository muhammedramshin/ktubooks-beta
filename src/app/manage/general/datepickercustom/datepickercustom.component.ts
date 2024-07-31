
import { Component ,OnInit} from '@angular/core';
import { ViewCell, Cell, DefaultEditor } from 'ng2-smart-table';



@Component({
  template: `{{ value | date:'dd/MM/yyyy' }}`,
})
export class DatepickercustomComponent implements ViewCell {

  value!: string;
  rowData: any;
}

