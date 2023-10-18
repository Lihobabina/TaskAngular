import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  private currencies: { [key: string]: number } = {
    'UAH': 1, 
    'USD': 0,
    'EUR': 0
  };

  private apiUrl = 'https://api.monobank.ua/bank/currency';

  private currenciesSubject = new BehaviorSubject<{ [key: string]: number }>(this.currencies);

  constructor(private http: HttpClient) {
    this.fetchCurrencyRates();
  }

  private fetchCurrencyRates() {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.currencies["USD"] = data[0].rateBuy;
          this.currencies["EUR"] = data[1].rateBuy;
        } else {
          console.log('Массив пуст');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCurrencies(): Observable<{ [key: string]: number }> {
    return this.currenciesSubject.asObservable();
  }
}
