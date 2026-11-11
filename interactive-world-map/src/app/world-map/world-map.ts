import { Component } from '@angular/core';
import { CountryService } from '../services/country';
import { Country } from '../country-model';

@Component({
  imports: [],
  selector: 'app-world-map',
  styleUrl: './world-map.css',
  templateUrl: './world-map.html',
})
export class WorldMap {

  selectedCountry : Country | undefined;

  onMapClick(event: MouseEvent): void {
    const target = event.target as SVGElement;
    if (!target.id) {
      return;
    }
    if (!target.classList.contains('visited')) {
      target.style.fill = this.randomColor();
      target.classList.add('visited');
    } 
    this.loadCountryData(target.id);
  
  }

  constructor(private countryService: CountryService) {}

  loadCountryData(countryCode: string): void {
    this.countryService.getCountryData(countryCode)
      .subscribe({ 
        next: (country) => {
          if (!country) {
            console.error('Country data not found for code:', countryCode);
            return;
          }
        this.selectedCountry = country;  
        this.countryService.setSelectedCountry(country);
      },
        error: (error) => {
          console.error('Error fetching country data:', error);
        }
    });
  }

  private randomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 50 + Math.floor(Math.random() * 51);   // 50% to 100%
    const lightness = 20 + Math.floor(Math.random() * 46);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
}

       
