import {JsonController, Get} from 'typexs-server';

@JsonController()
export class FirstController {

  @Get()
  get() {
    return {title: 'FirstComponent'}
  }
}
