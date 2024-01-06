import { CommonModule } from '@angular/common';
import { inject, Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  // templateUrl: './home.component.html',
  template: `
  <section> 
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)"> Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location
    *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrl: './home.component.css',

})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';

  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(housingService: HousingService) {
    housingService.getAllHousingLocations().then(allhouse => {
      this.housingLocationList = allhouse;
      this.filteredLocationList = allhouse;

    })
  }

  filterResults(text: string) {
    if(!text) {
      this.filteredLocationList = this.housingLocationList
    } else {
      this.filteredLocationList = []
      this.housingLocationList.filter(housingLocation => housingLocation.city === text)
    }
  }
}

