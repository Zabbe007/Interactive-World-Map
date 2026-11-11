import { Component } from '@angular/core';
import { AsyncPipe, NgIf, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from './country-model';
import { CountryService } from './services/country';

@Component({
  imports: [RouterOutlet, AsyncPipe, NgIf, DecimalPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  title = 'Interactive World Map';

  selectedCountry$: Observable<Country | undefined>

  constructor(private countryService: CountryService) {
    this.selectedCountry$ = this.countryService.selectedCountry$;
  }

}
