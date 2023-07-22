import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class IntlService {
    private readonly cultureCode = 'vi-VN';
    public readonly NumberFormat = new Intl.NumberFormat(this.cultureCode);
    public readonly CurrencyFormat = new Intl.NumberFormat(this.cultureCode, {
        style: 'currency',
        currency: 'vnd',
    });
    public readonly DateTimeFormat = new Intl.DateTimeFormat(this.cultureCode);
}
