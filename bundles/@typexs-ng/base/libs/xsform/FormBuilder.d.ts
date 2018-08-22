import { Form } from './elements';
import { EntityDef } from 'typexs-schema/libs/EntityDef';
export declare class FormBuilder {
    private data;
    private form;
    private schema;
    buildFromJSON(data: any): Form;
    buildFromEntity(entity: EntityDef): Form;
    private _buildFormObject(entity, parent?);
    private forDefault(formType, property);
    private forText(formType, property);
    private forPassword(formType, property);
    private forEmail(formType, property);
    private _forInput(formType, property);
    private _applyValues(formObject, property);
    private _buildForm(data, parent?);
}
