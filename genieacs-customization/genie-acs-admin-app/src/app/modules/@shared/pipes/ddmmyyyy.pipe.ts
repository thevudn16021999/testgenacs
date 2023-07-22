import { Pipe, PipeTransform } from '@angular/core';
import { IntlService } from 'src/app/modules/@core/services/intl.service';
import {
    formatDDMMYYYY,
    isValidDate,
} from 'src/app/modules/@shared/utils/date.util';

@Pipe({
    name: 'ddmmyyyy',
})
export class DdmmyyyyPipe implements PipeTransform {
    constructor(private readonly intlService: IntlService) {}

    transform(value: unknown, ...args: unknown[]): unknown {
        return isValidDate(value) ? formatDDMMYYYY(new Date(value as any)) : '';
    }
}
