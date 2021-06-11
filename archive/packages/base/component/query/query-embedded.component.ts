import {Component, Input} from '@angular/core';
import {AbstractQueryEmbeddedComponent} from '../../../base/api/querying/abstract-query-embedded.component';
import {IQueringService} from '../../api/querying/IQueringService';


/**
 * Storage query embedded component
 *
 * Possibilities:
 * - sorting
 * - filters
 * - extend/add specialized columns
 */
@Component({
  selector: 'txs-query-embedded',
  templateUrl: './query-embedded.component.html',
  styleUrls: ['./query-embedded.component.scss']
})
export class QueryEmbeddedComponent extends AbstractQueryEmbeddedComponent {


  @Input()
  get service() {
    return this.getQueryService();
  }

  set service(service: IQueringService) {
    this.setQueryService(service);
  }

}
