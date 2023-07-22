import { Pipe, PipeTransform } from '@angular/core';
import { formatDateTimeAsAgo } from 'src/app/modules/@shared/utils/date.util';
@Pipe({
    name: 'dateTimeAsAgo',
})
export class DateTimeAsAgoPipe implements PipeTransform {
    transform(value: any, ...args: unknown[]): unknown {
        return formatDateTimeAsAgo(value);
    }
}
