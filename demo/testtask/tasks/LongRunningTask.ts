import {ITask, ITaskRuntimeContainer, TaskRuntime} from '@typexs/base';

export class LongRunningTask implements ITask {

  @TaskRuntime()
  r: ITaskRuntimeContainer;

  name = 'long_running_task';

  wait(time: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }


  async exec() {
    this.r.total(1000);
    const l = this.r.logger();

    const res: any = {inc: 0};
    let i = 0;
    while (i < 1000) {
      await this.wait(1000);
      i++;
      res.inc = i;
      l.info('doing ' + i + ' iteration');
      this.r.progress(i);
    }


    return res;
  }
}
