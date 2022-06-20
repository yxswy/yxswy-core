import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlEncodingComponent } from './url-encoding.component';
import { UrlEncodingRoutingModule } from './url-encoding-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [
    UrlEncodingComponent
  ],
  exports: [UrlEncodingComponent],
  imports: [
    CommonModule,
    UrlEncodingRoutingModule,

    FormsModule, ReactiveFormsModule,

    NzInputModule,
    NzRadioModule,
    NzButtonModule,
    NzSpaceModule,
  ]
})
export class UrlEncodingModule { }
