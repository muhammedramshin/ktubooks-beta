
import { Component ,OnInit} from '@angular/core';
import { ViewCell, Cell, DefaultEditor } from 'ng2-smart-table';


@Component({
  template: `
    <input nbInput type="date" [(ngModel)]="cell.newValue" [ngModelOptions]="{standalone: true}" nbDatepicker fieldSize="small">
  `,
})
export class DatepickereditorComponent   implements ViewCell {
  value!: string;
  rowData!: any;
cell!: any;
}