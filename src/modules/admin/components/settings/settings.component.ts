import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../base/services/app.service';
import {ILoggerOptions} from '../../../base/lib/log/ILoggerOptions';
import {Log, LOGLEVELS} from '../../../base/lib/log/Log';


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
