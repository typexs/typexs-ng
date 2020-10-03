import {Routes} from '@angular/router';
import {AuthGuardService} from '../base/api/auth/auth-guard.service';
import {DistributedStorageQueryPageComponent} from './components/query/page/query-page.component';
import {
  PERMISSION_ALLOW_DISTRIBUTED_STORAGE_ACCESS_ENTITY,
  PERMISSION_ALLOW_DISTRIBUTED_STORAGE_ACCESS_ENTITY_PATTERN
} from '@typexs/server/browser';

export const DISTRIBUTED_STORAGE_ROUTES: Routes = [
  {
    path: 'distributed-storage/query',
    component: DistributedStorageQueryPageComponent,
    data: {
      label: 'Query',
      permissions: [
        PERMISSION_ALLOW_DISTRIBUTED_STORAGE_ACCESS_ENTITY,
        PERMISSION_ALLOW_DISTRIBUTED_STORAGE_ACCESS_ENTITY_PATTERN
      ]
    },
    canActivate: [AuthGuardService]
  }

];
