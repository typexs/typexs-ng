import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {API_CTRL_SERVER_PING, API_CTRL_SERVER_ROUTES, API_CTRL_SYSTEM_RUNTIME_NODE, IRoute} from '@typexs/server/browser';
import {BackendClientService} from './backend-client.service';
import {MessageService} from './messages/message.service';
import {Log} from './lib/log/Log';
import {SystemNodeInfo} from '@typexs/base/entities/SystemNodeInfo';
import {forkJoin} from 'rxjs';


/**
 * BackendClientService
 * ---------------
 *
 * - check ping
 * - check reload routes
 *
 */
describe('BackendClientService', () => {
  let service: BackendClientService;
  let injector: TestBed;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        MessageService,
        BackendClientService
      ]
    });

    injector = getTestBed();
    service = injector.get(BackendClientService);
    httpMock = injector.get(HttpTestingController);
    Log.debug = console.log.bind(console);
  });


  afterEach(() => {
    httpMock.verify();

  });


  it('should have a service instance', () => {
    expect(service).not.toBeNull();

  });


  it('get request', () => {
    const response = {time: new Date()};
    service.get('/api' + API_CTRL_SERVER_PING).subscribe(x => {
      expect(x).toEqual(response);
    });
    // successful response
    const req = httpMock.expectOne('/api' + API_CTRL_SERVER_PING);
    req.flush(response);
  });


  it('successfully ping to backend', () => {
    const response = {time: new Date()};
    service.ping().subscribe(x => {
      expect(x).toEqual(response);
      expect(service.getState().getValue()).toEqual('online');
    });
    // successful response
    const req = httpMock.expectOne('/api' + API_CTRL_SERVER_PING);
    req.flush(response);
  });


  it('fail ping to backend', () => {
    service.ping().subscribe(x => {
      expect(true).toEqual(false);
    }, error => {
      expect(service.getState().getValue()).toEqual('offline');
    });
    // successful response
    const req = httpMock.expectOne('/api' + API_CTRL_SERVER_PING);
    req.error(new ErrorEvent('no response'));
  });


  it('fail reload routes, cause backend state is offline', () => {
    const response: any[] = [];
    service.reloadRoutes().subscribe(x => {
      expect(x).toEqual(response);
    });
    // successful response
    const req = httpMock.expectNone('/api' + API_CTRL_SERVER_ROUTES);
    // req.flush(response);
  });


  it('successfully reload routes (empty)', () => {
    service.getState().next('online');

    const response: any[] = [];
    service.reloadRoutes().subscribe(x => {
      expect(x).toEqual(response);
    });
    // successful response
    const req = httpMock.expectOne('/api' + API_CTRL_SERVER_ROUTES);
    req.flush(response);
  });

  it('successfully reload routes (with examples)', () => {
    service.getState().next('online');

    const response: IRoute[] = [{
      route: '/api/ping',
      method: 'get',
      context: 'api',
      authorized: false
    }];
    service.reloadRoutes().subscribe((x: IRoute[]) => {
      expect(x).toEqual(response);
    });
    // successful response
    const req = httpMock.expectOne('/api' + API_CTRL_SERVER_ROUTES);
    req.flush(response);
  });


  it('fail callApi cause accessible routes are missing', () => {
    service.getState().next('online');
    service.resetRoutes();

    const response: any = {key: 'system'};
    service.callApi(API_CTRL_SYSTEM_RUNTIME_NODE).subscribe(
      (x: SystemNodeInfo) => {
        expect(x).toEqual(response);
      }, error => {
        expect(error).toEqual('Route "/api/system/node" not found, skipping.');
      });
    // successful response
    httpMock.expectNone('/api' + API_CTRL_SYSTEM_RUNTIME_NODE);
  });


  it('successfully callApi cause route is allowed', () => {
    service.getState().next('online');
    service.addRoute({
      route: service.apiUrl(API_CTRL_SYSTEM_RUNTIME_NODE),
      method: 'get',
      context: 'api',
      authorized: false
    });
    const response: any = {key: 'system'};


    service.callApi(API_CTRL_SYSTEM_RUNTIME_NODE)
      .subscribe((value: any) => {
        expect(value).toEqual(response);
      }, error => {
        expect(error).toBeNull();
        console.error(error);
      });
    // successful response


    const req = httpMock.expectOne('/api' + API_CTRL_SYSTEM_RUNTIME_NODE);
    req.flush(response);

  });


  it('successfully callApi with cached request', () => {
    service.getState().next('online');
    service.addRoute({
      route: service.apiUrl(API_CTRL_SYSTEM_RUNTIME_NODE),
      method: 'get',
      context: 'api',
      authorized: false
    });
    const response: any = {key: 'system'};

    forkJoin([
      service.callApi(API_CTRL_SYSTEM_RUNTIME_NODE),
      service.callApi(API_CTRL_SYSTEM_RUNTIME_NODE),
      service.callApi(API_CTRL_SYSTEM_RUNTIME_NODE),
      service.callApi(API_CTRL_SYSTEM_RUNTIME_NODE)
    ])
      .subscribe((value: any) => {
        console.log(value);
        for (const x of value) {
          expect(x).toEqual(response);
        }
      });


    const req = httpMock.expectOne('/api' + API_CTRL_SYSTEM_RUNTIME_NODE);
    req.flush(response);

  });

});
