import { Component, OnInit, TemplateRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  @ViewChild('bottomSheetTemplate') template!: TemplateRef<any>;
  @ViewChild('addnotes') addnotes!: TemplateRef<any>;
  @ViewChild('addevents') addevents!: TemplateRef<any>;
  @ViewChild('addtasks') addtasks!: TemplateRef<any>;
  activeListItem!: HTMLElement | null;
  calendarData: any;
  eventTitle: any;
  eventDescription: any = '';
  taskTitle: any;
  tasklabels: any;
  selectedTaskLabel: any = '';
  statements: any;
  viewCalendarInfo: boolean = false;
  activityTypes: any;
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private _bottomSheet: MatBottomSheet, readonly bottomSheet: MatBottomSheet, private afs: AngularFirestore) { }
  //defile CalendarDay class

  notes = {};

  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  weeks: any[][] = [];
  activeMonth: number = 0;
  activeYear: number = new Date().getFullYear();
  monthName: string = '';
  infos: any;
  yearsList: any[] = [];

  notesmodel = [{
    date: new Date(), note: [
      { title: 'test', description: 'test' },
      { title: 'test2', description: 'test2' },
      { title: 'test3', description: 'test3' },
    ]
  }
  ]

  noteTitle: any;
  noteDescription: any = '';
  initialInfo: boolean = true;
  lastUpdated: any;
  @ViewChild('calenderBox') calenderBox!: ElementRef;
  ngOnInit(): void {
    const today = new Date();
    this.activeMonth = today.getMonth();

    this.getCurrentYearMonths();
    this.generateYears();
    this.getCalendarData();
    this.getlabels();
    let dateIdToday = this.genDateId(today);
    this.getTodaysStatements(dateIdToday);
    this.getActivityTypes('load', dateIdToday);
   
    
  }

  onDateClick(date: Date) {
    console.log(date);
  }

  generateWeeks(year: number, month: number) {
    console.log("generateWeeks");
    console.log("year:", year);
    console.log("month:", month);
    this.weeks = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const numDaysInMonth = lastDayOfMonth.getDate();

    let date = new Date(firstDayOfMonth);

    let currMonth = date.getMonth() + 1;
    console.log("MONTH:", currMonth);
    let monthname = new Date(year, month + 1, 0).toLocaleString('default', { month: 'long' });
    this.monthName = monthname;
    // Move back to Sunday of first week
    date.setDate(date.getDate() - firstDayOfWeek);

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        // console.log(week);
        let temp = {
          date: new Date(date),
          day: date.getDate(),
          month: date.getMonth() + 1,
          notes: [],
          events: [],
          isToday: date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear(),
          isCurrentMonth: date.getMonth() === month,

        }
        if (this.initialInfo && temp.isToday) {
          this.infos = temp;
        
        }
        week.push(temp);
        date.setDate(date.getDate() + 1);

        if (date.getMonth() + 1 > currMonth) {
          break;
        }

      }
      this.weeks.push(week);

      if (date.getMonth() + 1 > currMonth) {
        break;
      }
    }

    console.log("weeks before", this.weeks);

    this.weeks.forEach((week) => {
      week.forEach((day) => {
        if (this.calendarData) {
          this.calendarData.forEach((cdata: any) => {
            const dateofnote = new Date(cdata.date?.seconds * 1000);


            if (day.date.getDate() == dateofnote.getDate() && day.date.getMonth() == dateofnote.getMonth() && day.date.getFullYear() == dateofnote.getFullYear()) {
              day.notes = cdata.notes;
              day.events = cdata.events;
              day.tasks = cdata.tasks;
              //sort tasks with isDone false first
              if (day.tasks) {
                day.tasks.sort((a: any, b: any) => a.isDone - b.isDone);
              }



              day.recordId = cdata.id;
              if (this.lastUpdated == cdata.id) {
                console.log("lastUpdated", this.lastUpdated);
                console.log("cid", cdata.id);
                this.infos = day;
              }
            }

            // check for upcoming events ends here
            let currentday = new Date(day.date);
            let nextday = new Date(currentday);
            let secondday = new Date(currentday);
            let thirdday = new Date(currentday);
            let fourthday = new Date(currentday);
            nextday.setDate(currentday.getDate() + 1);
            secondday.setDate(currentday.getDate() + 2);
            thirdday.setDate(currentday.getDate() + 3);
            fourthday.setDate(currentday.getDate() + 4);

            if (this.checkdateEqull(nextday, dateofnote) || this.checkdateEqull(secondday, dateofnote) || this.checkdateEqull(thirdday, dateofnote) || this.checkdateEqull(fourthday, dateofnote)) {
              if (cdata.events?.length > 0) {
                cdata.events.forEach((event: any) => {
                  if (!day.upcommingEvents) {
                    day.upcommingEvents = [];
                  }
                  event.date = dateofnote;
                  day.upcommingEvents.push(event);
                })
              }

            }
            // check for upcoming events ends here

          })

        }

        if (day.upcommingEvents) {
          day.upcommingEvents.sort((a: any, b: any) => a.date - b.date);
        }

      })
    })


    console.log("$$$$$$$", this.weeks);



  }


  getTodaysStatements(date: any) {
    console.log('check Point', date);

    this.afs.collection('quickstatements', ref => ref.where('dateid', '==', date))
      .valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.statements = data;
        console.log("Statements", this.statements);
      });
  }

  getDayActivity(dateId:any){
    console.log('getactivity called ', dateId);
    
    this.afs.collection('calendar').doc(dateId).collection('activities').doc('first').valueChanges().subscribe((data)=>{
      console.log("activity fetched",data);
      if(data){
        console.log('data is there');
        // add data to activity array object where type key value matching to data key
        this.activityTypes.forEach((activity:any)=>{
          for(let key in data){
            if(activity.type == key){
              activity.status = data[key];
            }
          }
        })

      }
      else{
        console.log('data is not there');
        // add data to activity array object where type key value matching to data key
        this.activityTypes.forEach((activity:any)=>{
         
              activity.status = false;
           
        })
      }
      console.log('MINOR ', this.activityTypes);
      
    }
    );
  }

  checkdateEqull(date1: any, date2: any) {
    if (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
      return true;
    }
    return false;
  }

  returnInfosWithPendingTasksCount(infos: any) {
    let count = 0;
    if (infos?.tasks) {
      let counts = infos.tasks.filter((task: any) => task.isDone == false);
      count = counts.length;
    }
    return count;
  }


  getCurrentYearMonths() {
    let months = [];

    for (let i = 0; i < 12; i++) {
      let today: Date = new Date();
      let month = today.getMonth() + i;
      let year = today.getFullYear();
      let monthname = new Date(year, month, 0).toLocaleString('default', { month: 'long' });
      months.push(monthname);
    }

    console.log(months);

  }

  prevMonth() {
    let today: Date = new Date();
    let year = this.activeYear;
    let month;
    if (this.activeMonth == 0) {
      this.activeMonth = 11;
      month = 11;
    }
    else {

      month = this.activeMonth - 1;
    }

    this.activeMonth = month;
    let monthname = new Date(year, month, 0).toLocaleString('default', { month: 'long' });
    this.monthName = monthname;
    console.log(year);
    this.generateWeeks(year, month);
  }

  nextMonth() {
    let today: Date = new Date();
    let month;
    if (this.activeMonth == 11) {
      this.activeMonth = 0;
      month = 0;
    }
    else {
      month = this.activeMonth + 1;
    }
    this.activeMonth = month;
    let year = this.activeYear;
    let monthname = new Date(year, month, 0).toLocaleString('default', { month: 'long' });
    this.monthName = monthname;
    this.generateWeeks(year, month);
  }

  assignInfo(info: any) {
    console.log("Info:", info);
    this.infos = info;
    this.initialInfo = false;;
    let dateid = this.genDateId(info.date);
    this.getTodaysStatements(dateid);
    this.getDayActivity(dateid);
  }

  changeYear(year: any) {
    this.activeYear = year;
    this.generateWeeks(year, this.activeMonth);
  }


  openYear(config?: MatBottomSheetConfig) {

    setTimeout(() => {
      let year = this.activeYear.toString();
      this.activeListItem = document.getElementById(year);
      this.activeListItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    return this.bottomSheet.open(this.template, config);
  }

  generateYears() {
    let years = [];
    for (let i = -30; i < 30; i++) {
      years.push(this.activeYear + i);
    }
    this.yearsList = years;
    console.log("List of years :", this.yearsList);
  }

  getlabels() {
    this.afs.collection('tasklabels').valueChanges({ idField: 'id' }).subscribe((res: any) => {
      console.log(res);
      this.tasklabels = res;
    })
  }

  saveNote(data: any) {
    console.log("Data:", data);
    let temp = {
      title: this.noteTitle,
      description: this.noteDescription,
    };
    let notes = data.notes;
    if (!notes) {
      notes = [];
    }
    notes.push(temp);
    let dateid = this.genDateId(data.date);
    console.log("Date ID:", data);
    if (data?.recordId) {
      this.afs.collection('calendar').doc(dateid).update({
        notes: notes,
        date: data.date,
        month: data.date.getMonth(),
        year: data.date.getFullYear(),
      }).then(() => {
        console.log("Updated");
        this.lastUpdated = dateid;
        this.noteTitle = "";
        this.noteDescription = "";
        this.closeBottomSheet();

      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );
    }
    else {
      this.afs.collection('calendar').doc(dateid).set({
        notes: notes,
        date: data.date,
        month: data.date.getMonth(),
        year: data.date.getFullYear(),
      }).then(() => {
        console.log("Updated");
        this.lastUpdated = dateid;
        this.noteTitle = "";
        this.noteDescription = "";
        this.closeBottomSheet();
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );
    }

  }


  saveEvent(data: any) {
    console.log("save event called :", data);
    let temp = {
      title: this.eventTitle,
      description: this.eventDescription,
      date: data.date,
    };
    let events = data.events;
    if (!events) {
      events = [];
    }
    events.push(temp);
    let dateid = this.genDateId(data.date);
    // console.log("Date ID:", data);
    if (data?.recordId) {
      this.afs.collection('calendar').doc(dateid).update({
        events: events,
        date: data.date,
        month: data.date.getMonth(),
        year: data.date.getFullYear(),
      }).then(() => {
        console.log("Updated");
        this.lastUpdated = dateid;
        this.eventTitle = "";
        this.eventDescription = "";
        this.closeBottomSheet();
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );

    }
    else {

      this.afs.collection('calendar').doc(dateid).set({
        events: events,
        date: data.date,
        month: data.date.getMonth(),
        year: data.date.getFullYear(),
      }).then((id: any) => {
        this.lastUpdated = dateid;
        console.log("Updated", id);
        this.eventTitle = "";
        this.eventDescription = "";

        this.closeBottomSheet();
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );
    }
  }

  saveTask(data: any, gid: any) {
    console.log("Data:", data);
    let temp = {
      task: this.taskTitle,
      isDone: false,
      label: this.selectedTaskLabel,
      gtid: gid
    };

    let tasks = data.tasks;
    if (!tasks) {
      tasks = [];
    }
    tasks.push(temp);
    let dateid = this.genDateId(data.date);
    console.log("Date ID:", data);
    if (data?.recordId) {
      this.afs.collection('calendar').doc(dateid).update({
        tasks: tasks,
        date: data.date,
        month: data.date.getMonth(),
        year: data.date.getFullYear(),
      }).then(() => {
        console.log("Updated");
        this.lastUpdated = dateid;
        this.taskTitle = "";
        this.selectedTaskLabel = "";
        this.closeBottomSheet();
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );

    }
    else {

      this.afs.collection('calendar').doc(dateid).set({
        tasks: tasks,
        date: data.date,
        month: data.date.getMonth(),
        year: data.date.getFullYear(),
      }).then((id: any) => {
        this.lastUpdated = dateid;
        console.log("Updated", id);
        this.taskTitle = "";
        this.closeBottomSheet();
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );
    }
  }


  sendToGeneralTasks(data: any) {
    console.log("Data:", data);
    this.afs.collection('tasks').add({
      task: this.taskTitle,
      isDone: false,
      label: this.selectedTaskLabel,
      createdAt: new Date(),
      updtedAt: new Date(),
    }).then((ref: any) => {
      console.log("Updated", ref.id);
      this.saveTask(data, ref.id);
    }
    ).catch((err) => {
      console.log("Error", err);
    }
    );
  }



  markasdone(data: any, index: any) {

    let tasks = data.tasks;
    if (tasks[index].isDone) {
      tasks[index].isDone = false;
    }
    else {
      tasks[index].isDone = true;
    }
    this.updateGeneralTask(tasks[index]);
    let dateid = this.genDateId(data.date);
    this.afs.collection('calendar').doc(dateid).update({
      tasks: tasks,
      date: data.date,
      month: data.date.getMonth(),
      year: data.date.getFullYear(),
    }).then(() => {
      console.log("Updated");
      this.lastUpdated = dateid;
      this.taskTitle = "";
      this.closeBottomSheet();
    }
    ).catch((err) => {
      console.log("Error", err);
    }
    );
  }


  updateGeneralTask(data: any) {
    console.log("Data:", data);
    if (data.gtid) {
      this.afs.collection('tasks').doc(data.gtid).update({
        isDone: data.isDone,
        updatedAt: new Date(),
      }).then((id: any) => {
        console.log("Updated", id);
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );
    }
  }
  deleteGeneralTask(data: any) {
    console.log('check Point', data);

    if (data.gtid) {
      console.log("Data:", data);
      this.afs.collection('tasks').doc(data.gtid).delete().then((id: any) => {
        console.log("Updated", id);
      }
      ).catch((err) => {
        console.log("Error", err);
      }
      );
    }
  }



  createNote() {
    let config = {
      disableClose: true,
    }
    return this.bottomSheet.open(this.addnotes, config);
  }

  createEvent() {
    let config = {
      disableClose: true,
    }
    return this.bottomSheet.open(this.addevents, config);
  }

  createTask() {
    let config = {
      disableClose: true,
    }
    return this.bottomSheet.open(this.addtasks, config);
  }

  closeBottomSheet() {
    this.bottomSheet.dismiss();
  }




  genDateId(date: any) {
    let tdate = date.getDate().toString();
    if (tdate.length == 1) {
      tdate = "0" + tdate;
    }
    let dateid = tdate + date.getMonth().toString() + date.getFullYear().toString();
    return dateid;
  }

  getCalendarData() {
    this.afs.collection('calendar').valueChanges({ idField: 'id' }).subscribe((data) => {
      this.calendarData = data;
      console.log("Notes model", this.calendarData);
      
      let today = new Date();
      if (this.activeMonth != today.getMonth() || this.activeYear != today.getFullYear()) {
        this.generateWeeks(this.activeYear, this.activeMonth);
      }
      else {

        this.generateWeeks(today.getFullYear(), today.getMonth());
      }
    })
  }


  deleteNote(note: any, i: any) {
    console.log("Note:", note);
    let dateid = this.genDateId(note.date);
    let notes = note.notes;
    notes.splice(i, 1);
    this.afs.collection('calendar').doc(dateid).update({
      notes: notes,
      date: note.date,
      month: note.date.getMonth(),
      year: note.date.getFullYear(),
    }).then(() => {
      console.log("Updated");
      this.lastUpdated = dateid;
      this.noteTitle = "";
      this.noteDescription = "";
      this.closeBottomSheet();

    }
    ).catch((err) => {
      console.log("Error", err);
    }
    );



  }

  deleteEvent(event: any, i: any) {

    console.log("Event:", event);
    let dateid = this.genDateId(event.date);
    let events = event.events;
    events.splice(i, 1);
    this.afs.collection('calendar').doc(dateid).update({
      events: events,
      date: event.date,
      month: event.date.getMonth(),
      year: event.date.getFullYear(),
    }).then(() => {
      console.log("Updated");
      this.lastUpdated = dateid;
      this.noteTitle = "";
      this.noteDescription = "";
      this.closeBottomSheet();

    }
    ).catch((err) => {
      console.log("Error", err);
    }
    );
  }

  deleteTask(task: any, i: any) {
    this.deleteGeneralTask(task.tasks[i]);
    console.log("Task:", task);
    let dateid = this.genDateId(task.date);
    let tasks = task.tasks;
    tasks.splice(i, 1);

    this.afs.collection('calendar').doc(dateid).update({
      tasks: tasks,
      date: task.date,
      month: task.date.getMonth(),
      year: task.date.getFullYear(),
    }).then(() => {
      console.log("Updated");
      this.lastUpdated = dateid;
      this.noteTitle = "";
      this.noteDescription = "";
      this.closeBottomSheet();

    }
    ).catch((err) => {
      console.log("Error", err);
    }
    );
  }


  toggleInfo() {
    this.viewCalendarInfo = !this.viewCalendarInfo;
    console.log('check Point', this.viewCalendarInfo);

    if (this.viewCalendarInfo) {
      // set info-box height style to height: calc(100vh - 80px);
      // const infoBoxElement:any = this.calenderBox.nativeElement;
      console.log('check Point', this.calenderBox.nativeElement);
      this.renderer.removeClass(this.calenderBox.nativeElement, 'info-box');
      this.renderer.addClass(this.calenderBox.nativeElement, 'info-box-height');

    }
    else {
      // set info-box height style to height: calc(100vh - 80px);
      // const infoBoxElement:any = this.calenderBox.nativeElement;
      console.log('check Point', this.calenderBox.nativeElement);
      this.renderer.removeClass(this.calenderBox.nativeElement, 'info-box-height');
      this.renderer.addClass(this.calenderBox.nativeElement, 'info-box');
    }

  }


  getActivityTypes(action:any,dateId:any) {
    this.afs.collection('activitytypes').valueChanges({ idField: 'id' }).subscribe((data) => {
      this.activityTypes = data;
      // sort activity by position
      this.activityTypes.sort((a: any, b: any) => {
        return a.position - b.position;
      });

      if(action == 'load'){
        this.getDayActivity(dateId);
      }

      console.log("Activity Types", this.activityTypes);
    })
  }

  

  createActvity(data: any,item:any,index:any) {
    let dateId;
    if(data?.recordId){
    dateId=data?.recordId;
    }
    else{
      dateId=this.genDateId(data?.date);
    }

    console.log('current data', data);
    console.log('current number', item);
    console.log('date id', dateId);
    
  


    let activityData:any={};
    this.activityTypes.forEach((activity:any) => {
      if(activity?.id==item?.id){
        activityData[activity.type]=!item.status;
      }
      else
      {
        if(activity?.status){
         
          // push key value pair to activityData
          activityData[activity.type]=activity?.status
        }
        else{
          activityData[activity.type]=false
        }
      }
     
    });
    console.log('coocked ', activityData);
    // update to first document in collection if exists or create new document
    console.log('date id', dateId);
    this.afs.collection('calendar').doc(dateId).collection('activities').doc('first').set({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...activityData
    }
    ).then((id: any) => {
      console.log("Updated", id);
    }
    ).catch((err) => {
      console.log("Error", err);
    }
    );

  
  }

}
