import { Pipe, PipeTransform } from '@angular/core';
import { IntlService } from 'src/app/modules/@core/services/intl.service';

@Pipe({
    name: 'quantity',
})
export class QuantityPipe implements PipeTransform {
    constructor(private readonly intlService: IntlService) {}

    transform(value: unknown, ...args: unknown[]): unknown {
        return isNaN(value as any)
            ? ''
            : this.intlService.NumberFormat.format(value as any);
    }
}
