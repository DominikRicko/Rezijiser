import { NgModule } from '@angular/core';
import { CustomDatePipe } from './customDate.pipe';

@NgModule({
    declarations: [CustomDatePipe],
    exports: [CustomDatePipe],
})
export class HelperModule {}
