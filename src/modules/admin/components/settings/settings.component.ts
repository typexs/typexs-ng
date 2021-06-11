import {Component, OnInit} from '@angular/core';
import {AppService} from '@typexs/ng-base';
import {ILoggerOptions} from '@typexs/ng-base';
import {Log, LOGLEVELS} from '@typexs/ng-base';


@Component({
  selector: 'txs-admin-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  logger: ILoggerOptions = null;

  levels = LOGLEVELS;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.logger = Log.getOptions();
  }

  switch() {
    this.logger.enable = !this.logger.enable;
  }

  submit() {
    Log.info('save log options', this.logger);
    Log.setOptions(this.logger);

  }


}
