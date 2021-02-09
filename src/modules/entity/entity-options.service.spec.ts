import {expect} from 'chai';
import {TestBed} from '@angular/core/testing';
import {EntityOptionsService} from './entity-options.service';
import {EntityService} from './entity.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BaseModule} from '../base/module';
import {RouterTestingModule} from '@angular/router/testing';


describe('Service: EntityOptionsService', () => {

  describe('initialize by string', () => {
    let service: EntityOptionsService;


    beforeEach(() => {
      const bed = TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          BaseModule
        ],
        providers: [
          EntityService,
          EntityOptionsService,
          {provide: EntityOptionsService.name, useClass: EntityOptionsService}
        ]
      });
    });


    it('do initialization by string', () => {
      service = TestBed.inject(EntityOptionsService.name as any);
      expect(service).to.be.instanceOf(EntityOptionsService);

      let error = null;
      try {
        service = TestBed.inject('EntityOptionsServiceDummy' as any);
      } catch (e) {
        error = e;
      }

      expect(error.name).to.be.eq('NullInjectorError');
      expect(error.message).to.be.include('No provider for EntityOptionsServiceDummy!');
    });
  });

});
