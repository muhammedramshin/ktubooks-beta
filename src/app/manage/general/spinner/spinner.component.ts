import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Loading...';
  ngOnInit(): void {
  }

}
