import { Component } from '@angular/core';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { LayoutService } from 'src/app/modules/layout/service/app.layout.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
    public readonly version = this.configService.version;
    constructor(
        public readonly layoutService: LayoutService,
        public readonly configService: ConfigService
    ) {}
}
