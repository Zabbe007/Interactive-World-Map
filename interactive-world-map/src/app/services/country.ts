import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Country } from '../country-model';
import { REST_COUNTRIES_KEY } from '../api-key';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private apiKey = REST_COUNTRIES_KEY;
  private baseUrl = 'https://api.restcountries.com/countries/v5'

  private selectedCountrySubject = new BehaviorSubject<Country | undefined>(undefined);
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  constructor(private http: HttpClient) {}

  getCountryData(countryCode: string): Observable<Country | undefined> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get<any>(`${this.baseUrl}/codes.alpha_2/${countryCode}`, { headers }).pipe(
      map((response: any) => {
        console.log('API Response:', response);
        const data = response.data?.objects?.[0];
        if (!data) {
          return undefined;
        }
        return {
          name: data.names.common,
          capital: data.capitals?.[0]?.name || '',
          region: data.region || '',
          subregion: data.subregion || '',
          population: data.population || 0,
          areaKm: data.area?.kilometers || 0,
          latitude: data.coordinates?.lat || 0,
          longitude: data.coordinates?.lng || 0,
          currencies: data.currencies?.map((c: any) => c.name).join(', ') || '',
          languages: data.languages?.map((l: any) => l.name).join(', ') || '',
          flagUrl: data.flag?.url_png || '',
          governmentType: data.government_type || '',
          description: data.descriptions?.long || ''
        };  
      })
    );
  }

  setSelectedCountry(country: Country): void {
    this.selectedCountrySubject.next(country);
    
  }
}
