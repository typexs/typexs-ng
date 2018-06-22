// TODO prevent circulations
import {NotYetImplementedError} from '../NotYetImplementedError';
import {XsEntityDef} from '../XsEntityDef';
import {XsPropertyDef} from '../XsPropertyDef';

export abstract class EntityDefTreeWorker {

  constructor() {
  }


  onEntityReferenceAsGlobalVariant(entityDef: XsEntityDef, property: XsPropertyDef, objects: any[]): void {
    throw new NotYetImplementedError();
  }


  async walk(entityDef: XsEntityDef, objects: any[]) {

    let properties = entityDef.getPropertyDefs();
    for (let propertyDef of properties) {
      if (propertyDef.isInternal()) {
        if (propertyDef.isReference()) {
          if (propertyDef.isEntityReference()) {

            let variant = propertyDef.getOptions('linkVariant');
            //let propEntityDef = propertyDef.targetRef.getEntity();
            if (variant === 'global') {
              await this.onEntityReferenceAsGlobalVariant(entityDef, propertyDef, objects);
            }
          } else {
            throw new NotYetImplementedError();
          }
        } else {
          // throw new NotYetImplementedError();
        }
      } else {
        // throw new NotYetImplementedError();
      }
    }
  }


}


