import {FormText} from '../../../libs/forms/decorators/FormText';
import {FormSelect} from '../../../libs/forms/decorators/FormSelect';
import {Property} from '@typexs/schema/libs/decorators/Property';


export class Places {

  @FormText()
  @Property({type: 'string'})
  country: string;

  @FormText()
  @Property({type: 'string'})
  city: string;

  @FormSelect({enum:'continents'})
  @Property(<any>{type: 'string', label: 'Continent'})
  continent: string;

  continents: string[] = ['Africa', 'Europa', 'Asia', 'Australia', 'North america', 'South america', 'Antarctica'];


}
