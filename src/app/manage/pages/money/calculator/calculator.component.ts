import { Component, OnInit,Renderer2, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  value1: any ;
  value2: any;
  result: number = 0;
  operator: string = '+';
  addup:any;
  history: any = [];
  opacityValue: number = 0.9;
  constructor(private ref:MatDialogRef<CalculatorComponent>,private renderer: Renderer2, private el: ElementRef) { }
  ngOnInit() {

    localStorage.getItem('history') ? this.history = JSON.parse(localStorage.getItem('history') || '{}') : this.history = [];
    localStorage.getItem('result') ? this.result = JSON.parse(localStorage.getItem('result') || '{}') : this.result = 0;
    localStorage.getItem('value1') ? this.value1 = JSON.parse(localStorage.getItem('value1') || '{}') : this.value1 = 0;

  }


  addClassWithOpacity() {
  // Add the existing class
  this.renderer.addClass(this.el.nativeElement, 'mat-dialog-container-1');
  // Access the existing styles (if any) and add the opacity style
  const existingStyles = this.el.nativeElement.style.cssText;
  this.renderer.setStyle(this.el.nativeElement, 'cssText', `${existingStyles} opacity: ${this.opacityValue};`);
  }
  calculate() {
    switch (this.operator) {
      case '+':
        this.result = Number(this.value1) + Number(this.value2);
        this.history.push(this.value1 + this.operator + this.value2 + '=' + this.result);
        this.value1 = this.result;
        this.value2 = '';
        break;
      case '-':
        this.result = this.value1 - this.value2;
        this.history.push(this.value1 + this.operator + this.value2 + '=' + this.result);
        this.value1 = this.result;
        this.value2 = '';
        break;
      case '*':
        this.result = this.value1 * this.value2;
        this.history.push(this.value1 + this.operator + this.value2 + '=' + this.result);
        this.value1 = this.result;
        this.value2 = '';
        break;
      case '/':
        this.result = this.value1 / this.value2;
        this.history.push(this.value1 + this.operator + this.value2 + '=' + this.result);
        this.value1 = this.result;
        this.value2 = '';
        break;
      default:
        this.result = 0;
    }

    localStorage.setItem('history', JSON.stringify(this.history));
    localStorage.setItem('result', JSON.stringify(this.result));
    localStorage.setItem('value1', JSON.stringify(this.value1));

  }


  addupCalc(){
    if(this.addup){
    switch (this.operator) {
      case '+':
        this.result = Number(this.result) + Number(this.addup);
        break;
      case '-':
        this.result =Number(this.result) - Number(this.addup);
        break;
      case '*':
        this.result = Number(this.result) * Number(this.addup);
        break;
      case '/':
        this.result = Number(this.result) / Number(this.addup);
        break;
      default:
        this.result = 0;
    }
  }

  }
  clear() {
    this.value1 = null;
    this.value2 = null;
    this.result = 0;
  }


  clearLocalStorage(){
    
    localStorage.removeItem('history');
    localStorage.removeItem('result');
    localStorage.removeItem('value1');
    this.history=[];
  }
  
  close(){
    this.ref.close();
  }

  copyresult(){
    let dat=JSON.stringify(this.result);
    navigator.clipboard.writeText(dat);


  }


}
