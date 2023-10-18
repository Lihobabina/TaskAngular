import { Component, OnInit } from '@angular/core';
import { RatesService } from 'src/app/services/rates.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currencies: { [key: string]: number } = {};

  constructor(private currencyService: RatesService) {}

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    });
  }
}
