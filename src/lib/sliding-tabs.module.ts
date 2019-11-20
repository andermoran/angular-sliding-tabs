import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidingTabsComponent } from './sliding-tabs.component';



@NgModule({
  declarations: [SlidingTabsComponent],
  imports: [
    CommonModule
  ],
  exports: [SlidingTabsComponent]
})
export class SlidingTabsModule { }
