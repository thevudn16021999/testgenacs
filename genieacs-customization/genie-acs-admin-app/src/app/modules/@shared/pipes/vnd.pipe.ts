import { Pipe, PipeTransform } from '@angular/core';
import { IntlService } from 'src/app/modules/@core/services/intl.service';

@Pipe({
    name: 'vnd',
})
export class VndPipe implements PipeTransform {
    constructor(private readonly intlService: IntlService) {}

    transform(value: unknown, ...args: unknown[]): unknown {
        return isNaN(value as any)
            ? ''
            : this.intlService.CurrencyFormat.format(value as any);
    }
}
