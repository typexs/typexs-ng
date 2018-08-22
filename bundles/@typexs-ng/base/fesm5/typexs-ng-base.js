import { __extends, __values, __decorate, __awaiter, __generator, __metadata } from 'tslib';
import { Component, NgModule, Injectable, ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { find, filter, has, get, set, capitalize, isString, isFunction, isArray, isEmpty, clone, remove, first } from 'lodash';
import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import { NotYetImplementedError } from 'typexs-base/libs/exceptions/NotYetImplementedError';
import { EntityDef } from 'typexs-schema/libs/EntityDef';
import { Registry } from 'typexs-schema/libs/Registry';
import { DataContainer } from 'typexs-schema/libs/DataContainer';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavEntry = /** @class */ (function () {
    function NavEntry() {
    }
    return NavEntry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavigatorComponent = /** @class */ (function () {
    function NavigatorComponent(router) {
        this.routes = [];
        try {
            for (var _a = __values(router.config), _b = _a.next(); !_b.done; _b = _a.next()) {
                var route = _b.value;
                var /** @type {?} */ entry = new NavEntry();
                entry.label = route.data["label"];
                entry.path = route.path;
                this.routes.push(entry);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // console.log(this.routes)
        var e_1, _c;
    }
    NavigatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nav-root',
                    templateUrl: './navigator.component.html',
                },] },
    ];
    /** @nocollapse */
    NavigatorComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return NavigatorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavigatorModule = /** @class */ (function () {
    function NavigatorModule() {
    }
    NavigatorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NavigatorComponent],
                    imports: [BrowserModule, RouterModule],
                    exports: [NavigatorComponent],
                    providers: []
                },] },
    ];
    return NavigatorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResolveDataValue = /** @class */ (function () {
    function ResolveDataValue(value, object, property) {
        this.path = [];
        this.fetchKey = null;
        this.property = null;
        this.object = null;
        this.property = property;
        this.object = object;
        this.orgValue = value.replace(/^\$/, '');
        this.path = this.orgValue.split('.');
        this.fetchKey = this.path.pop();
    }
    /**
     * @return {?}
     */
    ResolveDataValue.prototype.get = /**
     * @return {?}
     */
    function () {
        return this.orgValue;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    ResolveDataValue.prototype.resolve = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var /** @type {?} */ elem = form.get(this.path.join('.'));
        if (elem) {
            this.object[this.property] = elem[this.fetchKey];
            return elem[this.fetchKey];
        }
        else {
            throw new Error('cant resolve data');
        }
    };
    return ResolveDataValue;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
TreeObject = /** @class */ (function () {
    function TreeObject() {
        this.parent = null;
        this.children = [];
    }
    /**
     * @param {?} object
     * @return {?}
     */
    TreeObject.prototype.insert = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        object.parent = this;
        object.index = this.children.length;
        this.children.push(object);
    };
    /**
     * @return {?}
     */
    TreeObject.prototype.getParent = /**
     * @return {?}
     */
    function () {
        return this.parent;
    };
    /**
     * @param {?} parent
     * @return {?}
     */
    TreeObject.prototype.setParent = /**
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        if (parent) {
            this.parent = parent;
            this.index = this.parent.children.indexOf(this);
        }
    };
    /**
     * @return {?}
     */
    TreeObject.prototype.getChildren = /**
     * @return {?}
     */
    function () {
        return this.children;
    };
    return TreeObject;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} obj
 * @return {?}
 */
function isFormObject(obj) {
    return obj instanceof FormObject;
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
FormObject = /** @class */ (function (_super) {
    __extends(FormObject, _super);
    function FormObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.usedKeys = [];
        _this.binding = null;
        return _this;
    }
    /**
     * @return {?}
     */
    FormObject.prototype.getBinding = /**
     * @return {?}
     */
    function () {
        return this.binding;
    };
    /**
     * @return {?}
     */
    FormObject.prototype.getUsedKeys = /**
     * @return {?}
     */
    function () {
        return this.usedKeys;
    };
    /**
     * @return {?}
     */
    FormObject.prototype.getPath = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = [];
        if (this.getBinding() instanceof PropertyDef) {
            if (this.getParent()) {
                var /** @type {?} */ parent_1 = this.getParent();
                if (isFormObject(parent_1)) {
                    arr.push(parent_1.getPath());
                }
            }
            arr.push(this.name);
            if (this.getBinding().isCollection()) {
                arr.push('$idx');
            }
        }
        return filter(arr, function (x) { return x.trim() != ''; }).join('.');
    };
    /**
     * @return {?}
     */
    FormObject.prototype.getForm = /**
     * @return {?}
     */
    function () {
        if (this.parent && isFormObject(this.parent)) {
            return this.parent.getForm();
        }
        else if (this.type == 'form') {
            return this;
        }
        else {
            // TODO throw error this should never happen
            return null;
        }
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    FormObject.prototype.handle = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        if (value instanceof ResolveDataValue) {
            var /** @type {?} */ form = this.getForm(); //
            form['resolver'].push(value);
        }
        this.usedKeys.push(key);
        var /** @type {?} */ methodName = 'handle' + capitalize(key);
        if (this[methodName]) {
            this[methodName](value);
        }
        else {
            this[key] = value;
        }
    };
    /**
     * Don't override type
     */
    /**
     * Don't override type
     * @param {?} value
     * @return {?}
     */
    FormObject.prototype.handleType = /**
     * Don't override type
     * @param {?} value
     * @return {?}
     */
    function (value) {
    };
    /**
     * @return {?}
     */
    FormObject.prototype.postProcess = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} someObject
     * @return {?}
     */
    FormObject.prototype.replace = /**
     * @param {?} someObject
     * @return {?}
     */
    function (someObject) {
        var /** @type {?} */ parent = this.getParent();
        var /** @type {?} */ idx = parent.getChildren().indexOf(this);
        if (idx < 0) {
            throw new Error('can not find index, something is wrong');
        }
        parent.getChildren()[idx] = someObject;
        someObject.setParent(parent);
        return someObject;
    };
    return FormObject;
}(TreeObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoFormHandlerDefinedForTypeError = /** @class */ (function (_super) {
    __extends(NoFormHandlerDefinedForTypeError, _super);
    function NoFormHandlerDefinedForTypeError(typeName) {
        return _super.call(this, typeName + ' not defined') || this;
    }
    return NoFormHandlerDefinedForTypeError;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ContentComponentRegistry = /** @class */ (function () {
    function ContentComponentRegistry() {
        this.formHandler = [];
    }
    /**
     * @return {?}
     */
    ContentComponentRegistry.$ = /**
     * @return {?}
     */
    function () {
        if (!this.$self) {
            this.$self = new ContentComponentRegistry();
        }
        return this.$self;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.prototype.getOrCreateDef = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        var /** @type {?} */ exists = find(this.formHandler, { type: typeName });
        if (!exists) {
            exists = { type: typeName };
            this.formHandler.push(exists);
        }
        return exists;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.prototype.getDef = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        return find(this.formHandler, { type: typeName });
    };
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    ContentComponentRegistry.addHandler = /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    function (typeName, klass) {
        var /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.handler = klass;
        return def;
    };
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    ContentComponentRegistry.addComponent = /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    function (typeName, klass) {
        var /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.component = klass;
        return def;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.createHandler = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        var /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.handler) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        var /** @type {?} */ obj = Reflect.construct(handler.handler, []);
        obj.type = typeName;
        return obj;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.createComponent = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        var /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.component) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        var /** @type {?} */ obj = Reflect.construct(handler.component, []);
        obj.type = typeName;
        return obj;
    };
    ContentComponentRegistry.$self = null;
    return ContentComponentRegistry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} typeName
 * @return {?}
 */
function ViewContent(typeName) {
    return function (object) {
        ContentComponentRegistry.addHandler(typeName, object);
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tabs = __decorate([
        ViewContent('tabs')
    ], Tabs);
    return Tabs;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab = __decorate([
        ViewContent('tab')
    ], Tab);
    return Tab;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Ref = /** @class */ (function (_super) {
    __extends(Ref, _super);
    function Ref() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    Ref.prototype.postProcess = /**
     * @return {?}
     */
    function () {
        this.getForm()['resolver'].push(this);
    };
    /**
     * @param {?} form
     * @return {?}
     */
    Ref.prototype.resolve = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        var /** @type {?} */ elem = form.get(this.use);
        if (isFormObject(elem)) {
            var /** @type {?} */ e_1 = clone(elem);
            this.replace(e_1);
            // copy properties
            this.getUsedKeys().forEach(function (k) {
                e_1.handle(k, _this[k]);
            });
        }
    };
    Ref = __decorate([
        ViewContent('ref')
    ], Ref);
    return Ref;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Input$1 = /** @class */ (function (_super) {
    __extends(Input$$1, _super);
    function Input$$1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.variant = 'text';
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    Input$$1.prototype.handleVariant = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.variant = value;
    };
    Input$$1 = __decorate([
        ViewContent('input')
    ], Input$$1);
    return Input$$1;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resolver = [];
        return _this;
    }
    /**
     * @param {?} otherForm
     * @return {?}
     */
    Form.prototype.combine = /**
     * @param {?} otherForm
     * @return {?}
     */
    function (otherForm) {
        var /** @type {?} */ resolverCache = [];
        while (this.resolver.length > 0) {
            var /** @type {?} */ resolver = this.resolver.shift();
            if (resolver instanceof ResolveDataValue) {
                resolver.resolve(otherForm);
            }
            else {
                resolverCache.push(resolver);
            }
        }
        while (resolverCache.length > 0) {
            var /** @type {?} */ resolver = resolverCache.shift();
            if (resolver instanceof Ref) {
                resolver.resolve(otherForm);
            }
        }
        return this;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    Form.prototype.get = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ _path = path.split('.');
        var /** @type {?} */ tmpElem = this;
        var /** @type {?} */ element = null;
        while (_path.length > 0) {
            var /** @type {?} */ _p = _path.shift();
            var /** @type {?} */ ret = find(/** @type {?} */ (tmpElem.getChildren()), { name: _p });
            //if(isFormObject(ret)){
            tmpElem = ret;
            if (!tmpElem) {
                break;
            }
            else {
                element = tmpElem;
            }
            //}
        }
        return _path.length == 0 && element ? element : null;
    };
    Form = __decorate([
        ViewContent('form')
    ], Form);
    return Form;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Checkbox = __decorate([
        ViewContent('checkbox')
    ], Checkbox);
    return Checkbox;
}(Input$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radio = __decorate([
        ViewContent('radio')
    ], Radio);
    return Radio;
}(Input$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Select = __decorate([
        ViewContent('select')
    ], Select);
    return Select;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid = __decorate([
        ViewContent('grid')
    ], Grid);
    return Grid;
}(FormObject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoFormTypeDefinedError = /** @class */ (function (_super) {
    __extends(NoFormTypeDefinedError, _super);
    function NoFormTypeDefinedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoFormTypeDefinedError;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            var /** @type {?} */ methodName = 'for' + capitalize(formType);
            if (this[methodName]) {
                formObject = this[methodName](formType, property);
            }
            else {
                formObject = this.forDefault(formType, property);
            }
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
                for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
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
                        for (var properties_2 = __values(properties), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
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
        formObject.handle('label', property.label ? property.label : capitalize(property.name));
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
        var /** @type {?} */ keys = remove(Object.keys(data), function (e) { return ['children', 'type'].indexOf(e) === -1; });
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
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var /** @type {?} */ value = data[key];
                if (isString(value)) {
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
            if (isArray(value)) {
                try {
                    for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormService = /** @class */ (function () {
    function FormService() {
        this.cache = {};
    }
    /**
     * @param {?} name
     * @param {?} instance
     * @return {?}
     */
    FormService.prototype.get = /**
     * @param {?} name
     * @param {?} instance
     * @return {?}
     */
    function (name, instance) {
        // TODO lookup for form modifications
        var /** @type {?} */ entityDef = Registry.getEntityDefFor(instance);
        var /** @type {?} */ builder2 = new FormBuilder();
        return builder2.buildFromEntity(entityDef);
    };
    FormService.decorators = [
        { type: Injectable },
    ];
    return FormService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} typeName
 * @return {?}
 */
function ViewComponent(typeName) {
    return function (object) {
        ContentComponentRegistry.addComponent(typeName, object);
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ PROP_METADATA = '__prop__metadata__';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var AbstractComponent = /** @class */ (function () {
    function AbstractComponent(injector, r) {
        this.injector = injector;
        this.r = r;
        this.construct();
    }
    /**
     * @return {?}
     */
    AbstractComponent.prototype.construct = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    AbstractComponent.prototype.setElem = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        this.elem = elem;
    };
    /**
     * @param {?} content
     * @return {?}
     */
    AbstractComponent.prototype.buildSingle = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        var /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
        if (handle && handle.component) {
            if (this.vc) {
                var /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                var /** @type {?} */ compRef = this.vc.createComponent(factory);
                var /** @type {?} */ instance_1 = /** @type {?} */ (compRef.instance);
                var /** @type {?} */ metadata_1 = null;
                if (instance_1.constructor.hasOwnProperty(PROP_METADATA)) {
                    metadata_1 = instance_1.constructor[PROP_METADATA];
                }
                instance_1.setElem(content);
                if (instance_1.build) {
                    var /** @type {?} */ refs_1 = instance_1.build(content);
                    if (metadata_1) {
                        Object.keys(metadata_1).forEach(function (key) {
                            var /** @type {?} */ v = metadata_1[key];
                            if (!isEmpty(v)) {
                                if (isArray(v) && v.length === 1) {
                                    var /** @type {?} */ propDecorator_1 = first(v);
                                    if (isFunction(propDecorator_1.selector)) {
                                        if (propDecorator_1.first) {
                                            // simple ViewChild
                                            // simple ViewChild
                                            instance_1[key] = find(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                            instance_1[key + '2'] = find(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                        }
                                        else {
                                            // simple ViewChildren
                                            // simple ViewChildren
                                            instance_1[key] = filter(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                            instance_1[key + '2'] = filter(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                        }
                                    }
                                }
                                else {
                                    console.error('can\'t resolve metadata', instance_1.constructor, key, v);
                                }
                            }
                        });
                    }
                }
                return instance_1;
            }
            else {
                console.error('No view content setted');
            }
        }
        else {
            throw new NoFormTypeDefinedError(content.type);
        }
        return null;
    };
    /**
     * @param {?} content
     * @return {?}
     */
    AbstractComponent.prototype.build = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        var _this = this;
        var /** @type {?} */ refs = [];
        content.getChildren().forEach(function (contentObject) {
            var /** @type {?} */ ref = _this.buildSingle(/** @type {?} */ (contentObject));
            refs.push(ref);
        });
        return refs;
    };
    /** @nocollapse */
    AbstractComponent.ctorParameters = function () { return [
        { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
        { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
    ]; };
    AbstractComponent.propDecorators = {
        "vc": [{ type: ViewChild, args: ['content', { read: ViewContainerRef },] },],
    };
    return AbstractComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Context = /** @class */ (function () {
    function Context() {
        this.idx = -1;
    }
    // alignment:
    /**
     * @param {?=} _name
     * @param {?=} idx
     * @return {?}
     */
    Context.prototype.child = /**
     * @param {?=} _name
     * @param {?=} idx
     * @return {?}
     */
    function (_name, idx) {
        if (_name === void 0) { _name = null; }
        if (idx === void 0) { idx = -1; }
        var /** @type {?} */ name = new Context();
        name.parent = this;
        name.name = _name;
        name.idx = idx;
        return name;
    };
    /**
     * @return {?}
     */
    Context.prototype.path = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = [];
        if (this.parent) {
            arr = this.parent.path().split('.');
        }
        if (this.idx > -1) {
            arr[arr.length - 1] = arr[arr.length - 1] + '[' + this.idx + ']';
            // arr.push(this.name + '[' + this.idx + ']');
        }
        else {
            arr.push(this.name);
        }
        //  console.log(arr);
        return filter(arr, function (x) { return !isEmpty(x); }).join('.');
    };
    /**
     * @param {?} key
     * @param {?=} _default
     * @return {?}
     */
    Context.prototype.get = /**
     * @param {?} key
     * @param {?=} _default
     * @return {?}
     */
    function (key, _default) {
        if (_default === void 0) { _default = null; }
        if (has(this, key)) {
            return get(this, key, _default);
        }
        else if (this.parent) {
            return this.parent.get(key);
        }
        return _default;
    };
    return Context;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var AbstractFormComponent = /** @class */ (function (_super) {
    __extends(AbstractFormComponent, _super);
    function AbstractFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inc = 0;
        return _this;
    }
    /**
     * @return {?}
     */
    AbstractFormComponent.prototype.construct = /**
     * @return {?}
     */
    function () {
        this.inc = AbstractFormComponent._inc++;
    };
    Object.defineProperty(AbstractFormComponent.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "labelDisplay", {
        get: /**
         * @return {?}
         */
        function () {
            return this.context.get('labelDisplay', 'top');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "help", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.help;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "isReadOnly", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "isValid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.data.checked(this.name) && this.data.valid(this.name);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} elem
     * @return {?}
     */
    AbstractFormComponent.prototype.setFormObject = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        this.setElem(elem);
    };
    /**
     * @param {?} elem
     * @param {?} parent
     * @param {?=} idx
     * @return {?}
     */
    AbstractFormComponent.prototype.setData = /**
     * @param {?} elem
     * @param {?} parent
     * @param {?=} idx
     * @return {?}
     */
    function (elem, parent, idx) {
        if (idx === void 0) { idx = -1; }
        this.setFormObject(elem);
        if (parent) {
            this.context = parent.child(elem.name, idx);
        }
        else {
            this.context = new Context();
            if (elem.getBinding() instanceof PropertyDef) {
                this.context.name = elem.name;
                this.context.idx = idx;
            }
        }
    };
    Object.defineProperty(AbstractFormComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ path = this.context.path();
            return get(this.data.instance, path, null);
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ path = this.context.path();
            set(this.data.instance, path, v);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} form
     * @return {?}
     */
    AbstractFormComponent.prototype.build = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        var /** @type {?} */ comp = [];
        form.getChildren().forEach(function (formObject) {
            if (isFormObject(formObject)) {
                var /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
                if (handle && handle.component) {
                    if (_this.vc) {
                        var /** @type {?} */ factory = _this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        var /** @type {?} */ ref = _this.vc.createComponent(factory);
                        var /** @type {?} */ instance = /** @type {?} */ (ref.instance);
                        instance.data = _this.data;
                        instance.setData(formObject, _this.context);
                        instance.build(formObject);
                        comp.push(instance);
                    }
                    else {
                        console.error('No view content setted');
                    }
                }
                else {
                    throw new NoFormTypeDefinedError(formObject.type);
                }
            }
        });
        return comp;
    };
    AbstractFormComponent._inc = 0;
    return AbstractFormComponent;
}(AbstractComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormComponent = /** @class */ (function (_super) {
    __extends(FormComponent, _super);
    function FormComponent(formService, injector, r) {
        var _this = _super.call(this, injector, r) || this;
        _this.formService = formService;
        _this.injector = injector;
        _this.r = r;
        _this.ngSubmit = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    FormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // TODO instance must be present
        this.data = new DataContainer(this.instance);
        this.elem = this.formService.get(this.formName, this.instance);
        // TODO restructure form
        this.build(this.elem);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormComponent.prototype.onSubmit = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.validate()];
                    case 1:
                        _a.sent();
                        this.ngSubmit.emit({ event: $event, data: this.data });
                        return [2 /*return*/, false];
                }
            });
        });
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xform',
                    templateUrl: './form.component.html',
                },] },
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = function () { return [
        { type: FormService, decorators: [{ type: Inject, args: [FormService,] },] },
        { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
        { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
    ]; };
    FormComponent.propDecorators = {
        "ngSubmit": [{ type: Output },],
        "formName": [{ type: Input },],
        "instance": [{ type: Input },],
    };
    FormComponent = __decorate([
        ViewComponent('form'),
        __metadata("design:paramtypes", [FormService,
            Injector,
            ComponentFactoryResolver])
    ], FormComponent);
    return FormComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super); /* implements OnInit, OnChanges */
    function InputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InputComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.variant;
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xinput',
                    templateUrl: './input.component.html',
                },] },
    ];
    InputComponent = __decorate([
        ViewComponent('input')
    ], InputComponent);
    return InputComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CheckboxComponent = /** @class */ (function (_super) {
    __extends(CheckboxComponent, _super);
    function CheckboxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CheckboxComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.variant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.data.instance[this.name];
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.data.instance[this.name] = true;
            }
            else {
                this.data.instance[this.name] = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xcheckbox',
                    templateUrl: './checkbox.component.html',
                },] },
    ];
    CheckboxComponent = __decorate([
        ViewComponent('checkbox')
    ], CheckboxComponent);
    return CheckboxComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RadioComponent = /** @class */ (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on = 'Yes';
        _this.off = 'No';
        return _this;
    }
    Object.defineProperty(RadioComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.variant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "isChecked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.data.instance[this.name];
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.data.instance[this.name] = true;
            }
            else {
                this.data.instance[this.name] = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    RadioComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xradio',
                    templateUrl: './radio.component.html',
                },] },
    ];
    RadioComponent = __decorate([
        ViewComponent('radio')
    ], RadioComponent);
    return RadioComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Option = /** @class */ (function () {
    function Option() {
        this.value = '';
        this.label = '---';
    }
    return Option;
}());
var SelectComponent = /** @class */ (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cachedOptions = [];
        return _this;
    }
    Object.defineProperty(SelectComponent.prototype, "supportsMultiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.getBinding().isCollection();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.cachedOptions = [];
        this.loadOptions();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.loadOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ enums = this.retrieveEnum();
        if (enums) {
            if (enums instanceof Observable) {
                enums.subscribe(function (e) {
                    var /** @type {?} */ o = new Option();
                    if (isString(e)) {
                        o.label = o.value = e;
                    }
                    else if (has(e, 'label') || has(e, 'value')) {
                        o.label = get(e, 'label', get(e, 'value'));
                        o.value = get(e, 'value', get(e, 'label'));
                    }
                    else {
                        throw new Error('not found');
                    }
                    _this.cachedOptions.push(o);
                });
            }
            else {
                enums.forEach(function (e) {
                    var /** @type {?} */ o = new Option();
                    if (isString(e)) {
                        o.label = o.value = e;
                    }
                    else if (has(e, 'label') || has(e, 'value')) {
                        o.label = get(e, 'label', get(e, 'value'));
                        o.value = get(e, 'value', get(e, 'label'));
                    }
                    else {
                        throw new Error('not found');
                    }
                    _this.cachedOptions.push(o);
                });
            }
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.retrieveEnum = /**
     * @return {?}
     */
    function () {
        if (isArray(this.elem.enum)) {
            return this.elem.enum;
        }
        else if (isFunction(this.elem.enum)) {
            return this.injector.get(this.elem.enum).get(this.name);
        }
        else if (isString(this.elem.enum)) {
            // check if an entry with the propertyname exists
            var /** @type {?} */ lookupPath = [];
            if (this.context.parent) {
                lookupPath.push(this.context.parent.path());
            }
            lookupPath.push(this.elem.enum);
            lookupPath = (/** @type {?} */ (lookupPath)).join('.');
            if (has(this.data.instance, lookupPath)) {
                // TODO observe if property is changed, if it does then reset enum
                return get(this.data.instance, lookupPath, []);
            }
            else {
                throw new Error('not found enum reference');
            }
        }
        return [];
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xselect',
                    templateUrl: './select.component.html',
                },] },
    ];
    SelectComponent = __decorate([
        ViewComponent('select')
    ], SelectComponent);
    return SelectComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridCellComponent = /** @class */ (function (_super) {
    __extends(GridCellComponent, _super);
    function GridCellComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GridCellComponent.prototype, "hostClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return [
                'col'
            ].join(' ');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grid
     * @return {?}
     */
    GridCellComponent.prototype.setGridComponent = /**
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        this.grid = grid;
    };
    GridCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xgridcell',
                    templateUrl: './grid-cell.component.html',
                },] },
    ];
    /** @nocollapse */
    GridCellComponent.propDecorators = {
        "hostClasses": [{ type: HostBinding, args: ['class',] },],
    };
    return GridCellComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridRowComponent = /** @class */ (function (_super) {
    __extends(GridRowComponent, _super);
    function GridRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    GridRowComponent.prototype.setGridComponent = /**
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        this.grid = grid;
    };
    Object.defineProperty(GridRowComponent.prototype, "hostClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return [
                'form-row'
            ].join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridRowComponent.prototype, "idx", {
        get: /**
         * @return {?}
         */
        function () {
            return this.context.idx;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GridRowComponent.prototype.removeRow = /**
     * @return {?}
     */
    function () {
        this.grid.removeRow(this.context.idx);
    };
    /**
     * @param {?} form
     * @return {?}
     */
    GridRowComponent.prototype.build = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        var /** @type {?} */ comp = [];
        form.getChildren().forEach(function (formObject) {
            if (isFormObject(formObject)) {
                var /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
                if (handle && handle.component) {
                    var /** @type {?} */ cGridCellFactory = _this.r.resolveComponentFactory(GridCellComponent);
                    var /** @type {?} */ cGridCell = _this.vc.createComponent(cGridCellFactory);
                    cGridCell.instance.data = _this.data;
                    cGridCell.instance.setGridComponent(_this.grid);
                    cGridCell.instance.setData(formObject, _this.context);
                    if (cGridCell.instance.vc) {
                        var /** @type {?} */ factory = _this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        var /** @type {?} */ ref = cGridCell.instance.vc.createComponent(factory);
                        var /** @type {?} */ instance = /** @type {?} */ (ref.instance);
                        instance.data = _this.data;
                        instance.setData(formObject, _this.context);
                        instance.build(formObject);
                        comp.push(instance);
                    }
                    else {
                        console.error('No view content setted');
                    }
                }
                else {
                    throw new NoFormTypeDefinedError(formObject.type);
                }
            }
        });
        return comp;
    };
    GridRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xgridrow',
                    templateUrl: './grid-row.component.html',
                },] },
    ];
    /** @nocollapse */
    GridRowComponent.propDecorators = {
        "hostClasses": [{ type: HostBinding, args: ['class',] },],
    };
    return GridRowComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridComponent = /** @class */ (function (_super) {
    __extends(GridComponent, _super);
    function GridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entries = [];
        _this.header = [];
        return _this;
    }
    /**
     * @return {?}
     */
    GridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    GridComponent.prototype.addRow = /**
     * @param {?=} index
     * @return {?}
     */
    function (index) {
        if (index === void 0) { index = -1; }
        var /** @type {?} */ factory = this.r.resolveComponentFactory(GridRowComponent);
        var /** @type {?} */ cGridRow = this.vc.createComponent(factory);
        cGridRow.instance.data = this.data;
        cGridRow.instance.setGridComponent(this);
        cGridRow.instance.setData(this.elem, this.context, this.entries.length);
        this.entries.push(cGridRow);
        var /** @type {?} */ object = Reflect.construct(this.elem.getBinding().targetRef.getClass(), []);
        var /** @type {?} */ path = this.context.path();
        if (this.elem.getBinding().isCollection()) {
            var /** @type {?} */ arraySetted = get(this.data.instance, path, null);
            if (!arraySetted) {
                arraySetted = [];
            }
            arraySetted[cGridRow.instance.context.idx] = object;
            set(this.data.instance, path, arraySetted);
        }
        else {
            set(this.data.instance, path, object);
        }
        cGridRow.instance.build(this.elem);
        return cGridRow.instance;
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    GridComponent.prototype.removeRow = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        // TODO check if exists
        var /** @type {?} */ path = this.context.path();
        var /** @type {?} */ components = this.entries.splice(idx, 1);
        var /** @type {?} */ component = components.shift();
        this.vc.remove(idx);
        if (this.elem.getBinding().isCollection()) {
            var /** @type {?} */ arraySetted = get(this.data.instance, path, null);
            if (!arraySetted) {
                arraySetted = [];
            }
            arraySetted.splice(idx, 1);
            set(this.data.instance, path, arraySetted);
        }
        else {
            set(this.data.instance, path, null);
        }
        for (var /** @type {?} */ i = this.entries.length - 1; i >= 0; i--) {
            this.entries[i].instance.context.idx = i;
        }
        component.destroy();
    };
    /**
     * @param {?} form
     * @return {?}
     */
    GridComponent.prototype.build = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        this.context.labelDisplay = 'none';
        form.getChildren().forEach(function (obj) {
            if (isFormObject(obj)) {
                _this.header.push(obj.label);
            }
        });
        var /** @type {?} */ dataEntries = this.elem.getBinding().get(this.data.instance);
        var /** @type {?} */ c = this.addRow();
        return [c];
    };
    GridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xgrid',
                    templateUrl: './grid.component.html',
                },] },
    ];
    GridComponent = __decorate([
        ViewComponent('grid')
    ], GridComponent);
    return GridComponent;
}(AbstractFormComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ XFORMCOMPONENT = [
    FormComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    GridComponent,
    GridRowComponent,
    GridCellComponent
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var xFormsModule = /** @class */ (function () {
    function xFormsModule() {
    }
    xFormsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: XFORMCOMPONENT,
                    imports: [
                        FormsModule,
                        BrowserModule
                    ],
                    entryComponents: XFORMCOMPONENT,
                    exports: XFORMCOMPONENT,
                    providers: [
                        FormService
                    ]
                },] },
    ];
    return xFormsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
var ViewBuilderComponent = /** @class */ (function (_super) {
    __extends(ViewBuilderComponent, _super);
    function ViewBuilderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._build = false;
        return _this;
    }
    Object.defineProperty(ViewBuilderComponent.prototype, "instance", {
        get: /**
         * @return {?}
         */
        function () {
            return this._instance;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._instance = value;
            this._build = false;
            this.__build();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewBuilderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.__build();
    };
    /**
     * @return {?}
     */
    ViewBuilderComponent.prototype.__build = /**
     * @return {?}
     */
    function () {
        if (!this._build) {
            this.vc.clear();
            this.buildSingle(this._instance);
            this._build = true;
        }
    };
    ViewBuilderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'view-builder',
                    templateUrl: './view-builder.component.html',
                },] },
    ];
    /** @nocollapse */
    ViewBuilderComponent.propDecorators = {
        "instance": [{ type: Input },],
    };
    return ViewBuilderComponent;
}(AbstractComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var xViewsModule = /** @class */ (function () {
    function xViewsModule() {
    }
    xViewsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ViewBuilderComponent],
                    imports: [
                        BrowserModule
                    ],
                    entryComponents: [],
                    exports: [ViewBuilderComponent],
                    providers: []
                },] },
    ];
    return xViewsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NavigatorModule, xFormsModule, xViewsModule, AbstractFormComponent as ɵd, AbstractComponent as ɵe, ViewComponent as ɵf, NavigatorComponent as ɵa, CheckboxComponent as ɵi, FormComponent as ɵc, FormService as ɵg, GridCellComponent as ɵn, GridRowComponent as ɵm, GridComponent as ɵl, InputComponent as ɵh, RadioComponent as ɵj, SelectComponent as ɵk, XFORMCOMPONENT as ɵb, ViewBuilderComponent as ɵo };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXhzLW5nLWJhc2UuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL25hdmlnYXRvci9OYXZFbnRyeS50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMvbmF2aWdhdG9yL25hdmlnYXRvci5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL25hdmlnYXRvci9uYXZpZ2F0b3IubW9kdWxlLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vUmVzb2x2ZURhdGFWYWx1ZS50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHN2aWV3L1RyZWVPYmplY3QudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9Gb3JtT2JqZWN0LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy9leGNlcHRpb25zL05vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c3ZpZXcvQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29udGVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL1RhYnMudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9UYWIudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9SZWYudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9JbnB1dC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL0Zvcm0udHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9DaGVja2JveC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL1JhZGlvLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvU2VsZWN0LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvR3JpZC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vRm9ybUJ1aWxkZXIudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9mb3JtLnNlcnZpY2UudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHN2aWV3L0NvbnRleHQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2lucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2NoZWNrYm94LmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL3JhZGlvLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL3NlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9ncmlkLWNlbGwuY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vZ3JpZC1yb3cuY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS94Zm9ybXMuZWxlbWVudHMudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS94Zm9ybXMubW9kdWxlLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c3ZpZXcvdmlldy1idWlsZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHN2aWV3L3h2aWV3cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE5hdkVudHJ5IHtcbiAgcGF0aDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtOYXZFbnRyeX0gZnJvbSBcIi4vTmF2RW50cnlcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmF2LXJvb3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yQ29tcG9uZW50IHtcblxuICByb3V0ZXM6IE5hdkVudHJ5W10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XG5cbiAgICBmb3IgKGxldCByb3V0ZSBvZiByb3V0ZXIuY29uZmlnKSB7XG4gICAgICBsZXQgZW50cnkgPSBuZXcgTmF2RW50cnkoKTtcbiAgICAgIGVudHJ5LmxhYmVsID0gcm91dGUuZGF0YS5sYWJlbDtcbiAgICAgIGVudHJ5LnBhdGggPSByb3V0ZS5wYXRoO1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaChlbnRyeSk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGVzKVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge05hdmlnYXRvckNvbXBvbmVudH0gZnJvbSBcIi4vbmF2aWdhdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOYXZpZ2F0b3JDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSxSb3V0ZXJNb2R1bGVdLFxuICBleHBvcnRzOltOYXZpZ2F0b3JDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvck1vZHVsZSB7XG5cblxuXG5cbn1cbiIsImltcG9ydCB7Rm9ybU9iamVjdH0gZnJvbSAnLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9lbGVtZW50cy9Gb3JtJztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuL0lSZXNvbHZlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlRGF0YVZhbHVlIGltcGxlbWVudHMgSVJlc29sdmVyIHtcblxuICBwcml2YXRlIG9yZ1ZhbHVlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBwYXRoOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmV0Y2hLZXk6IHN0cmluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcm9wZXJ0eTogc3RyaW5nID0gbnVsbDtcblxuICBwcml2YXRlIG9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgb2JqZWN0OiBGb3JtT2JqZWN0LCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMub3JnVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eXFwkLywgJycpO1xuICAgIHRoaXMucGF0aCA9IHRoaXMub3JnVmFsdWUuc3BsaXQoJy4nKTtcbiAgICB0aGlzLmZldGNoS2V5ID0gdGhpcy5wYXRoLnBvcCgpO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9yZ1ZhbHVlO1xuICB9XG5cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMucGF0aC5qb2luKCcuJykpO1xuICAgIGlmIChlbGVtKSB7XG4gICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IGVsZW1bdGhpcy5mZXRjaEtleV07XG4gICAgICByZXR1cm4gZWxlbVt0aGlzLmZldGNoS2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW50IHJlc29sdmUgZGF0YScpO1xuICAgIH1cblxuICB9XG5cbn1cblxuIiwiaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmVlT2JqZWN0IHtcblxuICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogQ29udGV4dDtcblxuICBpbmRleDogbnVtYmVyO1xuXG4gIHBhcmVudDogVHJlZU9iamVjdCA9IG51bGw7XG5cbiAgY2hpbGRyZW46IFRyZWVPYmplY3RbXSA9IFtdO1xuXG4gIGluc2VydChvYmplY3Q6IFRyZWVPYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcbiAgICBvYmplY3QuaW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIGdldFBhcmVudCgpOiBUcmVlT2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICBzZXRQYXJlbnQocGFyZW50OiBUcmVlT2JqZWN0KSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4uL3hzdmlldy9UcmVlT2JqZWN0JztcblxuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtT2JqZWN0KG9iajogVHJlZU9iamVjdCB8IEZvcm1PYmplY3QpOiBvYmogaXMgRm9ybU9iamVjdCB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBGb3JtT2JqZWN0O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybU9iamVjdCBleHRlbmRzIFRyZWVPYmplY3Qge1xuXG4gIGlkOiBzdHJpbmc7XG5cbiAgdXNlZEtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgaGVscDogc3RyaW5nO1xuXG4gIHJlYWRvbmx5OiBmYWxzZTtcblxuICBwcml2YXRlIGJpbmRpbmc6IFByb3BlcnR5RGVmID0gbnVsbDtcblxuXG4gIGdldEJpbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZGluZztcbiAgfVxuXG5cblxuICBnZXRVc2VkS2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy51c2VkS2V5cztcbiAgfVxuXG5cblxuICBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgaWYgKHRoaXMuZ2V0QmluZGluZygpIGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIGlmICh0aGlzLmdldFBhcmVudCgpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmKGlzRm9ybU9iamVjdChwYXJlbnQpKXtcbiAgICAgICAgICBhcnIucHVzaChwYXJlbnQuZ2V0UGF0aCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAvLyAgdGhyb3cgbmV3IEVycm9yKCdwYXJlbnQgaXMgbm90IGEgZm9ybSBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLnB1c2godGhpcy5uYW1lKTtcbiAgICAgIGlmICh0aGlzLmdldEJpbmRpbmcoKS5pc0NvbGxlY3Rpb24oKSkge1xuICAgICAgICBhcnIucHVzaCgnJGlkeCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiB4LnRyaW0oKSAhPSAnJykuam9pbignLicpO1xuICB9XG5cblxuICBnZXRGb3JtKCk6IEZvcm1PYmplY3Qge1xuICAgIGlmICh0aGlzLnBhcmVudCAmJiBpc0Zvcm1PYmplY3QodGhpcy5wYXJlbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0Rm9ybSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09ICdmb3JtJykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3IgdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgIGxldCBmb3JtID0gdGhpcy5nZXRGb3JtKCk7IC8vXG4gICAgICBmb3JtWydyZXNvbHZlciddLnB1c2godmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMudXNlZEtleXMucHVzaChrZXkpO1xuICAgIGxldCBtZXRob2ROYW1lID0gJ2hhbmRsZScgKyBfLmNhcGl0YWxpemUoa2V5KTtcbiAgICBpZiAodGhpc1ttZXRob2ROYW1lXSkge1xuICAgICAgdGhpc1ttZXRob2ROYW1lXSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEb24ndCBvdmVycmlkZSB0eXBlXG4gICAqL1xuICBoYW5kbGVUeXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgfVxuXG5cbiAgcG9zdFByb2Nlc3MoKSB7XG4gIH1cblxuXG4gIHJlcGxhY2Uoc29tZU9iamVjdDogRm9ybU9iamVjdCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgIGxldCBpZHggPSBwYXJlbnQuZ2V0Q2hpbGRyZW4oKS5pbmRleE9mKHRoaXMpO1xuICAgIGlmIChpZHggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgZmluZCBpbmRleCwgc29tZXRoaW5nIGlzIHdyb25nJyk7XG4gICAgfVxuICAgIHBhcmVudC5nZXRDaGlsZHJlbigpW2lkeF0gPSBzb21lT2JqZWN0O1xuICAgIHNvbWVPYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgcmV0dXJuIHNvbWVPYmplY3Q7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IodHlwZU5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHR5cGVOYW1lICsgJyBub3QgZGVmaW5lZCcpO1xuICB9XG59XG4iLCJpbXBvcnQge05vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yfSBmcm9tICcuLy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcic7XG5pbXBvcnQge0lFbGVtZW50RGVmfSBmcm9tICcuL0lFbGVtZW50RGVmJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHN0YXRpYyAkc2VsZjogQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5ID0gbnVsbDtcblxuICBwcml2YXRlIGZvcm1IYW5kbGVyOiBJRWxlbWVudERlZltdID0gW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHN0YXRpYyAkKCk6IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSB7XG4gICAgaWYgKCF0aGlzLiRzZWxmKSB7XG4gICAgICB0aGlzLiRzZWxmID0gbmV3IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kc2VsZjtcbiAgfVxuXG4gIGdldE9yQ3JlYXRlRGVmKHR5cGVOYW1lOiBzdHJpbmcpOiBJRWxlbWVudERlZiB7XG4gICAgbGV0IGV4aXN0cyA9IF8uZmluZCh0aGlzLmZvcm1IYW5kbGVyLCB7dHlwZTogdHlwZU5hbWV9KTtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgZXhpc3RzID0ge3R5cGU6IHR5cGVOYW1lfTtcbiAgICAgIHRoaXMuZm9ybUhhbmRsZXIucHVzaChleGlzdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZXhpc3RzO1xuICB9XG5cbiAgZ2V0RGVmKHR5cGVOYW1lOiBzdHJpbmcpOiBJRWxlbWVudERlZiB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLmZvcm1IYW5kbGVyLCB7dHlwZTogdHlwZU5hbWV9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRIYW5kbGVyKHR5cGVOYW1lOiBzdHJpbmcsIGtsYXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBkZWYgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgZGVmLmhhbmRsZXIgPSBrbGFzcztcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cblxuICBzdGF0aWMgYWRkQ29tcG9uZW50KHR5cGVOYW1lOiBzdHJpbmcsIGtsYXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBkZWYgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgZGVmLmNvbXBvbmVudCA9IGtsYXNzO1xuICAgIHJldHVybiBkZWY7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlSGFuZGxlcih0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgaWYgKCFoYW5kbGVyIHx8ICFoYW5kbGVyLmhhbmRsZXIpIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcih0eXBlTmFtZSk7XG4gICAgfVxuICAgIGxldCBvYmogPSBSZWZsZWN0LmNvbnN0cnVjdChoYW5kbGVyLmhhbmRsZXIsIFtdKTtcbiAgICBvYmoudHlwZSA9IHR5cGVOYW1lO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlQ29tcG9uZW50KHR5cGVOYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgaGFuZGxlciA9IHRoaXMuJCgpLmdldE9yQ3JlYXRlRGVmKHR5cGVOYW1lKTtcbiAgICBpZiAoIWhhbmRsZXIgfHwgIWhhbmRsZXIuY29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3IodHlwZU5hbWUpO1xuICAgIH1cbiAgICBsZXQgb2JqID0gUmVmbGVjdC5jb25zdHJ1Y3QoaGFuZGxlci5jb21wb25lbnQsIFtdKTtcbiAgICBvYmoudHlwZSA9IHR5cGVOYW1lO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxufVxuXG4iLCJpbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVmlld0NvbnRlbnQodHlwZU5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iamVjdDogRnVuY3Rpb24pIHtcbiAgICBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuYWRkSGFuZGxlcih0eXBlTmFtZSwgb2JqZWN0KTtcbiAgfTtcbn1cbiIsIlxuaW1wb3J0IHtGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcblxuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3RhYnMnKVxuZXhwb3J0IGNsYXNzIFRhYnMgZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxufVxuIiwiXG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3RhYicpXG5leHBvcnQgY2xhc3MgVGFiIGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbn1cbiIsImltcG9ydCB7Rm9ybU9iamVjdCwgaXNGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuLi9JUmVzb2x2ZXInO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL0Zvcm0nO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuQFZpZXdDb250ZW50KCdyZWYnKVxuZXhwb3J0IGNsYXNzIFJlZiBleHRlbmRzIEZvcm1PYmplY3QgaW1wbGVtZW50cyBJUmVzb2x2ZXIge1xuXG4gIHVzZTogc3RyaW5nO1xuXG4gIHBvc3RQcm9jZXNzKCkge1xuICAgIHRoaXMuZ2V0Rm9ybSgpWydyZXNvbHZlciddLnB1c2godGhpcyk7XG4gIH1cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMudXNlKTtcbiAgICBpZihpc0Zvcm1PYmplY3QoZWxlbSkpe1xuICAgICAgbGV0IGUgPSBfLmNsb25lKGVsZW0pO1xuICAgICAgdGhpcy5yZXBsYWNlKGUpO1xuXG4gICAgICAvLyBjb3B5IHByb3BlcnRpZXNcbiAgICAgIHRoaXMuZ2V0VXNlZEtleXMoKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBlLmhhbmRsZShrLCB0aGlzW2tdKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG5cblxuIiwiXG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2lucHV0JylcbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIEZvcm1PYmplY3Qge1xuXG4gIHZhcmlhbnQ6IHN0cmluZyA9ICd0ZXh0JztcblxuXG4gIGhhbmRsZVZhcmlhbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFyaWFudCA9IHZhbHVlO1xuICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtJUmVzb2x2ZXJ9IGZyb20gJy4uL0lSZXNvbHZlcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtSZXNvbHZlRGF0YVZhbHVlfSBmcm9tICcuLi9SZXNvbHZlRGF0YVZhbHVlJztcbmltcG9ydCB7UmVmfSBmcm9tICcuL1JlZic7XG5cbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuXG5AVmlld0NvbnRlbnQoJ2Zvcm0nKVxuZXhwb3J0IGNsYXNzIEZvcm0gZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuICBkYXRhQ29udGFpbmVyOiBhbnk7XG5cbiAgcmVzb2x2ZXI6IElSZXNvbHZlcltdID0gW107XG5cbiAgY29tYmluZShvdGhlckZvcm06IEZvcm0pIHtcbiAgICBsZXQgcmVzb2x2ZXJDYWNoZTogSVJlc29sdmVyW10gPSBbXTtcblxuICAgIHdoaWxlICh0aGlzLnJlc29sdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCByZXNvbHZlciA9IHRoaXMucmVzb2x2ZXIuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZXIucmVzb2x2ZShvdGhlckZvcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZXJDYWNoZS5wdXNoKHJlc29sdmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAocmVzb2x2ZXJDYWNoZS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGxldCByZXNvbHZlciA9IHJlc29sdmVyQ2FjaGUuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlZikge1xuICAgICAgICByZXNvbHZlci5yZXNvbHZlKG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IF9wYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCB0bXBFbGVtOiBGb3JtT2JqZWN0ID0gdGhpcztcbiAgICBsZXQgZWxlbWVudCA9IG51bGw7XG4gICAgd2hpbGUgKF9wYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBfcCA9IF9wYXRoLnNoaWZ0KCk7XG4gICAgICBsZXQgcmV0ID0gXy5maW5kKDxGb3JtT2JqZWN0W10+dG1wRWxlbS5nZXRDaGlsZHJlbigpLCB7bmFtZTogX3B9KTtcbiAgICAgIC8vaWYoaXNGb3JtT2JqZWN0KHJldCkpe1xuICAgICAgdG1wRWxlbSA9IHJldDtcbiAgICAgIGlmICghdG1wRWxlbSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSB0bXBFbGVtO1xuICAgICAgfVxuICAgICAgLy99XG4gICAgfVxuICAgIHJldHVybiBfcGF0aC5sZW5ndGggPT0gMCAmJiBlbGVtZW50ID8gZWxlbWVudCA6IG51bGw7XG5cbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7SW5wdXR9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2NoZWNrYm94JylcbmV4cG9ydCBjbGFzcyBDaGVja2JveCBleHRlbmRzIElucHV0IHtcblxuXG59XG4iLCJcbmltcG9ydCB7SW5wdXR9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3JhZGlvJylcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIElucHV0IHtcblxuXG59XG4iLCJpbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3NlbGVjdCcpXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbiAgZW51bTogYW55O1xuXG59XG4iLCJpbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2dyaWQnKVxuZXhwb3J0IGNsYXNzIEdyaWQgZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuXG5cbn1cbiIsImV4cG9ydCBjbGFzcyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuIiwiaW1wb3J0IHtOb3RZZXRJbXBsZW1lbnRlZEVycm9yfSBmcm9tICd0eXBleHMtYmFzZS9saWJzL2V4Y2VwdGlvbnMvTm90WWV0SW1wbGVtZW50ZWRFcnJvcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZWxlbWVudHMnO1xuXG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge0VudGl0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL0VudGl0eURlZic7XG5pbXBvcnQge1Byb3BlcnR5RGVmfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvUHJvcGVydHlEZWYnO1xuaW1wb3J0IHtTY2hlbWFEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9TY2hlbWFEZWYnO1xuaW1wb3J0IHtSZWdpc3RyeX0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1JlZ2lzdHJ5JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4veHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuZXhwb3J0IGNsYXNzIEZvcm1CdWlsZGVyIHtcblxuICBwcml2YXRlIGRhdGE6IGFueTtcblxuICBwcml2YXRlIGZvcm06IEZvcm1PYmplY3Q7XG5cbiAgcHJpdmF0ZSBzY2hlbWE6IFNjaGVtYURlZjtcblxuICBidWlsZEZyb21KU09OKGRhdGE6IGFueSk6IEZvcm0ge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zY2hlbWEgPSBSZWdpc3RyeS5nZXRTY2hlbWEoJ2RlZmF1bHQnKTtcbiAgICByZXR1cm4gPEZvcm0+dGhpcy5fYnVpbGRGb3JtKGRhdGEpO1xuICB9XG5cbiAgYnVpbGRGcm9tRW50aXR5KGVudGl0eTogRW50aXR5RGVmKTogRm9ybSB7XG4gICAgdGhpcy5kYXRhID0gZW50aXR5O1xuICAgIHJldHVybiA8Rm9ybT50aGlzLl9idWlsZEZvcm1PYmplY3QoZW50aXR5KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfYnVpbGRGb3JtT2JqZWN0KGVudGl0eTogRW50aXR5RGVmIHwgUHJvcGVydHlEZWYsIHBhcmVudDogRm9ybU9iamVjdCA9IG51bGwpIHtcblxuICAgIGxldCBmb3JtT2JqZWN0OiBGb3JtT2JqZWN0ID0gbnVsbDtcblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLnNjaGVtYSA9IFJlZ2lzdHJ5LmdldFNjaGVtYShlbnRpdHkuc2NoZW1hTmFtZSk7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtT2JqZWN0ID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmNyZWF0ZUhhbmRsZXIoJ2Zvcm0nKTtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCduYW1lJywgZW50aXR5LmlkKCkpO1xuICAgICAgZm9ybU9iamVjdC5oYW5kbGUoJ2JpbmRpbmcnLCBlbnRpdHkpO1xuICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBhbHNvIG90aGVyIHR5cGVzXG4gICAgICBsZXQgcHJvcGVydHkgPSBlbnRpdHk7XG4gICAgICBsZXQgZm9ybVR5cGUgPSA8c3RyaW5nPnByb3BlcnR5LmdldE9wdGlvbnMoJ2Zvcm0nKSB8fCAndGV4dCc7XG4gICAgICBsZXQgbWV0aG9kTmFtZSA9ICdmb3InICsgXy5jYXBpdGFsaXplKGZvcm1UeXBlKTtcbiAgICAgIGlmICh0aGlzW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIGZvcm1PYmplY3QgPSB0aGlzW21ldGhvZE5hbWVdKGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtT2JqZWN0ID0gdGhpcy5mb3JEZWZhdWx0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlEZWYpIHtcblxuICAgIH1cblxuICAgIGlmIChmb3JtT2JqZWN0ICE9IG51bGwpIHtcbiAgICAgIGZvcm1PYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGZvcm1PYmplY3Qgbm8gY3JlYXRlZCBidXQgcGFyZW50IGlzIHBhc3NlZCB0aGVuIHVzZSBpdCBhcyBmb3Jtb2JqZWN0IGZ1cnRoZXIgKGdyaWQgPC0gYWRkIGZ1cnRlciBlbGVtZW50cylcbiAgICAgIGZvcm1PYmplY3QgPSBwYXJlbnQ7XG4gICAgfVxuXG5cbiAgICBpZiAoZW50aXR5IGluc3RhbmNlb2YgRW50aXR5RGVmKSB7XG4gICAgICBsZXQgcHJvcGVydGllcyA9IGVudGl0eS5nZXRQcm9wZXJ0eURlZnMoKTtcblxuICAgICAgZm9yIChsZXQgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm1PYmplY3QocHJvcGVydHksIGZvcm1PYmplY3QpO1xuICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgLy8gVE9ETyBmb3IgcHJvcGVydGllcyB3aGljaCBwb2ludHMgdG8gRW50aXR5IC8gRW50aXRpZXNcbiAgICAgIC8vcHJvcGVydHkuZ2V0RW50aXR5RGVmXG4gICAgICAvL2Zvcm1PYmplY3Q7XG4gICAgICBsZXQgcHJvcGVydHkgPSA8UHJvcGVydHlEZWY+ZW50aXR5O1xuICAgICAgaWYgKHByb3BlcnR5LmlzUmVmZXJlbmNlKCkpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5LmlzRW50aXR5UmVmZXJlbmNlKCkpIHtcbiAgICAgICAgICBsZXQgZW50aXR5ID0gcHJvcGVydHkudGFyZ2V0UmVmLmdldEVudGl0eSgpO1xuICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChlbnRpdHksIGZvcm1PYmplY3QpO1xuICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuc2NoZW1hLmdldFByb3BlcnRpZXNGb3IocHJvcGVydHkudGFyZ2V0UmVmLmdldENsYXNzKCkpO1xuICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChwcm9wZXJ0eSwgZm9ybU9iamVjdCk7XG4gICAgICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9ybU9iamVjdC5wb3N0UHJvY2VzcygpO1xuICAgIHJldHVybiBmb3JtT2JqZWN0O1xuXG4gIH1cblxuICBwcml2YXRlIGZvckRlZmF1bHQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgbGV0IGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcihmb3JtVHlwZSk7XG4gICAgaWYgKGZvcm1PYmplY3QpIHtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCd2YXJpYW50JywgZm9ybVR5cGUpO1xuICAgICAgdGhpcy5fYXBwbHlWYWx1ZXMoZm9ybU9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgcmV0dXJuIGZvcm1PYmplY3Q7XG4gICAgfVxuICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGZvcm1UeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yVGV4dChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ySW5wdXQoZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yUGFzc3dvcmQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcklucHV0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gIH1cblxuICBwcml2YXRlIGZvckVtYWlsKGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIHJldHVybiB0aGlzLl9mb3JJbnB1dChmb3JtVHlwZSwgcHJvcGVydHkpO1xuICB9XG5cblxuICBwcml2YXRlIF9mb3JJbnB1dChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICBsZXQgZm9ybU9iamVjdCA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5jcmVhdGVIYW5kbGVyKCdpbnB1dCcpO1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCd2YXJpYW50JywgZm9ybVR5cGUpO1xuICAgIHRoaXMuX2FwcGx5VmFsdWVzKGZvcm1PYmplY3QsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gZm9ybU9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5VmFsdWVzKGZvcm1PYmplY3Q6IEZvcm1PYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCduYW1lJywgcHJvcGVydHkubmFtZSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2lkJywgcHJvcGVydHkuaWQoKSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2xhYmVsJywgcHJvcGVydHkubGFiZWwgPyBwcm9wZXJ0eS5sYWJlbCA6IF8uY2FwaXRhbGl6ZShwcm9wZXJ0eS5uYW1lKSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2JpbmRpbmcnLCBwcm9wZXJ0eSk7XG5cbiAgICBsZXQgb3B0aW9ucyA9IHByb3BlcnR5LmdldE9wdGlvbnMoKTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChvcHQgPT4ge1xuICAgICAgICBpZiAoL14oc291cmNlfHRhcmdldHxwcm9wZXJ0eSkvLnRlc3Qob3B0KSkgcmV0dXJuO1xuICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICAgIGZvcm1PYmplY3QuaGFuZGxlKG9wdCwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybShkYXRhOiBhbnksIHBhcmVudDogRm9ybU9iamVjdCA9IG51bGwpIHtcbiAgICBsZXQga2V5cyA9IF8ucmVtb3ZlKE9iamVjdC5rZXlzKGRhdGEpLCAoZTogc3RyaW5nKSA9PiBbJ2NoaWxkcmVuJywgJ3R5cGUnXS5pbmRleE9mKGUpID09PSAtMSk7XG5cbiAgICBsZXQgZm9ybU9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG4gICAgaWYgKGRhdGEudHlwZSkge1xuICAgICAgLy8gbG9va3VwIGhhbmRsZXJcbiAgICAgIGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcihkYXRhLnR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcigpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtT2JqZWN0O1xuICAgIH1cblxuICAgIGZvcm1PYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgbGV0IHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGlmICgvXlxcJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBSZXNvbHZlRGF0YVZhbHVlKHZhbHVlLCBmb3JtT2JqZWN0LCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3JtT2JqZWN0LmhhbmRsZShrZXksIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIGlmIChkYXRhLmNoaWxkcmVuKSB7XG4gICAgICBsZXQgdmFsdWUgPSBkYXRhLmNoaWxkcmVuO1xuICAgICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdmFsdWUpIHtcbiAgICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm0oZW50cnksIGZvcm1PYmplY3QpO1xuICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdFlldEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtT2JqZWN0LnBvc3RQcm9jZXNzKCk7XG4gICAgcmV0dXJuIGZvcm1PYmplY3Q7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVnaXN0cnl9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9SZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL2VsZW1lbnRzJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1CdWlsZGVyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2Uge1xuXG4gIGNhY2hlOiBhbnkgPSB7fTtcblxuICBnZXQobmFtZTogc3RyaW5nLCBpbnN0YW5jZTogYW55KTogRm9ybSB7XG4gICAgLy8gVE9ETyBsb29rdXAgZm9yIGZvcm0gbW9kaWZpY2F0aW9uc1xuICAgIGxldCBlbnRpdHlEZWYgPSBSZWdpc3RyeS5nZXRFbnRpdHlEZWZGb3IoaW5zdGFuY2UpO1xuICAgIGxldCBidWlsZGVyMiA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICAgIHJldHVybiBidWlsZGVyMi5idWlsZEZyb21FbnRpdHkoZW50aXR5RGVmKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVmlld0NvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqZWN0OiBGdW5jdGlvbikge1xuICAgIENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5hZGRDb21wb25lbnQodHlwZU5hbWUsIG9iamVjdCk7XG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIEluamVjdG9yLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4vVHJlZU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuXG5jb25zdCBQUk9QX01FVEFEQVRBID0gJ19fcHJvcF9fbWV0YWRhdGFfXyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4ge1xuXG4gIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgZWxlbTogVDtcblxuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSB2YzogVmlld0NvbnRhaW5lclJlZjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSW5qZWN0b3IpIHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBwdWJsaWMgcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3QoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdCgpIHtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRFbGVtKGVsZW06IFQpIHtcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICB9XG5cblxuICBidWlsZFNpbmdsZShjb250ZW50OiBUKTogQWJzdHJhY3RDb21wb25lbnQ8VD4ge1xuXG5cbiAgICBjb25zdCBoYW5kbGUgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuJCgpLmdldE9yQ3JlYXRlRGVmKGNvbnRlbnQudHlwZSk7XG4gICAgaWYgKGhhbmRsZSAmJiBoYW5kbGUuY29tcG9uZW50KSB7XG5cblxuICAgICAgaWYgKHRoaXMudmMpIHtcblxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxhbnk+aGFuZGxlLmNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBSZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSA8QWJzdHJhY3RDb21wb25lbnQ8VD4+Y29tcFJlZi5pbnN0YW5jZTtcblxuICAgICAgICBsZXQgbWV0YWRhdGE6IHsgW2s6IHN0cmluZ106IGFueSB9ID0gbnVsbDtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KFBST1BfTUVUQURBVEEpKSB7XG4gICAgICAgICAgbWV0YWRhdGEgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcltQUk9QX01FVEFEQVRBXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3RhbmNlLnNldEVsZW0oY29udGVudCk7XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLmJ1aWxkKSB7XG4gICAgICAgICAgbGV0IHJlZnMgPSBpbnN0YW5jZS5idWlsZChjb250ZW50KTtcblxuICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgbGV0IHYgPSBtZXRhZGF0YVtrZXldO1xuICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eSh2KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheSh2KSAmJiB2Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZWNvcmF0b3IgPSBfLmZpcnN0KHYpO1xuICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcERlY29yYXRvci5maXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maW5kKHJlZnMsIHJlZiA9PiByZWYuY29uc3RydWN0b3IgPT0gcHJvcERlY29yYXRvci5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5ICsgJzInXSA9IF8uZmluZChyZWZzLCByZWYgPT4gcmVmLmNvbnN0cnVjdG9yID09IHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXkgKyAnMiddID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5cXCd0IHJlc29sdmUgbWV0YWRhdGEnLCBpbnN0YW5jZS5jb25zdHJ1Y3Rvciwga2V5LCB2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGNvbnRlbnQudHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuXG4gIH1cblxuXG4gIGJ1aWxkKGNvbnRlbnQ6IFQpOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgcmVmczogQWJzdHJhY3RDb21wb25lbnQ8VD5bXSA9IFtdO1xuICAgIGNvbnRlbnQuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGNvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgbGV0IHJlZiA9IHRoaXMuYnVpbGRTaW5nbGUoPFQ+Y29udGVudE9iamVjdCk7XG4gICAgICByZWZzLnB1c2gocmVmKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVmcztcbiAgfVxuXG59XG4iLCJcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuZXhwb3J0IHR5cGUgQUxJR05NRU5UID0gJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJ1xuXG5leHBvcnQgdHlwZSBMQUJFTF9ESVNQTEFZID0gJ3RvcCcgfCAnaW5saW5lJyB8ICdub25lJ1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGlkeDogbnVtYmVyID0gLTE7XG5cbiAgcGFyZW50OiBDb250ZXh0O1xuXG4gIGxhYmVsRGlzcGxheTogTEFCRUxfRElTUExBWTtcblxuICAvLyBhbGlnbm1lbnQ6XG5cbiAgY2hpbGQoX25hbWU6IHN0cmluZyA9IG51bGwsIGlkeDogbnVtYmVyID0gLTEpIHtcbiAgICBsZXQgbmFtZSA9IG5ldyBDb250ZXh0KCk7XG4gICAgbmFtZS5wYXJlbnQgPSB0aGlzO1xuICAgIG5hbWUubmFtZSA9IF9uYW1lO1xuICAgIG5hbWUuaWR4ID0gaWR4O1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cblxuICBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFycjogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGFyciA9IHRoaXMucGFyZW50LnBhdGgoKS5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlkeCA+IC0xKSB7XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gYXJyW2Fyci5sZW5ndGggLSAxXSArICdbJyArIHRoaXMuaWR4ICsgJ10nO1xuICAgICAgLy8gYXJyLnB1c2godGhpcy5uYW1lICsgJ1snICsgdGhpcy5pZHggKyAnXScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvLyAgY29uc29sZS5sb2coYXJyKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiAhXy5pc0VtcHR5KHgpKS5qb2luKCcuJyk7XG4gIH1cblxuXG4gIGdldChrZXk6IHN0cmluZywgX2RlZmF1bHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XG4gICAgICByZXR1cm4gXy5nZXQodGhpcywga2V5LCBfZGVmYXVsdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4veHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uL3hzdmlldy9Db250ZXh0JztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGb3JtQ29tcG9uZW50PFQgZXh0ZW5kcyBGb3JtT2JqZWN0PiBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PFQ+IHtcblxuICBzdGF0aWMgX2luYzogbnVtYmVyID0gMDtcblxuXG4gIGRhdGE6IERhdGFDb250YWluZXI8YW55PjtcblxuICBpbmM6IG51bWJlciA9IDA7XG5cblxuXG4gIGNvbnN0cnVjdCgpe1xuICAgIHRoaXMuaW5jID0gQWJzdHJhY3RGb3JtQ29tcG9uZW50Ll9pbmMrKztcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmlkO1xuICB9XG5cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLm5hbWU7XG4gIH1cblxuXG4gIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmxhYmVsO1xuICB9XG5cblxuICBnZXQgbGFiZWxEaXNwbGF5KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0KCdsYWJlbERpc3BsYXknLCAndG9wJyk7XG4gIH1cblxuXG4gIGdldCBoZWxwKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0uaGVscDtcbiAgfVxuXG5cbiAgZ2V0IGlzUmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5yZWFkb25seTtcbiAgfVxuXG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5jaGVja2VkKHRoaXMubmFtZSkgJiYgdGhpcy5kYXRhLnZhbGlkKHRoaXMubmFtZSk7XG4gIH1cblxuXG4gIHByb3RlY3RlZCBzZXRGb3JtT2JqZWN0KGVsZW06IFQpIHtcbiAgICB0aGlzLnNldEVsZW0oZWxlbSk7XG4gIH1cblxuXG4gIHNldERhdGEoZWxlbTogVCwgcGFyZW50OiBDb250ZXh0LCBpZHg6IG51bWJlciA9IC0xKSB7XG4gICAgdGhpcy5zZXRGb3JtT2JqZWN0KGVsZW0pO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHBhcmVudC5jaGlsZChlbGVtLm5hbWUsIGlkeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG4gICAgICBpZiAoZWxlbS5nZXRCaW5kaW5nKCkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgICB0aGlzLmNvbnRleHQubmFtZSA9IGVsZW0ubmFtZTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmlkeCA9IGlkeDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBsZXQgcGF0aCA9IHRoaXMuY29udGV4dC5wYXRoKCk7XG4gICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gIH1cblxuXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBsZXQgcGF0aCA9IHRoaXMuY29udGV4dC5wYXRoKCk7XG4gICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCB2KTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCkgOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgY29tcDpBYnN0cmFjdENvbXBvbmVudDxUPltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcbiAgICAgIGlmIChpc0Zvcm1PYmplY3QoZm9ybU9iamVjdCkpIHtcblxuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcbiAgICAgICAgICBpZiAodGhpcy52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZSA9IDxBYnN0cmFjdEZvcm1Db21wb25lbnQ8YW55Pj5yZWYuaW5zdGFuY2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5kYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgaW5zdGFuY2UuYnVpbGQoZm9ybU9iamVjdCk7XG4gICAgICAgICAgICBjb21wLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGZvcm1PYmplY3QudHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29tcDtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdG9yLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5AVmlld0NvbXBvbmVudCgnZm9ybScpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Zm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgLy9ob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy9vdXRwdXRzOiBbJ25nU3VibWl0J10sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8Rm9ybT4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBPdXRwdXQoKVxuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBmb3JtTmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGluc3RhbmNlOiBhbnk7XG5cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1TZXJ2aWNlKSBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChJbmplY3RvcikgcHVibGljIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHB1YmxpYyByOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgLy8gVE9ETyBpbnN0YW5jZSBtdXN0IGJlIHByZXNlbnRcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YUNvbnRhaW5lcih0aGlzLmluc3RhbmNlKTtcbiAgICB0aGlzLmVsZW0gPSB0aGlzLmZvcm1TZXJ2aWNlLmdldCh0aGlzLmZvcm1OYW1lLCB0aGlzLmluc3RhbmNlKTtcblxuICAgIC8vIFRPRE8gcmVzdHJ1Y3R1cmUgZm9ybVxuICAgIHRoaXMuYnVpbGQodGhpcy5lbGVtKTtcbiAgfVxuXG5cbiAgYXN5bmMgb25TdWJtaXQoJGV2ZW50OiBFdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuZGF0YS52YWxpZGF0ZSgpO1xuICAgIHRoaXMubmdTdWJtaXQuZW1pdCh7ZXZlbnQ6JGV2ZW50LCBkYXRhOnRoaXMuZGF0YX0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbn1cblxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge0lucHV0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5cblxuXG5AVmlld0NvbXBvbmVudCgnaW5wdXQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8SW5wdXQ+LyogaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyAqLyB7XG5cbiAgZ2V0IHR5cGUoKXtcbiAgICByZXR1cm4gdGhpcy5lbGVtLnZhcmlhbnQ7XG4gIH1cblxuXG5cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtDaGVja2JveH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdjaGVja2JveCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Y2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxDaGVja2JveD4ge1xuXG4gIGdldCB0eXBlKCl7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cblxuICBnZXQgaXNDaGVja2VkKCl7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdO1xuICB9XG5cbiAgc2V0IGlzQ2hlY2tlZCh2YWx1ZTpib29sZWFuKXtcbiAgICBpZih2YWx1ZSl7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMvUmFkaW8nO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdyYWRpbycpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4cmFkaW8nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmFkaW8uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxSYWRpbz4ge1xuXG4gIG9uOiBzdHJpbmcgPSAnWWVzJztcblxuICBvZmY6IHN0cmluZyA9ICdObyc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cbiAgZ2V0IGlzQ2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluc3RhbmNlW3RoaXMubmFtZV07XG4gIH1cblxuICBzZXQgaXNDaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7U2VsZWN0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnLS0tJztcbiAgZGVmYXVsdDogYm9vbGVhbjtcbn1cblxuQFZpZXdDb21wb25lbnQoJ3NlbGVjdCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4c2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxTZWxlY3Q+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjYWNoZWRPcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG5cbiAgZ2V0IHN1cHBvcnRzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhY2hlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmxvYWRPcHRpb25zKCk7XG4gIH1cblxuICBsb2FkT3B0aW9ucygpIHtcbiAgICBsZXQgZW51bXMgPSB0aGlzLnJldHJpZXZlRW51bSgpO1xuXG4gICAgaWYgKGVudW1zKSB7XG4gICAgICBpZiAoZW51bXMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIGVudW1zLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24oKTtcbiAgICAgICAgICBpZiAoXy5pc1N0cmluZyhlKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IG8udmFsdWUgPSBlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXy5oYXMoZSwgJ2xhYmVsJykgfHwgXy5oYXMoZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIG8ubGFiZWwgPSBfLmdldChlLCAnbGFiZWwnLCBfLmdldChlLCAndmFsdWUnKSk7XG4gICAgICAgICAgICBvLnZhbHVlID0gXy5nZXQoZSwgJ3ZhbHVlJywgXy5nZXQoZSwgJ2xhYmVsJykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhY2hlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbnVtcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgIGxldCBvID0gbmV3IE9wdGlvbigpO1xuICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGUpKSB7XG4gICAgICAgICAgICBvLmxhYmVsID0gby52YWx1ZSA9IGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmhhcyhlLCAnbGFiZWwnKSB8fCBfLmhhcyhlLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IF8uZ2V0KGUsICdsYWJlbCcsIF8uZ2V0KGUsICd2YWx1ZScpKTtcbiAgICAgICAgICAgIG8udmFsdWUgPSBfLmdldChlLCAndmFsdWUnLCBfLmdldChlLCAnbGFiZWwnKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FjaGVkT3B0aW9ucy5wdXNoKG8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIHJldHJpZXZlRW51bSgpOiBhbnlbXSB7XG4gICAgaWYgKF8uaXNBcnJheSh0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW0uZW51bTtcbiAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0aGlzLmVsZW0uZW51bSkuZ2V0KHRoaXMubmFtZSk7XG4gICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKHRoaXMuZWxlbS5lbnVtKSkge1xuICAgICAgLy8gY2hlY2sgaWYgYW4gZW50cnkgd2l0aCB0aGUgcHJvcGVydHluYW1lIGV4aXN0c1xuICAgICAgbGV0IGxvb2t1cFBhdGg6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG4gICAgICBpZiAodGhpcy5jb250ZXh0LnBhcmVudCkge1xuICAgICAgICBsb29rdXBQYXRoLnB1c2godGhpcy5jb250ZXh0LnBhcmVudC5wYXRoKCkpO1xuICAgICAgfVxuICAgICAgbG9va3VwUGF0aC5wdXNoKHRoaXMuZWxlbS5lbnVtKVxuICAgICAgbG9va3VwUGF0aCA9ICg8c3RyaW5nW10+bG9va3VwUGF0aCkuam9pbignLicpO1xuXG4gICAgICBpZiAoXy5oYXModGhpcy5kYXRhLmluc3RhbmNlLCBsb29rdXBQYXRoKSkge1xuICAgICAgICAvLyBUT0RPIG9ic2VydmUgaWYgcHJvcGVydHkgaXMgY2hhbmdlZCwgaWYgaXQgZG9lcyB0aGVuIHJlc2V0IGVudW1cbiAgICAgICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgbG9va3VwUGF0aCwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZm91bmQgZW51bSByZWZlcmVuY2UnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3hncmlkY2VsbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLWNlbGwuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ2VsbENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+IHtcblxuICBwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG5cdGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBbXG5cdFx0ICAnY29sJ1xuXHRcdF0uam9pbignICcpO1xuXHR9XG5cbiAgc2V0R3JpZENvbXBvbmVudChncmlkOiBHcmlkQ29tcG9uZW50KSB7XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG5cblxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7R3JpZENlbGxDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQge05vRm9ybVR5cGVEZWZpbmVkRXJyb3J9IGZyb20gJy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWRyb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4ge1xuXG4gIHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudDtcblxuICBzZXRHcmlkQ29tcG9uZW50KGdyaWQ6IEdyaWRDb21wb25lbnQpIHtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnZm9ybS1yb3cnXG4gICAgXS5qb2luKCcgJyk7XG4gIH1cblxuXG4gIGdldCBpZHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZHg7XG4gIH1cblxuICByZW1vdmVSb3coKSB7XG4gICAgdGhpcy5ncmlkLnJlbW92ZVJvdyh0aGlzLmNvbnRleHQuaWR4KTtcbiAgfVxuXG4gIGJ1aWxkKGZvcm06IEZvcm1PYmplY3QpOkFic3RyYWN0Q29tcG9uZW50PGFueT5bXSB7XG4gICAgbGV0IGNvbXA6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcblxuICAgICAgaWYgKGlzRm9ybU9iamVjdChmb3JtT2JqZWN0KSkge1xuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcblxuICAgICAgICAgIGxldCBjR3JpZENlbGxGYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEdyaWRDZWxsQ29tcG9uZW50KTtcbiAgICAgICAgICBsZXQgY0dyaWRDZWxsID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoY0dyaWRDZWxsRmFjdG9yeSk7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLnNldEdyaWRDb21wb25lbnQodGhpcy5ncmlkKTtcbiAgICAgICAgICBjR3JpZENlbGwuaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNHcmlkQ2VsbC5pbnN0YW5jZS52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSBjR3JpZENlbGwuaW5zdGFuY2UudmMuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gPEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+PnJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXREYXRhKGZvcm1PYmplY3QsIHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICBpbnN0YW5jZS5idWlsZChmb3JtT2JqZWN0KTtcbiAgICAgICAgICAgIGNvbXAucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHZpZXcgY29udGVudCBzZXR0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoZm9ybU9iamVjdC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wO1xuICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRSb3dDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1yb3cuY29tcG9uZW50JztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuQFZpZXdDb21wb25lbnQoJ2dyaWQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8R3JpZD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgZW50cmllczogQ29tcG9uZW50UmVmPEdyaWRSb3dDb21wb25lbnQ+W10gPSBbXTtcblxuICBoZWFkZXI6c3RyaW5nW10gPSBbXTtcblxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cblxuICBhZGRSb3coaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3JpZFJvd0NvbXBvbmVudCk7XG4gICAgbGV0IGNHcmlkUm93ID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBjR3JpZFJvdy5pbnN0YW5jZS5zZXRHcmlkQ29tcG9uZW50KHRoaXMpO1xuICAgIGNHcmlkUm93Lmluc3RhbmNlLnNldERhdGEodGhpcy5lbGVtLCB0aGlzLmNvbnRleHQsIHRoaXMuZW50cmllcy5sZW5ndGgpO1xuICAgIHRoaXMuZW50cmllcy5wdXNoKGNHcmlkUm93KTtcblxuICAgIGxldCBvYmplY3QgPSBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLmVsZW0uZ2V0QmluZGluZygpLnRhcmdldFJlZi5nZXRDbGFzcygpLCBbXSk7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIGlmICh0aGlzLmVsZW0uZ2V0QmluZGluZygpLmlzQ29sbGVjdGlvbigpKSB7XG4gICAgICBsZXQgYXJyYXlTZXR0ZWQgPSBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICAgICAgaWYgKCFhcnJheVNldHRlZCkge1xuICAgICAgICBhcnJheVNldHRlZCA9IFtdO1xuICAgICAgfVxuICAgICAgYXJyYXlTZXR0ZWRbY0dyaWRSb3cuaW5zdGFuY2UuY29udGV4dC5pZHhdID0gb2JqZWN0O1xuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgb2JqZWN0KTtcbiAgICB9XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuYnVpbGQodGhpcy5lbGVtKTtcbiAgICByZXR1cm4gY0dyaWRSb3cuaW5zdGFuY2U7XG4gIH1cblxuXG4gIHJlbW92ZVJvdyhpZHg6IG51bWJlcikge1xuICAgIC8vIFRPRE8gY2hlY2sgaWYgZXhpc3RzXG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuXG4gICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLmVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHMuc2hpZnQoKTtcblxuICAgIHRoaXMudmMucmVtb3ZlKGlkeCk7XG4gICAgaWYgKHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCkpIHtcbiAgICAgIGxldCBhcnJheVNldHRlZCA9IF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgICBpZiAoIWFycmF5U2V0dGVkKSB7XG4gICAgICAgIGFycmF5U2V0dGVkID0gW107XG4gICAgICB9XG4gICAgICBhcnJheVNldHRlZC5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5lbnRyaWVzW2ldLmluc3RhbmNlLmNvbnRleHQuaWR4ID0gaTtcbiAgICB9XG4gICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCk6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdIHtcbiAgICB0aGlzLmNvbnRleHQubGFiZWxEaXNwbGF5ID0gJ25vbmUnO1xuXG5cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgaWYoaXNGb3JtT2JqZWN0KG9iaikpe1xuICAgICAgICB0aGlzLmhlYWRlci5wdXNoKG9iai5sYWJlbCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGxldCBkYXRhRW50cmllcyA9IHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSk7XG5cbiAgICBsZXQgYyA9IHRoaXMuYWRkUm93KCk7XG4gICAgcmV0dXJuIFtjXTtcbiAgfVxuXG59XG4iLCJcbi8vIHRvIGludGVncmF0ZSB0aGUgZWxlbWVudHNcbmltcG9ydCB7Rk9STV9FTEVNRU5UU30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5GT1JNX0VMRU1FTlRTO1xuXG5pbXBvcnQge0Zvcm1Db21wb25lbnR9IGZyb20gJy4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb0NvbXBvbmVudH0gZnJvbSAnLi9yYWRpby5jb21wb25lbnQnO1xuaW1wb3J0IHtTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQge0dyaWRDb21wb25lbnR9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtHcmlkUm93Q29tcG9uZW50fSBmcm9tICcuL2dyaWQtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge0dyaWRDZWxsQ29tcG9uZW50fSBmcm9tICcuL2dyaWQtY2VsbC5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjb25zdCBYRk9STUNPTVBPTkVOVCA9IFtcbiAgRm9ybUNvbXBvbmVudCxcbiAgSW5wdXRDb21wb25lbnQsXG4gIENoZWNrYm94Q29tcG9uZW50LFxuICBSYWRpb0NvbXBvbmVudCxcbiAgU2VsZWN0Q29tcG9uZW50LFxuICBHcmlkQ29tcG9uZW50LFxuICBHcmlkUm93Q29tcG9uZW50LFxuICBHcmlkQ2VsbENvbXBvbmVudFxuXVxuXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1hGT1JNQ09NUE9ORU5UfSBmcm9tICcuL3hmb3Jtcy5lbGVtZW50cyc7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBYRk9STUNPTVBPTkVOVCxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBYRk9STUNPTVBPTkVOVCxcbiAgZXhwb3J0czogWEZPUk1DT01QT05FTlQsXG4gIHByb3ZpZGVyczogW1xuICAgIEZvcm1TZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgeEZvcm1zTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZU9iamVjdH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvVHJlZU9iamVjdCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudCc7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZpZXctYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy8gb3V0cHV0czogWyduZ1N1Ym1pdCddLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3QnVpbGRlckNvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBfYnVpbGQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgX2luc3RhbmNlOiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IHZhbHVlO1xuICAgIHRoaXMuX2J1aWxkID0gZmFsc2U7XG4gICAgdGhpcy5fX2J1aWxkKCk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9fYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19idWlsZCgpe1xuICAgIGlmKCF0aGlzLl9idWlsZCl7XG4gICAgICB0aGlzLnZjLmNsZWFyKCk7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlKHRoaXMuX2luc3RhbmNlKTtcbiAgICAgIHRoaXMuX2J1aWxkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtWaWV3QnVpbGRlckNvbXBvbmVudH0gZnJvbSAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtWaWV3QnVpbGRlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW10sXG4gIGV4cG9ydHM6IFtWaWV3QnVpbGRlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgeFZpZXdzTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJfLmZpbHRlciIsIl8uY2FwaXRhbGl6ZSIsIl8uZmluZCIsIl8uY2xvbmUiLCJJbnB1dCIsIl8ucmVtb3ZlIiwiXy5pc1N0cmluZyIsIl8uaXNBcnJheSIsIl8uaXNFbXB0eSIsIl8uZmlyc3QiLCJfLmlzRnVuY3Rpb24iLCJfLmhhcyIsIl8uZ2V0IiwiXy5zZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQTs7O21CQUFBO0lBR0MsQ0FBQTs7Ozs7OztJQ1VDLDRCQUFZLE1BQWM7c0JBRkwsRUFBRTs7WUFJckIsS0FBa0IsSUFBQSxLQUFBQSxTQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUEsZ0JBQUE7Z0JBQTFCLElBQUksS0FBSyxXQUFBO2dCQUNaLHFCQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUMzQixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLFNBQU0sQ0FBQztnQkFDL0IsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6Qjs7Ozs7Ozs7Ozs7S0FFRjs7Z0JBakJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsV0FBVyxFQUFFLDRCQUE0QjtpQkFDMUM7Ozs7Z0JBUE8sTUFBTTs7NkJBRGQ7Ozs7Ozs7QUNBQTs7OztnQkFNQyxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBQyxZQUFZLENBQUM7b0JBQ3JDLE9BQU8sRUFBQyxDQUFDLGtCQUFrQixDQUFDO29CQUM1QixTQUFTLEVBQUUsRUFBRTtpQkFDZDs7MEJBWEQ7Ozs7Ozs7Ozs7OztBQ0lBLElBQUE7SUFZRSwwQkFBWSxLQUFhLEVBQUUsTUFBa0IsRUFBRSxRQUFnQjtvQkFSdEMsRUFBRTt3QkFF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