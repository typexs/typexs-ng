import {getTestBed, TestBed} from '@angular/core/testing';
// import {expect} from 'jasmine';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Log} from '../base/lib/log/Log';
import {MessageService} from '../base/messages/message.service';
import {BackendClientService} from '../base/backend-client.service';
import {NoopAuthService} from '../base/api/auth/noop-auth.service';
import {AuthService} from '../base/api/auth/auth.service';
import {BackendTasksService} from './backend-tasks.service';
import {SystemInfoService} from '../base/system-info.service';
import {AppService} from '../base/app.service';
import {Injector} from '@angular/core';
import {StorageService} from '../storage/storage.service';


/**
 * BackendClientService
 * ---------------
 *
 * - check ping
 * - check reload routes
 *
 */
describe('BackendTasksService', () => {
  let service: BackendTasksService;
  let injector: TestBed;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useClass: NoopAuthService},
        BackendClientService,
        MessageService,
        SystemInfoService,
        BackendTasksService,
        AppService,
        Injector,
        StorageService
      ]
    });

    injector = getTestBed();

    service = injector.get(BackendTasksService);
    httpMock = injector.get(HttpTestingController);
    Log.debug = console.log.bind(console);
  });


  afterEach(() => {
    httpMock.verify();

  });


  it('should have a service instance', () => {
    expect(service).not.toBeNull();

  });


});
