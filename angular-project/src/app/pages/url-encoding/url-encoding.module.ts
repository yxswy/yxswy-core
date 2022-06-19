import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlEncodingComponent } from './url-encoding.component';
import { UrlEncodingRoutingModule } from './url-encoding-routing.module';

import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    UrlEncodingComponent
  ],
  exports: [UrlEncodingComponent],
  imports: [
    CommonModule,
    UrlEncodingRoutingModule,

    NzInputModule,
  ]
})
export class UrlEncodingModule { }
