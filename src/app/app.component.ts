import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  Scheduler,
  SchedulerComponent,
  SchedulerDataSource,
  SchedulerViewType,
  SchedulerViews,
  SchedulerViewSelectorType,
  SchedulerTimelineDayScale,
  SchedulerResource,
} from '@smart-webcomponents-angular/scheduler';

var labels = ['Health surveillance 60 mins', 'Alternative appointment 60 mins', 'Yet another potential appointment 60 mins'];
var test = [];
for (var i=6;i<18;i++){
  for (var j=9;j<14;j++){    
    var dataPoint = {
      label: 'Doctor Or Nurse doing Health things',
      appointmentType: labels[Math.floor(Math.random() * labels.length)],
      appointmentTypeId: Math.floor(Math.random() * 10 + 1),
      doctorId: Math.floor(Math.random() * 10 + 1),
      dateStart: new Date(2023, 0, j, i, 30),
      dateEnd: new Date(2023, 0, j, i + 1, 30)
      }
      test.push(dataPoint);
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('scheduler', { read: SchedulerComponent, static: false })
  scheduler: SchedulerComponent;

  dataSource: SchedulerDataSource[] = (() => {
    const today = new Date(),
      currentYear = today.getFullYear(),
      currentMonth = today.getMonth(),
      currentDate = 9,
      data = test,
      data2 = data.concat(test);
      console.log(data);
      console.log(data2);
      console.log(data2);
    return data2;
  })();

  legendItems: any[];

  view: String = 'workWeek';

  views: object | string[] = [
    {
      label: 'Work Week',
      value: 'workWeek',
      type: 'week',
      shortcutKey: 'W',
    },
    'month',
  ];

  hideAllDay: Boolean = true;

  hourStart: number = 6;

  hourEnd: number = 22;

  nonworkingDays: number[] = [0, 6];

  nonworkingHours: number[][] = [
    [0, 5],
    [14, 18],
  ];

  hideNonworkingWeekdays: Boolean = true;

  firstDayOfWeek: number = 1;

  viewSelectorType: SchedulerViewSelectorType = 'auto';

  groups: String[] = ['doctorId'];

  groupTemplate: String = 'groupTemplate';

  timelineDayScale: SchedulerTimelineDayScale = 'halfHour';

  stringToColour: Function = (str: string) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return this.shadeColour(colour, -30);
  };

  shadeColour(color: string, percent: number) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = Math.floor((R * (100 + percent)) / 100);
    G = Math.floor((G * (100 + percent)) / 100);
    B = Math.floor((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

    return '#' + RR + GG + BB;
  }

  timelineHeaderFormatFunction: Function = (
    date: Date,
    orientation: string,
    isHeaderDetails: Boolean,
    dateValue: string
  ) => {
    if (orientation === 'horizontal') {
      const segments = dateValue.split(' ');

      if (segments.length === 2) {
        return `<div>${segments[1]}</div><div class="header-day-number">${segments[0]}</div>`;
      }
    }
    return dateValue;
  };
  appointmentTypes: any = this.dataSource
    .map((a: any) => ({
      id: a.appointmentTypeId,
      name: a.appointmentType,
    }))
    .filter((c, i, arr) => arr.findIndex((t) => t.id === c.id) === i);

  resources: SchedulerResource[] = [
    {
      label: 'AppointmentType',
      value: 'appointmentTypeId',
      dataSource: this.appointmentTypes.map((a: any) => ({
        label: a.name,
        id: a.id,
        backgroundColor: this.stringToColour(a.name ?? ''),
      })),
      /*{ 
      label: 'Doctors',
      value: 'doctorId',
      dataSource: [
        {
          label: 'Andrew Johnson',
          id: 1,
          speciality: 'Anesthesiology',
          image: 'https://htmlelements.com/demos/images/phonebook/andrew.png',
          backgroundColor: '#28a745',
        },
        {
          label: 'Steven Mcilroy',
          id: 2,
          speciality: 'Dermatology',
          image: 'https://htmlelements.com/demos/images/phonebook/steven.png',
          backgroundColor: '#8f73af',
        },
        {
          label: 'Michael Dawson',
          id: 3,
          speciality: 'Neurology',
          image: 'https://htmlelements.com/demos/images/phonebook/michael.png',
          backgroundColor: '#BF8F00',
        },
        {
          label: 'Gregory House',
          id: 4,
          specialty: 'Diagnostic',
          image: 'https://htmlelements.com/demos/images/phonebook/michael.png',
          backgroundColor: 'Black',
        },
      ],*/
    },
  ];

  ngOnInit(): void {
    // onInit code.
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
  }

  init(): void {
    // init code.
  }
}
