import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  note: any;
  statements: any;
  slidingTasks: string[] = [];
  displayedTasks: string[] = [];
  taskData: any;
  currentSlide: number = 0; // Start with the first slide
  transform: string = 'translateX(0%)'; // Start position for the first slide
  transformEvents: string = 'translateX(0%)'; // Start position for the first slide
  transition: string = 'transform 0.5s ease-in-out';
  intervalId: any;
  intervalIdEvents: any;
  calendarData: any;
  events: any;
  eventsDataTemp: any;
  upcommingEvents: any;
  displayedEvents: any[] = [];
  currentSlideEevnts: number = 0; // Start with the first slide

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getTasks();
    this.getCevents();
  }

  saveNote() {
    if (this.note) {
      let date = new Date();
      let dateid = this.genDateId(date);
      this.afs.collection('quickstatements').doc().set({
        notes: this.note,
        date: date,
        dateid: dateid,
        month: date.getMonth(),
        year: date.getFullYear(),
      }).then(() => {
        console.log("Updated");
        this.note = "";
      }).catch((err) => {
        console.log("Error", err);
      });
    }
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
    this.afs.collection('quickstatements').valueChanges({ idField: 'id' }).subscribe((data) => {
      this.statements = data;
      console.log("Statements", this.statements);
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.intervalIdEvents) {
      clearInterval(this.intervalIdEvents);
    }
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  startSliderEvents() {
    this.intervalIdEvents = setInterval(() => {
      this.nextSlideEvents();
    }, 3000);
  }

  nextSlide() {
    this.currentSlide++;
    this.updateTransform();

    if (this.currentSlide === this.displayedTasks.length) {
      setTimeout(() => {
        this.transition = 'none';
        this.currentSlide = 0; // Jump to the first slide
        this.updateTransform();
        setTimeout(() => {
          this.transition = 'transform 0.5s ease-in-out';
        }, 0);
      }, 500); // The same duration as the CSS transition
    }
  }

  nextSlideEvents() {
    this.currentSlideEevnts++;
    this.updateTransformEvents();

    if (this.currentSlideEevnts === this.displayedEvents.length) {
      setTimeout(() => {
        this.transition = 'none';
        this.currentSlideEevnts = 0; // Jump to the first slide
        this.updateTransformEvents();
        setTimeout(() => {
          this.transition = 'transform 0.5s ease-in-out';
        }, 0);
      }, 500); // The same duration as the CSS transition
    }
  }

  updateTransform() {
    this.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  updateTransformEvents() {
    this.transformEvents = `translateX(-${this.currentSlideEevnts * 100}%)`;
  }

  getTasks() {
    this.afs.collection('tasks').valueChanges({ idField: 'id' }).subscribe((data: any) => {
      console.log(data);
      this.taskData = data;
      if (this.taskData) {
        // first sort by created date desc and then sort by isDone
        this.taskData.sort((a: any, b: any) => b.createdAt - a.createdAt);
        this.taskData.sort((a: any, b: any) => a.isDone - b.isDone);
      }
      let todo = this.taskData.filter((item: any) => item?.isDone == false);
      this.slidingTasks = todo.map((item: any) => item?.task);
      this.setupSlides();
      console.log(this.slidingTasks);
      this.startSlider();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  setupSlides() {
    // Duplicate the last slide at the beginning and the first slide at the end
    this.displayedTasks = this.slidingTasks;
  }

  setupEventsSlides() {
    // Duplicate the last slide at the beginning and the first slide at the end
    this.displayedEvents = this.upcommingEvents;
    console.log("displayedEvents", this.displayedEvents);
  }

  getCevents() {
    this.afs.collection('calendar').valueChanges({ idField: 'id' }).subscribe((data) => {
      this.calendarData = data;
      console.log("Notes model", this.calendarData);
      let today = new Date();

      //extract events from calendar data
      let eventdata: any = [];
      this.calendarData.forEach((element: any) => {
        if (element.events?.length > 0) {
          //check event have date or not if not then add date from calendar
          element.events.forEach((event: any) => {
            if (!event.date) {
              event.date = element.date;
            }
          });

          eventdata = eventdata.concat(element.events);
         
        }
      });
      console.log("events", eventdata);
      this.events = eventdata;
      this.eventsDataTemp = eventdata;
      let commingevents = this.filterUpcomingEvents(this.events);
      console.log("commingevents", commingevents);
      this.upcommingEvents = commingevents;
      this.setupEventsSlides();
      this.startSliderEvents();
    });
  }

  filterUpcomingEvents(events: any) {
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    // Filter events to include only those in the future
    const upcomingEvents = events.filter((item: any) => item.date.seconds > currentTime);

    // Sort events by date in ascending order
    upcomingEvents.sort((a: any, b: any) => a.date.seconds - b.date.seconds);

    return upcomingEvents;
  }
}
