import {Component} from '@angular/core';
import {AbstractQueryEmbeddedComponent} from '../../../base/api/querying/abstract-query-embedded.component';

import {EntityService} from '../../entity.service';
import {C_DEFAULT} from '../../../base/constants';
import {EntityRegistry} from '@typexs/schema';


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
    super();
    this.setQueryService(entityService);
  }

}
