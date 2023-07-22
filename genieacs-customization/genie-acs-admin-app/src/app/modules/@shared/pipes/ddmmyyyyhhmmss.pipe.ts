import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { IntlService } from 'src/app/modules/@core/services/intl.service';
import { isValidDate } from 'src/app/modules/@shared/utils/date.util';

@Pipe({
    name: 'ddmmyyyyhhmmss',
})
export class DdmmyyyyhhmmssPipe implements PipeTransform {
    constructor(private readonly intlService: IntlService) {}

    transform(value: unknown, ...args: unknown[]): unknown {
        return isValidDate(value) ? this.format(new Date(value as any)) : '';
    }

    private format(date: Date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
}
