import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SystemInfoService} from '../../system/system-info.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

  pushTimer: any = null;

  interval: number = 5000;


  constructor(private infoService: SystemInfoService) {
  }


  infos() {
    return this.infoService;
  }


  ngOnInit() {
    this.infoService.refresh();
    this.pushTimer = setInterval(() => {
      this.infoService.refresh();
    }, this.interval);
  }


  ngOnDestroy(): void {
    clearInterval(this.pushTimer);
  }

}
