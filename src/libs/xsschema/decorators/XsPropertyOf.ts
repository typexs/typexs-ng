import * as _ from 'lodash';

import {XsRegistry} from '../XsRegistry';

import {IXsProperty} from '../IXsProperty';



export function XsPropertyOf(entityOrOptions: IXsProperty | string | Function, propertyName:string = null, options:IXsProperty = null) {
  return function (object: any) {
    if(!options){
      options = {propertyName:null,sourceClass:null};
    }

    if(_.isString(entityOrOptions) || _.isFunction(entityOrOptions)){
      options.sourceClass = entityOrOptions;
    }else{
      options = <IXsProperty>entityOrOptions;
    }

    options.propertyClass = object;
    if(propertyName){
      options.propertyName = propertyName;
    }

    let xsDef = XsRegistry.createProperty(options);
    XsRegistry.register(xsDef);
  };
}
