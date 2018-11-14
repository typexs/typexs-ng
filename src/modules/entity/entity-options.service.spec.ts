import {expect} from 'chai';
import {TestBed} from '@angular/core/testing';
import {EntityOptionsService} from './entity-options.service';
import {EntityService} from './entity.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('Service: EntityOptionsService', () => {

  describe('initialize by string', () => {
    let service: EntityOptionsService;

    beforeEach(() => {
      const bed = TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          EntityService,
          EntityOptionsService,
          { provide: "EntityOptionsService", useClass: EntityOptionsService }
        ]
      });
    });


    it('do initialization by string', () => {
      service = TestBed.get("EntityOptionsService");
      expect(service).to.be.instanceOf(EntityOptionsService);

      let error = null;
      try{
        service = TestBed.get("EntityOptionsServiceDummy");
      }catch (e) {
        error = e;
      }

//      expect(error).to.be.instanceOf(StaticInjectorError);
      expect(error.message).to.be.eq('StaticInjectorError[EntityOptionsServiceDummy]: \n  NullInjectorError: No provider for EntityOptionsServiceDummy!');


    });
  });

});
