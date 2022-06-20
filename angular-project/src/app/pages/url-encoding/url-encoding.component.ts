import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-url-encoding',
  templateUrl: './url-encoding.component.html',
  styleUrls: ['./url-encoding.component.less']
})
export class UrlEncodingComponent implements OnInit {
  constructor( ) {}

  ngOnInit() {
  }

  radioValue = 'decodeURIComponent';
  firstValue = 'https://www.baidu.com/s?ie=UTF-8&wd=MDN';
  nextValue = '';

  decoding() {
    console.log(456)
    if (this.radioValue === 'decodeURI') {
      this.nextValue = decodeURI(this.firstValue)
    } else {
      this.nextValue = decodeURIComponent(this.firstValue)
    }
  }

  coding() {
    console.log(123)
    if (this.radioValue === 'decodeURI') {
      this.nextValue = encodeURI(this.firstValue)
    } else {
      this.nextValue = encodeURIComponent(this.firstValue)
    }
  }
}
