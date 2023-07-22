import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VndPipe } from './pipes/vnd.pipe';
import { QuantityPipe } from './pipes/quantity.pipe';
import { DdmmyyyyPipe } from 'src/app/modules/@shared/pipes/ddmmyyyy.pipe';
import { DdmmyyyyhhmmssPipe } from 'src/app/modules/@shared/pipes/ddmmyyyyhhmmss.pipe';
import { DateTimeAsAgoPipe } from 'src/app/modules/@shared/pipes/date-time-as-ago.pipe';

@NgModule({
    declarations: [
        VndPipe,
        QuantityPipe,
        DdmmyyyyPipe,
        DdmmyyyyhhmmssPipe,
        DateTimeAsAgoPipe,
    ],
    imports: [CommonModule],
    exports: [
        VndPipe,
        QuantityPipe,
        DdmmyyyyPipe,
        DdmmyyyyhhmmssPipe,
        DateTimeAsAgoPipe,
    ],
})
export class SharedModule {}
