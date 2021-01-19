import {getTestBed, TestBed} from '@angular/core/testing';
// import {expect} from 'jasmine';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {API_CTRL_STORAGE_METADATA_ALL_ENTITIES} from '@typexs/server/browser';
import {StorageService} from './storage.service';
import {Log} from '../base/lib/log/Log';
import {MessageService} from '../base/messages/message.service';
import {BackendClientService} from '../base/backend-client.service';
import {NoopAuthService} from '../base/api/auth/noop-auth.service';
import {AuthService} from '../base/api/auth/auth.service';
import {IEntityRefMetadata} from 'commons-schema-api/browser';
import {EntityResolverService} from '../base/entity-resolver.service';


/**
 * BackendClientService
 * ---------------
 *
 * - check ping
 * - check reload routes
 *
 */
describe('StorageService', () => {
  let service: StorageService;
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
        EntityResolverService,
        StorageService
      ]
    });

    injector = getTestBed();

    httpMock = injector.get(HttpTestingController);
    Log.debug = console.log.bind(console);
  });


  afterEach(() => {
    httpMock.verify();

  });


  it('should have a service instance and load metadata', () => {
    const entitiesMetadata: IEntityRefMetadata[] = [];
    const backendClientService: BackendClientService = injector.get(BackendClientService);
    backendClientService.getState().next('online');
    backendClientService.addRoute({
      route: backendClientService.apiUrl(API_CTRL_STORAGE_METADATA_ALL_ENTITIES),
      method: 'get',
      context: 'api',
      authorized: false
    });

    service = injector.get(StorageService);
    expect(service).not.toBeNull();

    const req = httpMock.expectOne('/api' + API_CTRL_STORAGE_METADATA_ALL_ENTITIES);
    req.flush(entitiesMetadata);


  });


  // it('should pass primative query parameters', () => {
  //
  //
  // });

});
