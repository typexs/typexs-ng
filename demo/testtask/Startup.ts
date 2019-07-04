import * as _ from 'lodash';
import {C_STORAGE_DEFAULT, IBootstrap, Inject, StorageRef} from '@typexs/base';
import {SimpleItem} from './entities/SimpleItem';

export class Startup implements IBootstrap {

  @Inject(C_STORAGE_DEFAULT)
  storageRef: StorageRef;

  async bootstrap() {

    const c = await this.storageRef.connect();
    const m = c.manager.getRepository(SimpleItem);
    if (await m.count() < 490) {
      for (const r of _.range(1, 500)) {
        const si = new SimpleItem();
        si.id = r;
        si.start = r * 10;
        si.stop = r * 10 + 6;
        si.text = 'Text ' + r;
        si.name = 'Name ' + r;
        await m.save(si);
      }
    }
    await c.close();

  }
}
