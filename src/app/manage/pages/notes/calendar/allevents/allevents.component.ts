import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.scss']
})
export class AlleventsComponent implements OnInit {
  calendarData: any;
  events:any;
  eventsDataTemp: any;
  selectedYear: any=new Date().getFullYear();
  selectedMonth: any = new Date().getMonth();
  monthList = [
    { id: 0, name: 'January' },
    { id: 1, name: 'February' },
    { id: 2, name: 'March' },
    { id: 3, name: 'April' },
    { id: 4, name: 'May' },
    { id: 5, name: 'June' },
    { id: 6, name: 'July' },
    { id: 7, name: 'August' },
    { id: 8, name: 'September' },
    { id: 9, name: 'October' },
    { id: 10, name: 'November' },
    { id: 11, name: 'December' },
  ];

  yearList = [
    { id: 2023, name: '2023' },
    { id: 2024, name: '2024' },
    { id: 2025, name: '2025' },
  ];

  constructor(private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.getCalendarData();
  }



  getCalendarData() {
    this.afs.collection('calendar').valueChanges({ idField: 'id' }).subscribe((data) => {
      this.calendarData = data;
      console.log("Notes model", this.calendarData);
      let today = new Date();
      
      //extract events from calendar data
    let eventdata:any=[];
    this.calendarData.forEach((element:any) => {
      if(element.events?.length>0){
        //check event have date or not if not then add date from calendar
        element.events.forEach((event:any) => {
          if(!event.date){
            event.date=element.date;
          }
        });

        eventdata=eventdata.concat(element.events);
        console.log("events",eventdata);
      }
    });
    console.log("events",eventdata);
      this.events=eventdata;
      this.eventsDataTemp = eventdata;
      this.filterMonthLineChart();

    })
  }

  filterMonthLineChart() {

    let month=this.selectedMonth;
    let year=this.selectedYear;

    let eventdata:any=[];
    this.events=this.eventsDataTemp;
    //filter events by month and year
    this.events.forEach((element:any) => {
      let eventdate=element.date.toDate();
      console.log('check Point',eventdate.getMonth(),month,eventdate.getFullYear(),year);
      
      if(eventdate.getMonth()==month && eventdate.getFullYear()==year){
        eventdata.push(element);
      }
    }
    );
    console.log("events",eventdata);
    this.events=eventdata;

  }
}
