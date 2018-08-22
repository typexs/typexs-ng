/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NotYetImplementedError } from 'typexs-base/libs/exceptions/NotYetImplementedError';
import { ResolveDataValue } from './ResolveDataValue';
import { EntityDef } from 'typexs-schema/libs/EntityDef';
import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import { Registry } from 'typexs-schema/libs/Registry';
import * as _ from '../../libs/LoDash';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { ContentComponentRegistry } from '../xsview/ContentComponentRegistry';
export class FormBuilder {
    /**
     * @param {?} data
     * @return {?}
     */
    buildFromJSON(data) {
        this.data = data;
        this.schema = Registry.getSchema('default');
        return /** @type {?} */ (this._buildForm(data));
    }
    /**
     * @param {?} entity
     * @return {?}
     */
    buildFromEntity(entity) {
        this.data = entity;
        return /** @type {?} */ (this._buildFormObject(entity));
    }
    /**
     * @param {?} entity
     * @param {?=} parent
     * @return {?}
     */
    _buildFormObject(entity, parent = null) {
        let /** @type {?} */ formObject = null;
        if (!this.form) {
            this.schema = Registry.getSchema(entity.schemaName);
            this.form = formObject = ContentComponentRegistry.createHandler('form');
            formObject.handle('name', entity.id());
            formObject.handle('binding', entity);
        }
        else if (entity instanceof PropertyDef) {
            // TODO support also other types
            let /** @type {?} */ property = entity;
            let /** @type {?} */ formType = /** @type {?} */ (property.getOptions('form')) || 'text';
            let /** @type {?} */ methodName = 'for' + _.capitalize(formType);
            if (this[methodName]) {
                formObject = this[methodName](formType, property);
            }
            else {
                formObject = this.forDefault(formType, property);
            }
        }
        else if (entity instanceof EntityDef) {
        }
        if (formObject != null) {
            formObject.setParent(parent);
        }
        else {
            // if formObject no created but parent is passed then use it as formobject further (grid <- add furter elements)
            formObject = parent;
        }
        if (entity instanceof EntityDef) {
            let /** @type {?} */ properties = entity.getPropertyDefs();
            for (let /** @type {?} */ property of properties) {
                let /** @type {?} */ childObject = this._buildFormObject(property, formObject);
                formObject.insert(childObject);
            }
        }
        else if (entity instanceof PropertyDef) {
            // TODO for properties which points to Entity / Entities
            //property.getEntityDef
            //formObject;
            let /** @type {?} */ property = /** @type {?} */ (entity);
            if (property.isReference()) {
                if (property.isEntityReference()) {
                    let /** @type {?} */ entity = property.targetRef.getEntity();
                    let /** @type {?} */ childObject = this._buildFormObject(entity, formObject);
                    formObject.insert(childObject);
                }
                else {
                    let /** @type {?} */ properties = this.schema.getPropertiesFor(property.targetRef.getClass());
                    for (let /** @type {?} */ property of properties) {
                        let /** @type {?} */ childObject = this._buildFormObject(property, formObject);
                        formObject.insert(childObject);
                    }
                }
            }
        }
        formObject.postProcess();
        return formObject;
    }
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    forDefault(formType, property) {
        let /** @type {?} */ formObject = ContentComponentRegistry.createHandler(formType);
        if (formObject) {
            formObject.handle('variant', formType);
            this._applyValues(formObject, property);
            return formObject;
        }
        throw new NoFormTypeDefinedError(formType);
    }
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    forText(formType, property) {
        return this._forInput(formType, property);
    }
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    forPassword(formType, property) {
        return this._forInput(formType, property);
    }
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    forEmail(formType, property) {
        return this._forInput(formType, property);
    }
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    _forInput(formType, property) {
        let /** @type {?} */ formObject = ContentComponentRegistry.createHandler('input');
        formObject.handle('variant', formType);
        this._applyValues(formObject, property);
        return formObject;
    }
    /**
     * @param {?} formObject
     * @param {?} property
     * @return {?}
     */
    _applyValues(formObject, property) {
        formObject.handle('name', property.name);
        formObject.handle('id', property.id());
        formObject.handle('label', property.label ? property.label : _.capitalize(property.name));
        formObject.handle('binding', property);
        let /** @type {?} */ options = property.getOptions();
        if (options) {
            Object.keys(options).forEach(opt => {
                if (/^(source|target|property)/.test(opt))
                    return;
                let /** @type {?} */ value = options[opt];
                formObject.handle(opt, value);
            });
        }
    }
    /**
     * @param {?} data
     * @param {?=} parent
     * @return {?}
     */
    _buildForm(data, parent = null) {
        let /** @type {?} */ keys = _.remove(Object.keys(data), (e) => ['children', 'type'].indexOf(e) === -1);
        let /** @type {?} */ formObject = null;
        if (data.type) {
            // lookup handler
            formObject = ContentComponentRegistry.createHandler(data.type);
        }
        else {
            throw new NoFormTypeDefinedError();
        }
        if (!this.form) {
            this.form = formObject;
        }
        formObject.setParent(parent);
        for (let /** @type {?} */ key of keys) {
            let /** @type {?} */ value = data[key];
            if (_.isString(value)) {
                if (/^\$/.test(value)) {
                    value = new ResolveDataValue(value, formObject, key);
                }
            }
            formObject.handle(key, value);
        }
        if (data.children) {
            let /** @type {?} */ value = data.children;
            if (_.isArray(value)) {
                for (let /** @type {?} */ entry of value) {
                    let /** @type {?} */ childObject = this._buildForm(entry, formObject);
                    formObject.insert(childObject);
                }
            }
            else {
                throw new NotYetImplementedError();
            }
        }
        formObject.postProcess();
        return formObject;
    }
}
function FormBuilder_tsickle_Closure_declarations() {
    /** @type {?} */
    FormBuilder.prototype.data;
    /** @type {?} */
    FormBuilder.prototype.form;
    /** @type {?} */
    FormBuilder.prototype.schema;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJsaWJzL3hzZm9ybS9Gb3JtQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFJMUYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxLQUFLLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUc1RSxNQUFNOzs7OztJQVFKLGFBQWEsQ0FBQyxJQUFTO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1Qyx5QkFBYSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDO0tBQ3BDOzs7OztJQUVELGVBQWUsQ0FBQyxNQUFpQjtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNuQix5QkFBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUM7S0FDNUM7Ozs7OztJQUdPLGdCQUFnQixDQUFDLE1BQStCLEVBQUUsU0FBcUIsSUFBSTtRQUVqRixxQkFBSSxVQUFVLEdBQWUsSUFBSSxDQUFDO1FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFF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LEdBQUcsVUFBVSxDQUFDO1NBQ3hCO1FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QixLQUFLLHFCQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDcEIscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDckIsS0FBSyxHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDdEQ7YUFDRjtZQUNELFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBR0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsS0FBSyxxQkFBSSxLQUFLLElBQUksS0FBSyxFQUFFO29CQUN2QixxQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3JELFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLHNCQUFzQixFQUFFLENBQUM7YUFDcEM7U0FDRjtRQUVELFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixPQUFPLFVBQVUsQ0FBQzs7Q0FHckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05vdFlldEltcGxlbWVudGVkRXJyb3J9IGZyb20gJ3R5cGV4cy1iYXNlL2xpYnMvZXhjZXB0aW9ucy9Ob3RZZXRJbXBsZW1lbnRlZEVycm9yJztcbmltcG9ydCB7Rm9ybU9iamVjdH0gZnJvbSAnLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9lbGVtZW50cyc7XG5cbmltcG9ydCB7UmVzb2x2ZURhdGFWYWx1ZX0gZnJvbSAnLi9SZXNvbHZlRGF0YVZhbHVlJztcbmltcG9ydCB7RW50aXR5RGVmfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRW50aXR5RGVmJztcbmltcG9ydCB7UHJvcGVydHlEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9Qcm9wZXJ0eURlZic7XG5pbXBvcnQge1NjaGVtYURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1NjaGVtYURlZic7XG5pbXBvcnQge1JlZ2lzdHJ5fSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvUmVnaXN0cnknO1xuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge05vRm9ybVR5cGVEZWZpbmVkRXJyb3J9IGZyb20gJy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yJztcbmltcG9ydCB7Q29udGVudENvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICcuLi94c3ZpZXcvQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgY2xhc3MgRm9ybUJ1aWxkZXIge1xuXG4gIHByaXZhdGUgZGF0YTogYW55O1xuXG4gIHByaXZhdGUgZm9ybTogRm9ybU9iamVjdDtcblxuICBwcml2YXRlIHNjaGVtYTogU2NoZW1hRGVmO1xuXG4gIGJ1aWxkRnJvbUpTT04oZGF0YTogYW55KTogRm9ybSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnNjaGVtYSA9IFJlZ2lzdHJ5LmdldFNjaGVtYSgnZGVmYXVsdCcpO1xuICAgIHJldHVybiA8Rm9ybT50aGlzLl9idWlsZEZvcm0oZGF0YSk7XG4gIH1cblxuICBidWlsZEZyb21FbnRpdHkoZW50aXR5OiBFbnRpdHlEZWYpOiBGb3JtIHtcbiAgICB0aGlzLmRhdGEgPSBlbnRpdHk7XG4gICAgcmV0dXJuIDxGb3JtPnRoaXMuX2J1aWxkRm9ybU9iamVjdChlbnRpdHkpO1xuICB9XG5cblxuICBwcml2YXRlIF9idWlsZEZvcm1PYmplY3QoZW50aXR5OiBFbnRpdHlEZWYgfCBQcm9wZXJ0eURlZiwgcGFyZW50OiBGb3JtT2JqZWN0ID0gbnVsbCkge1xuXG4gICAgbGV0IGZvcm1PYmplY3Q6IEZvcm1PYmplY3QgPSBudWxsO1xuXG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuc2NoZW1hID0gUmVnaXN0cnkuZ2V0U2NoZW1hKGVudGl0eS5zY2hlbWFOYW1lKTtcbiAgICAgIHRoaXMuZm9ybSA9IGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcignZm9ybScpO1xuICAgICAgZm9ybU9iamVjdC5oYW5kbGUoJ25hbWUnLCBlbnRpdHkuaWQoKSk7XG4gICAgICBmb3JtT2JqZWN0LmhhbmRsZSgnYmluZGluZycsIGVudGl0eSk7XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgLy8gVE9ETyBzdXBwb3J0IGFsc28gb3RoZXIgdHlwZXNcbiAgICAgIGxldCBwcm9wZXJ0eSA9IGVudGl0eTtcbiAgICAgIGxldCBmb3JtVHlwZSA9IDxzdHJpbmc+cHJvcGVydHkuZ2V0T3B0aW9ucygnZm9ybScpIHx8ICd0ZXh0JztcbiAgICAgIGxldCBtZXRob2ROYW1lID0gJ2ZvcicgKyBfLmNhcGl0YWxpemUoZm9ybVR5cGUpO1xuICAgICAgaWYgKHRoaXNbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgZm9ybU9iamVjdCA9IHRoaXNbbWV0aG9kTmFtZV0oZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1PYmplY3QgPSB0aGlzLmZvckRlZmF1bHQoZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eURlZikge1xuXG4gICAgfVxuXG4gICAgaWYgKGZvcm1PYmplY3QgIT0gbnVsbCkge1xuICAgICAgZm9ybU9iamVjdC5zZXRQYXJlbnQocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZm9ybU9iamVjdCBubyBjcmVhdGVkIGJ1dCBwYXJlbnQgaXMgcGFzc2VkIHRoZW4gdXNlIGl0IGFzIGZvcm1vYmplY3QgZnVydGhlciAoZ3JpZCA8LSBhZGQgZnVydGVyIGVsZW1lbnRzKVxuICAgICAgZm9ybU9iamVjdCA9IHBhcmVudDtcbiAgICB9XG5cblxuICAgIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlEZWYpIHtcbiAgICAgIGxldCBwcm9wZXJ0aWVzID0gZW50aXR5LmdldFByb3BlcnR5RGVmcygpO1xuXG4gICAgICBmb3IgKGxldCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChwcm9wZXJ0eSwgZm9ybU9iamVjdCk7XG4gICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFByb3BlcnR5RGVmKSB7XG4gICAgICAvLyBUT0RPIGZvciBwcm9wZXJ0aWVzIHdoaWNoIHBvaW50cyB0byBFbnRpdHkgLyBFbnRpdGllc1xuICAgICAgLy9wcm9wZXJ0eS5nZXRFbnRpdHlEZWZcbiAgICAgIC8vZm9ybU9iamVjdDtcbiAgICAgIGxldCBwcm9wZXJ0eSA9IDxQcm9wZXJ0eURlZj5lbnRpdHk7XG4gICAgICBpZiAocHJvcGVydHkuaXNSZWZlcmVuY2UoKSkge1xuICAgICAgICBpZiAocHJvcGVydHkuaXNFbnRpdHlSZWZlcmVuY2UoKSkge1xuICAgICAgICAgIGxldCBlbnRpdHkgPSBwcm9wZXJ0eS50YXJnZXRSZWYuZ2V0RW50aXR5KCk7XG4gICAgICAgICAgbGV0IGNoaWxkT2JqZWN0ID0gdGhpcy5fYnVpbGRGb3JtT2JqZWN0KGVudGl0eSwgZm9ybU9iamVjdCk7XG4gICAgICAgICAgZm9ybU9iamVjdC5pbnNlcnQoY2hpbGRPYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5zY2hlbWEuZ2V0UHJvcGVydGllc0Zvcihwcm9wZXJ0eS50YXJnZXRSZWYuZ2V0Q2xhc3MoKSk7XG4gICAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICAgICAgbGV0IGNoaWxkT2JqZWN0ID0gdGhpcy5fYnVpbGRGb3JtT2JqZWN0KHByb3BlcnR5LCBmb3JtT2JqZWN0KTtcbiAgICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtT2JqZWN0LnBvc3RQcm9jZXNzKCk7XG4gICAgcmV0dXJuIGZvcm1PYmplY3Q7XG5cbiAgfVxuXG4gIHByaXZhdGUgZm9yRGVmYXVsdChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICBsZXQgZm9ybU9iamVjdCA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5jcmVhdGVIYW5kbGVyKGZvcm1UeXBlKTtcbiAgICBpZiAoZm9ybU9iamVjdCkge1xuICAgICAgZm9ybU9iamVjdC5oYW5kbGUoJ3ZhcmlhbnQnLCBmb3JtVHlwZSk7XG4gICAgICB0aGlzLl9hcHBseVZhbHVlcyhmb3JtT2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICByZXR1cm4gZm9ybU9iamVjdDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoZm9ybVR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JUZXh0KGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIHJldHVybiB0aGlzLl9mb3JJbnB1dChmb3JtVHlwZSwgcHJvcGVydHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JQYXNzd29yZChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ySW5wdXQoZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yRW1haWwoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcklucHV0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2ZvcklucHV0KGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIGxldCBmb3JtT2JqZWN0ID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmNyZWF0ZUhhbmRsZXIoJ2lucHV0Jyk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ3ZhcmlhbnQnLCBmb3JtVHlwZSk7XG4gICAgdGhpcy5fYXBwbHlWYWx1ZXMoZm9ybU9iamVjdCwgcHJvcGVydHkpO1xuICAgIHJldHVybiBmb3JtT2JqZWN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlWYWx1ZXMoZm9ybU9iamVjdDogRm9ybU9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ25hbWUnLCBwcm9wZXJ0eS5uYW1lKTtcbiAgICBmb3JtT2JqZWN0LmhhbmRsZSgnaWQnLCBwcm9wZXJ0eS5pZCgpKTtcbiAgICBmb3JtT2JqZWN0LmhhbmRsZSgnbGFiZWwnLCBwcm9wZXJ0eS5sYWJlbCA/IHByb3BlcnR5LmxhYmVsIDogXy5jYXBpdGFsaXplKHByb3BlcnR5Lm5hbWUpKTtcbiAgICBmb3JtT2JqZWN0LmhhbmRsZSgnYmluZGluZycsIHByb3BlcnR5KTtcblxuICAgIGxldCBvcHRpb25zID0gcHJvcGVydHkuZ2V0T3B0aW9ucygpO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG9wdCA9PiB7XG4gICAgICAgIGlmICgvXihzb3VyY2V8dGFyZ2V0fHByb3BlcnR5KS8udGVzdChvcHQpKSByZXR1cm47XG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgICAgZm9ybU9iamVjdC5oYW5kbGUob3B0LCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgcHJpdmF0ZSBfYnVpbGRGb3JtKGRhdGE6IGFueSwgcGFyZW50OiBGb3JtT2JqZWN0ID0gbnVsbCkge1xuICAgIGxldCBrZXlzID0gXy5yZW1vdmUoT2JqZWN0LmtleXMoZGF0YSksIChlOiBzdHJpbmcpID0+IFsnY2hpbGRyZW4nLCAndHlwZSddLmluZGV4T2YoZSkgPT09IC0xKTtcblxuICAgIGxldCBmb3JtT2JqZWN0OiBGb3JtT2JqZWN0ID0gbnVsbDtcbiAgICBpZiAoZGF0YS50eXBlKSB7XG4gICAgICAvLyBsb29rdXAgaGFuZGxlclxuICAgICAgZm9ybU9iamVjdCA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5jcmVhdGVIYW5kbGVyKGRhdGEudHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuZm9ybSA9IGZvcm1PYmplY3Q7XG4gICAgfVxuXG4gICAgZm9ybU9iamVjdC5zZXRQYXJlbnQocGFyZW50KTtcblxuICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICBsZXQgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKC9eXFwkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gbmV3IFJlc29sdmVEYXRhVmFsdWUodmFsdWUsIGZvcm1PYmplY3QsIGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKGtleSwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgaWYgKGRhdGEuY2hpbGRyZW4pIHtcbiAgICAgIGxldCB2YWx1ZSA9IGRhdGEuY2hpbGRyZW47XG4gICAgICBpZiAoXy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB2YWx1ZSkge1xuICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybShlbnRyeSwgZm9ybU9iamVjdCk7XG4gICAgICAgICAgZm9ybU9iamVjdC5pbnNlcnQoY2hpbGRPYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgTm90WWV0SW1wbGVtZW50ZWRFcnJvcigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1PYmplY3QucG9zdFByb2Nlc3MoKTtcbiAgICByZXR1cm4gZm9ybU9iamVjdDtcblxuICB9XG59XG4iXX0=