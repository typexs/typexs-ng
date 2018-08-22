/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NotYetImplementedError } from 'typexs-base/libs/exceptions/NotYetImplementedError';
import { ResolveDataValue } from './ResolveDataValue';
import { EntityDef } from 'typexs-schema/libs/EntityDef';
import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import { Registry } from 'typexs-schema/libs/Registry';
import * as _ from '../../libs/LoDash';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { ContentComponentRegistry } from '../xsview/ContentComponentRegistry';
var FormBuilder = /** @class */ (function () {
    function FormBuilder() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    FormBuilder.prototype.buildFromJSON = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.data = data;
        this.schema = Registry.getSchema('default');
        return /** @type {?} */ (this._buildForm(data));
    };
    /**
     * @param {?} entity
     * @return {?}
     */
    FormBuilder.prototype.buildFromEntity = /**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        this.data = entity;
        return /** @type {?} */ (this._buildFormObject(entity));
    };
    /**
     * @param {?} entity
     * @param {?=} parent
     * @return {?}
     */
    FormBuilder.prototype._buildFormObject = /**
     * @param {?} entity
     * @param {?=} parent
     * @return {?}
     */
    function (entity, parent) {
        if (parent === void 0) { parent = null; }
        var /** @type {?} */ formObject = null;
        if (!this.form) {
            this.schema = Registry.getSchema(entity.schemaName);
            this.form = formObject = ContentComponentRegistry.createHandler('form');
            formObject.handle('name', entity.id());
            formObject.handle('binding', entity);
        }
        else if (entity instanceof PropertyDef) {
            // TODO support also other types
            var /** @type {?} */ property = entity;
            var /** @type {?} */ formType = /** @type {?} */ (property.getOptions('form')) || 'text';
            var /** @type {?} */ methodName = 'for' + _.capitalize(formType);
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
            var /** @type {?} */ properties = entity.getPropertyDefs();
            try {
                for (var properties_1 = tslib_1.__values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                    var property = properties_1_1.value;
                    var /** @type {?} */ childObject = this._buildFormObject(property, formObject);
                    formObject.insert(childObject);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (entity instanceof PropertyDef) {
            // TODO for properties which points to Entity / Entities
            //property.getEntityDef
            //formObject;
            var /** @type {?} */ property = /** @type {?} */ (entity);
            if (property.isReference()) {
                if (property.isEntityReference()) {
                    var /** @type {?} */ entity_1 = property.targetRef.getEntity();
                    var /** @type {?} */ childObject = this._buildFormObject(entity_1, formObject);
                    formObject.insert(childObject);
                }
                else {
                    var /** @type {?} */ properties = this.schema.getPropertiesFor(property.targetRef.getClass());
                    try {
                        for (var properties_2 = tslib_1.__values(properties), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
                            var property_1 = properties_2_1.value;
                            var /** @type {?} */ childObject = this._buildFormObject(property_1, formObject);
                            formObject.insert(childObject);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (properties_2_1 && !properties_2_1.done && (_b = properties_2.return)) _b.call(properties_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        formObject.postProcess();
        return formObject;
        var e_1, _a, e_2, _b;
    };
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    FormBuilder.prototype.forDefault = /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    function (formType, property) {
        var /** @type {?} */ formObject = ContentComponentRegistry.createHandler(formType);
        if (formObject) {
            formObject.handle('variant', formType);
            this._applyValues(formObject, property);
            return formObject;
        }
        throw new NoFormTypeDefinedError(formType);
    };
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    FormBuilder.prototype.forText = /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    function (formType, property) {
        return this._forInput(formType, property);
    };
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    FormBuilder.prototype.forPassword = /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    function (formType, property) {
        return this._forInput(formType, property);
    };
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    FormBuilder.prototype.forEmail = /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    function (formType, property) {
        return this._forInput(formType, property);
    };
    /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    FormBuilder.prototype._forInput = /**
     * @param {?} formType
     * @param {?} property
     * @return {?}
     */
    function (formType, property) {
        var /** @type {?} */ formObject = ContentComponentRegistry.createHandler('input');
        formObject.handle('variant', formType);
        this._applyValues(formObject, property);
        return formObject;
    };
    /**
     * @param {?} formObject
     * @param {?} property
     * @return {?}
     */
    FormBuilder.prototype._applyValues = /**
     * @param {?} formObject
     * @param {?} property
     * @return {?}
     */
    function (formObject, property) {
        formObject.handle('name', property.name);
        formObject.handle('id', property.id());
        formObject.handle('label', property.label ? property.label : _.capitalize(property.name));
        formObject.handle('binding', property);
        var /** @type {?} */ options = property.getOptions();
        if (options) {
            Object.keys(options).forEach(function (opt) {
                if (/^(source|target|property)/.test(opt))
                    return;
                var /** @type {?} */ value = options[opt];
                formObject.handle(opt, value);
            });
        }
    };
    /**
     * @param {?} data
     * @param {?=} parent
     * @return {?}
     */
    FormBuilder.prototype._buildForm = /**
     * @param {?} data
     * @param {?=} parent
     * @return {?}
     */
    function (data, parent) {
        if (parent === void 0) { parent = null; }
        var /** @type {?} */ keys = _.remove(Object.keys(data), function (e) { return ['children', 'type'].indexOf(e) === -1; });
        var /** @type {?} */ formObject = null;
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
        try {
            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var /** @type {?} */ value = data[key];
                if (_.isString(value)) {
                    if (/^\$/.test(value)) {
                        value = new ResolveDataValue(value, formObject, key);
                    }
                }
                formObject.handle(key, value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (data.children) {
            var /** @type {?} */ value = data.children;
            if (_.isArray(value)) {
                try {
                    for (var value_1 = tslib_1.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var entry = value_1_1.value;
                        var /** @type {?} */ childObject = this._buildForm(entry, formObject);
                        formObject.insert(childObject);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            else {
                throw new NotYetImplementedError();
            }
        }
        formObject.postProcess();
        return formObject;
        var e_3, _a, e_4, _b;
    };
    return FormBuilder;
}());
export { FormBuilder };
function FormBuilder_tsickle_Closure_declarations() {
    /** @type {?} */
    FormBuilder.prototype.data;
    /** @type {?} */
    FormBuilder.prototype.form;
    /** @type {?} */
    FormBuilder.prototype.schema;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJsaWJzL3hzZm9ybS9Gb3JtQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBSTFGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3JELE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDcEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFHNUUsSUFBQTs7Ozs7OztJQVFFLG1DQUFhOzs7O0lBQWIsVUFBYyxJQUFTO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1Qyx5QkFBYSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDO0tBQ3BDOzs7OztJQUVELHFDQUFlOzs7O0lBQWYsVUFBZ0IsTUFBaUI7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbkIseUJBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFDO0tBQzVDOzs7Ozs7SUFHTyxzQ0FBZ0I7Ozs7O2NBQUMsTUFBK0IsRUFBRSxNQUF5QjtRQUF6Qix1QkFBQSxFQUFBLGFBQXlCO1FBRWpGLHFCQUFJLFVBQVUsR0FBZSxJ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Ozs7Ozs7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLElBQUksc0JBQXNCLEVBQUUsQ0FBQzthQUNwQztTQUNGO1FBRUQsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sVUFBVSxDQUFDOzs7c0JBMUx0QjtJQTZMQyxDQUFBO0FBL0tELHVCQStLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tm90WWV0SW1wbGVtZW50ZWRFcnJvcn0gZnJvbSAndHlwZXhzLWJhc2UvbGlicy9leGNlcHRpb25zL05vdFlldEltcGxlbWVudGVkRXJyb3InO1xuaW1wb3J0IHtGb3JtT2JqZWN0fSBmcm9tICcuL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL2VsZW1lbnRzJztcblxuaW1wb3J0IHtSZXNvbHZlRGF0YVZhbHVlfSBmcm9tICcuL1Jlc29sdmVEYXRhVmFsdWUnO1xuaW1wb3J0IHtFbnRpdHlEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9FbnRpdHlEZWYnO1xuaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcbmltcG9ydCB7U2NoZW1hRGVmfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvU2NoZW1hRGVmJztcbmltcG9ydCB7UmVnaXN0cnl9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9SZWdpc3RyeSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Tm9Gb3JtVHlwZURlZmluZWRFcnJvcn0gZnJvbSAnLi4vLi4vbGlicy9leGNlcHRpb25zL05vRm9ybVR5cGVEZWZpbmVkRXJyb3InO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uL3hzdmlldy9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuXG5cbmV4cG9ydCBjbGFzcyBGb3JtQnVpbGRlciB7XG5cbiAgcHJpdmF0ZSBkYXRhOiBhbnk7XG5cbiAgcHJpdmF0ZSBmb3JtOiBGb3JtT2JqZWN0O1xuXG4gIHByaXZhdGUgc2NoZW1hOiBTY2hlbWFEZWY7XG5cbiAgYnVpbGRGcm9tSlNPTihkYXRhOiBhbnkpOiBGb3JtIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMuc2NoZW1hID0gUmVnaXN0cnkuZ2V0U2NoZW1hKCdkZWZhdWx0Jyk7XG4gICAgcmV0dXJuIDxGb3JtPnRoaXMuX2J1aWxkRm9ybShkYXRhKTtcbiAgfVxuXG4gIGJ1aWxkRnJvbUVudGl0eShlbnRpdHk6IEVudGl0eURlZik6IEZvcm0ge1xuICAgIHRoaXMuZGF0YSA9IGVudGl0eTtcbiAgICByZXR1cm4gPEZvcm0+dGhpcy5fYnVpbGRGb3JtT2JqZWN0KGVudGl0eSk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybU9iamVjdChlbnRpdHk6IEVudGl0eURlZiB8IFByb3BlcnR5RGVmLCBwYXJlbnQ6IEZvcm1PYmplY3QgPSBudWxsKSB7XG5cbiAgICBsZXQgZm9ybU9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgdGhpcy5zY2hlbWEgPSBSZWdpc3RyeS5nZXRTY2hlbWEoZW50aXR5LnNjaGVtYU5hbWUpO1xuICAgICAgdGhpcy5mb3JtID0gZm9ybU9iamVjdCA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5jcmVhdGVIYW5kbGVyKCdmb3JtJyk7XG4gICAgICBmb3JtT2JqZWN0LmhhbmRsZSgnbmFtZScsIGVudGl0eS5pZCgpKTtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCdiaW5kaW5nJywgZW50aXR5KTtcbiAgICB9IGVsc2UgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFByb3BlcnR5RGVmKSB7XG4gICAgICAvLyBUT0RPIHN1cHBvcnQgYWxzbyBvdGhlciB0eXBlc1xuICAgICAgbGV0IHByb3BlcnR5ID0gZW50aXR5O1xuICAgICAgbGV0IGZvcm1UeXBlID0gPHN0cmluZz5wcm9wZXJ0eS5nZXRPcHRpb25zKCdmb3JtJykgfHwgJ3RleHQnO1xuICAgICAgbGV0IG1ldGhvZE5hbWUgPSAnZm9yJyArIF8uY2FwaXRhbGl6ZShmb3JtVHlwZSk7XG4gICAgICBpZiAodGhpc1ttZXRob2ROYW1lXSkge1xuICAgICAgICBmb3JtT2JqZWN0ID0gdGhpc1ttZXRob2ROYW1lXShmb3JtVHlwZSwgcHJvcGVydHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybU9iamVjdCA9IHRoaXMuZm9yRGVmYXVsdChmb3JtVHlwZSwgcHJvcGVydHkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgRW50aXR5RGVmKSB7XG5cbiAgICB9XG5cbiAgICBpZiAoZm9ybU9iamVjdCAhPSBudWxsKSB7XG4gICAgICBmb3JtT2JqZWN0LnNldFBhcmVudChwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBmb3JtT2JqZWN0IG5vIGNyZWF0ZWQgYnV0IHBhcmVudCBpcyBwYXNzZWQgdGhlbiB1c2UgaXQgYXMgZm9ybW9iamVjdCBmdXJ0aGVyIChncmlkIDwtIGFkZCBmdXJ0ZXIgZWxlbWVudHMpXG4gICAgICBmb3JtT2JqZWN0ID0gcGFyZW50O1xuICAgIH1cblxuXG4gICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eURlZikge1xuICAgICAgbGV0IHByb3BlcnRpZXMgPSBlbnRpdHkuZ2V0UHJvcGVydHlEZWZzKCk7XG5cbiAgICAgIGZvciAobGV0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgbGV0IGNoaWxkT2JqZWN0ID0gdGhpcy5fYnVpbGRGb3JtT2JqZWN0KHByb3BlcnR5LCBmb3JtT2JqZWN0KTtcbiAgICAgICAgZm9ybU9iamVjdC5pbnNlcnQoY2hpbGRPYmplY3QpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIC8vIFRPRE8gZm9yIHByb3BlcnRpZXMgd2hpY2ggcG9pbnRzIHRvIEVudGl0eSAvIEVudGl0aWVzXG4gICAgICAvL3Byb3BlcnR5LmdldEVudGl0eURlZlxuICAgICAgLy9mb3JtT2JqZWN0O1xuICAgICAgbGV0IHByb3BlcnR5ID0gPFByb3BlcnR5RGVmPmVudGl0eTtcbiAgICAgIGlmIChwcm9wZXJ0eS5pc1JlZmVyZW5jZSgpKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eS5pc0VudGl0eVJlZmVyZW5jZSgpKSB7XG4gICAgICAgICAgbGV0IGVudGl0eSA9IHByb3BlcnR5LnRhcmdldFJlZi5nZXRFbnRpdHkoKTtcbiAgICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm1PYmplY3QoZW50aXR5LCBmb3JtT2JqZWN0KTtcbiAgICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLnNjaGVtYS5nZXRQcm9wZXJ0aWVzRm9yKHByb3BlcnR5LnRhcmdldFJlZi5nZXRDbGFzcygpKTtcbiAgICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm1PYmplY3QocHJvcGVydHksIGZvcm1PYmplY3QpO1xuICAgICAgICAgICAgZm9ybU9iamVjdC5pbnNlcnQoY2hpbGRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1PYmplY3QucG9zdFByb2Nlc3MoKTtcbiAgICByZXR1cm4gZm9ybU9iamVjdDtcblxuICB9XG5cbiAgcHJpdmF0ZSBmb3JEZWZhdWx0KGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIGxldCBmb3JtT2JqZWN0ID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmNyZWF0ZUhhbmRsZXIoZm9ybVR5cGUpO1xuICAgIGlmIChmb3JtT2JqZWN0KSB7XG4gICAgICBmb3JtT2JqZWN0LmhhbmRsZSgndmFyaWFudCcsIGZvcm1UeXBlKTtcbiAgICAgIHRoaXMuX2FwcGx5VmFsdWVzKGZvcm1PYmplY3QsIHByb3BlcnR5KTtcbiAgICAgIHJldHVybiBmb3JtT2JqZWN0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcihmb3JtVHlwZSk7XG4gIH1cblxuICBwcml2YXRlIGZvclRleHQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcklucHV0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gIH1cblxuICBwcml2YXRlIGZvclBhc3N3b3JkKGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIHJldHVybiB0aGlzLl9mb3JJbnB1dChmb3JtVHlwZSwgcHJvcGVydHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JFbWFpbChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ySW5wdXQoZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfZm9ySW5wdXQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgbGV0IGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcignaW5wdXQnKTtcbiAgICBmb3JtT2JqZWN0LmhhbmRsZSgndmFyaWFudCcsIGZvcm1UeXBlKTtcbiAgICB0aGlzLl9hcHBseVZhbHVlcyhmb3JtT2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgcmV0dXJuIGZvcm1PYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVZhbHVlcyhmb3JtT2JqZWN0OiBGb3JtT2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICBmb3JtT2JqZWN0LmhhbmRsZSgnbmFtZScsIHByb3BlcnR5Lm5hbWUpO1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCdpZCcsIHByb3BlcnR5LmlkKCkpO1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCdsYWJlbCcsIHByb3BlcnR5LmxhYmVsID8gcHJvcGVydHkubGFiZWwgOiBfLmNhcGl0YWxpemUocHJvcGVydHkubmFtZSkpO1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCdiaW5kaW5nJywgcHJvcGVydHkpO1xuXG4gICAgbGV0IG9wdGlvbnMgPSBwcm9wZXJ0eS5nZXRPcHRpb25zKCk7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0ID0+IHtcbiAgICAgICAgaWYgKC9eKHNvdXJjZXx0YXJnZXR8cHJvcGVydHkpLy50ZXN0KG9wdCkpIHJldHVybjtcbiAgICAgICAgbGV0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgICBmb3JtT2JqZWN0LmhhbmRsZShvcHQsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cblxuICBwcml2YXRlIF9idWlsZEZvcm0oZGF0YTogYW55LCBwYXJlbnQ6IEZvcm1PYmplY3QgPSBudWxsKSB7XG4gICAgbGV0IGtleXMgPSBfLnJlbW92ZShPYmplY3Qua2V5cyhkYXRhKSwgKGU6IHN0cmluZykgPT4gWydjaGlsZHJlbicsICd0eXBlJ10uaW5kZXhPZihlKSA9PT0gLTEpO1xuXG4gICAgbGV0IGZvcm1PYmplY3Q6IEZvcm1PYmplY3QgPSBudWxsO1xuICAgIGlmIChkYXRhLnR5cGUpIHtcbiAgICAgIC8vIGxvb2t1cCBoYW5kbGVyXG4gICAgICBmb3JtT2JqZWN0ID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmNyZWF0ZUhhbmRsZXIoZGF0YS50eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgdGhpcy5mb3JtID0gZm9ybU9iamVjdDtcbiAgICB9XG5cbiAgICBmb3JtT2JqZWN0LnNldFBhcmVudChwYXJlbnQpO1xuXG4gICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICBpZiAoL15cXCQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSBuZXcgUmVzb2x2ZURhdGFWYWx1ZSh2YWx1ZSwgZm9ybU9iamVjdCwga2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9ybU9iamVjdC5oYW5kbGUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICBpZiAoZGF0YS5jaGlsZHJlbikge1xuICAgICAgbGV0IHZhbHVlID0gZGF0YS5jaGlsZHJlbjtcbiAgICAgIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZhbHVlKSB7XG4gICAgICAgICAgbGV0IGNoaWxkT2JqZWN0ID0gdGhpcy5fYnVpbGRGb3JtKGVudHJ5LCBmb3JtT2JqZWN0KTtcbiAgICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RZZXRJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9ybU9iamVjdC5wb3N0UHJvY2VzcygpO1xuICAgIHJldHVybiBmb3JtT2JqZWN0O1xuXG4gIH1cbn1cbiJdfQ==