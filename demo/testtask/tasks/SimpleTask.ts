import {ITask} from '@typexs/base';

export class SimpleTask implements ITask {

  name: string = 'simple_task';

  async exec() {
    return {test: 'data'};
  }
}
