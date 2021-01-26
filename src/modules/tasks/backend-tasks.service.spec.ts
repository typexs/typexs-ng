import {getTestBed, TestBed} from '@angular/core/testing';
// import {expect} from 'jasmine';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Log} from '../base/lib/log/Log';
import {MessageService} from '../base/messages/message.service';
import {NoopAuthService} from '../base/api/auth/noop-auth.service';
import {AuthService} from '../base/api/auth/auth.service';
import {BackendTasksService} from './backend-tasks.service';
import {Injector} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {BackendService} from '../base/api/backend/backend.service';
import {HttpBackendService} from '../base/services/http-backend.service';
import {SystemInfoService} from '../base/services/system-info.service';
import {AppService} from '../base/services/app.service';
import {EntityResolverService} from '../base/services/entity-resolver.service';


/**
 * HttpBackendService
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
        {provide: BackendService, useClass: HttpBackendService},
        MessageService,
        SystemInfoService,
        BackendTasksService,
        AppService,
        Injector,
        EntityResolverService,
        HttpBackendService,
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
