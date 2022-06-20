import { Component, OnInit, ElementRef } from '@angular/core';

import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import * as echarts from 'echarts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  dot = true;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private echartInstance: ElementRef,
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngAfterViewInit() {

    const element = this.echartInstance.nativeElement.querySelector('#echart')
      
    const echartInstance = echarts.init(document.getElementById('echart') as HTMLElement);
    echartInstance.setOption({
      visualMap: {
        show: false,
        min: 0,
        max: 10000
      },
      calendar: {
        range: '2017'
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.getVirtulData('2017')
      }
    })
  }

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    console.log('>>>', this.validateForm.valid)
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      console.log(Object.values(this.validateForm.controls))
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      // this.validateForm.controls.file.value = info.file
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['Noaqwe全额23 请问', [Validators.required]],
      id: ['cfd3f495280f77e0b5c1', []],
      types: [[], [Validators.required]],
      file: [null, []],
      usable: [true],
      // phoneNumber: [null, [Validators.required]],
      website: ['2', [Validators.required]],
      captcha: ['3', [Validators.required]],
      agree: [true]
    });
  }

  onClick(): void {
    console.log('clicked');
  }

  getVirtulData(year: string) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate(year + '-12-31');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time <= end; time += dayTime) {
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 10000)
      ]);
    }
    return data;
  }

  checkOptionsOne = [
    { label: 'Typescript', value: 'Typescript', checked: true },
    { label: 'Javascript', value: 'Javascript' },
    { label: 'Node', value: 'Node' },
    { label: 'Vite', value: 'Vite' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Unknown', value: 'Unknown' },
  ];

  log(value: object[]): void {
    console.log(value);
  }

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  colors = [ 'red', 'blue', 'yellow', 'green' ];

  articles = [
    {
      title: '定义一个 HTML 块，该块会决定 Angular 如何渲染单个条目。',
      usable: true
    },
    {
      title: '要列出你的条目，请把一个简写形式 let item of items 赋值给 *ngFor。',
      usable: true
    },
    {
      title: '定义一个 HTML 块，该块定 Angulwear 如何渲染单个条目。',
      usable: false
    }
  ];
  isVisible = false;
  isOkLoading = false;
  articleCloseUsable = function(status: boolean) {
    return status ? "" : "close"
  };

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }
}
