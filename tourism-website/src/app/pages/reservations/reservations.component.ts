import { Component, OnInit, ViewChild } from '@angular/core';
import { DestinationService } from 'src/app/core/services/destination-service/destination.service';
import Chart from 'chart.js/auto';
import { ReservationService } from 'src/app/core/services/reservation-service/reservation.service';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  public chart: any;
  locations: string[] = [];
  selectedLocation: string | undefined;
  calendarOptions: CalendarOptions | undefined;
  events: any[] = [];

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

  ngOnInit(): void {
    this.destService.getLocations().subscribe((data) => {
      this.locations = data;
    })

    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: [],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      eventColor: 'green'
    };

  }

  constructor(private destService: DestinationService, private reservationService: ReservationService) {

  }

  addOneDay(date: Date) {
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result.toISOString().split('T')[0];
  }

  locationChange() {
    this.reservationService.getReservationByLocation(this.selectedLocation!).subscribe((data) => {
      const months = data.map(item => item.month);
      const reservations = data.map(item => item.numberOfReservations);
      this.createChart(months, reservations);
    })

    this.reservationService.getReservationEntitiesByLocation(this.selectedLocation!).subscribe(data => {
      console.log("data ", data);
      this.events = data.map(reservation => ({
        title: `Reservation for ${reservation.numberOfPeople} people`,
        start: reservation.startDate,
        end: this.addOneDay(reservation.endDate),
        backgroundColor: 'blue'
      }));
      console.log("E: ", this.events);
      this.updateCalendarEvents(this.events);
    });

  }

  updateCalendarEvents(events: any[]): void {
    const calendarApi = this.calendarComponent!.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(events);
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Reservations',
            data: data,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
}

