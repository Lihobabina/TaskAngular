import { Component, OnInit } from '@angular/core';
import { RatesService } from 'src/app/services/rates.service'; 
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  selectedCurrency1: string = 'UAH';
  selectedCurrency2: string = 'USD';
  input: number;
  output: number;
  currencies: { [key: string]: number } = {};

  constructor(private currencyService: RatesService) {}

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    });
  }

  convertCurrency() {
    if (!isNaN(this.input)) {
      const rate = this.currencies[this.selectedCurrency1] / this.currencies[this.selectedCurrency2];
      this.output = this.input * rate;
    } else {
      this.output = 0;
    }
  }

  reverseConvertCurrency() {
    if (!isNaN(this.output)) {
      const rate = this.currencies[this.selectedCurrency2] / this.currencies[this.selectedCurrency1];
      this.input = this.output * rate;
    } else {
      this.input = 0;
    }
  }
}
