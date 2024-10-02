import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DestinationService } from 'src/app/core/services/destination-service/destination.service';
import { Destination } from 'src/app/core/entities/Destination';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-all-destinations',
  templateUrl: './all-destinations.component.html',
  styleUrls: ['./all-destinations.component.css']
})
export class AllDestinationsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private destinationService: DestinationService) { }

  //UI elements
  promotionsOn: boolean = false;
  showCheckbox: boolean = false;

  //filter elements
  startDate: Date | null = null;
  endDate: Date | null = null;

  //destination arrays
  all_destinations: Destination[] | undefined;
  promotions: Destination[] | undefined;

  filtered_destinations: Destination[] | undefined;
  peopleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedPeople: number | null = null;


  ngOnInit(): void {
    this.promotionsOn = false;
    this.showCheckbox = true;
    this.startDate = null;
    this.endDate = null;
    this.getAllDestinations();
    this.getPromotions();
    this.route.url.subscribe(segments => {
      if (segments.length > 0 && segments[1].path === 'promotions') {
        this.promotionsOn = true;
        this.showCheckbox = false;
      } else {
        this.promotionsOn = false;
        this.showCheckbox = true;
      }
    });

    this.destinationService.searchTerm$.subscribe(searchTerm => {
      this.filterDestinationsByName(searchTerm);
    });

    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.filterDestinationsByName(searchTerm);
      }
    });

  }


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (type === 'start') {
      this.startDate = selectedDate;
    } else {
      this.endDate = selectedDate;
      this.filterDestinationsByDate();
    }
  }

  getAllDestinations() {
    this.destinationService.getAllDestinations().subscribe(data => {
      this.all_destinations = data;
    });
  }

  filterDestinationsByName(searchTerm: string): void {
    this.destinationService.getAllDestinations().subscribe(data => {
      this.all_destinations = data.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  filterDestinationsByDate() {
    if (!this.all_destinations || !this.startDate || !this.endDate) {
      return;
    }

    const startTimestamp = this.startDate.getTime();
    const endTimestamp = this.endDate.getTime();

    this.all_destinations = this.all_destinations.filter(destination => {

      const destinationStartTimestamp = new Date(destination.startDate).getTime();
      const destinationEndTimestamp = new Date(destination.endDate).getTime();

      return destinationStartTimestamp <= endTimestamp && destinationEndTimestamp >= startTimestamp;
    });
  }

  filterDestinationsByPeople() {
    if (!this.all_destinations || !this.selectedPeople) {
      return;
    }
    else {
      this.all_destinations = this.all_destinations.filter(destination => {
        return destination.numberOfPeople >= this.selectedPeople!;
      });
    }

  }


  getPromotions() {
    this.destinationService.getPromotions().subscribe(data => {
      this.promotions = data;
    });
  }


}
