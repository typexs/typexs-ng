import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SystemInfoService} from '../../system/system-info.service';
import {IWorkerInfo} from '@typexs/base/libs/worker/IWorkerInfo';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

  pushTimer: any = null;

  interval = 5000;

  workerInfos: IWorkerInfo[] = [];


  constructor(private infoService: SystemInfoService) {
  }


  infos() {
    return this.infoService;
  }


  ngOnInit() {
    this.infoService.refresh();
    this.infoService.loadWorkers((err, workerInfos) => {
      if (!err) {
        this.workerInfos = workerInfos;
      }
    });
    this.pushTimer = setInterval(() => {
      this.infoService.refresh();
    }, this.interval);
  }


  ngOnDestroy(): void {
    clearInterval(this.pushTimer);
  }

}
