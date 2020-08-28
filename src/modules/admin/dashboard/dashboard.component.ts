import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SystemInfoService} from '../../base/system-info.service';
import {IWorkerInfo} from '@typexs/base/libs/worker/IWorkerInfo';
import {interval, Observable, Subscription, timer} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  pushTimer: Observable<number> = null;

  interval = 5000;

  workerInfos: IWorkerInfo[] = [];


  constructor(private infoService: SystemInfoService) {

  }


  infos() {
    return this.infoService;
  }


  ngOnInit() {
    // this.infoService.refresh();
    this.infoService.loadWorkers((err, workerInfos) => {
      if (!err) {
        this.workerInfos = workerInfos;
      }
    });


    this.pushTimer = timer(0, this.interval);
    this.subscriptions.add(this.pushTimer.subscribe(x =>  this.infoService.refresh()));
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
