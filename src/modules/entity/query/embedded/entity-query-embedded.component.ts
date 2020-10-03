import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractQueryEmbeddedComponent} from '../../../base/api/querying/abstract-query-embedded.component';

import {EntityService} from '../../entity.service';
import {C_DEFAULT} from '../../../base/constants';
import {EntityRegistry} from '@typexs/schema/browser';


/**
 * Storage query embedded component
 *
 * Possibilities:
 * - sorting
 * - filters
 * - extend/add specialized columns
 */
@Component({
  selector: 'txs-entity-query-embedded',
  templateUrl: './entity-query-embedded.component.html',
  styleUrls: ['./entity-query-embedded.component.scss']
})
export class EntityQueryEmbeddedComponent extends AbstractQueryEmbeddedComponent {

  constructor(private entityService: EntityService) {
    super(entityService);
    this.registryName = C_DEFAULT;
  }

  findEntityDef() {
    this.entityRef = EntityRegistry.$().getEntityRefByName(this.name);

    if (!this.entityRef) {
      this.error = `Can't find entity type for ${this.name}.`;
    }
  }


}
