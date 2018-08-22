import { Component, NgModule, Injectable, ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { find, filter, has, get, set, capitalize, isString, isFunction, isArray, isEmpty, clone, remove, first } from 'lodash';
import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import { __decorate, __awaiter, __metadata } from 'tslib';
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
class NavEntry {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavigatorComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.routes = [];
        for (let /** @type {?} */ route of router.config) {
            let /** @type {?} */ entry = new NavEntry();
            entry.label = route.data["label"];
            entry.path = route.path;
            this.routes.push(entry);
        }
        // console.log(this.routes)
    }
}
NavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'nav-root',
                templateUrl: './navigator.component.html',
            },] },
];
/** @nocollapse */
NavigatorComponent.ctorParameters = () => [
    { type: Router, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavigatorModule {
}
NavigatorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NavigatorComponent],
                imports: [BrowserModule, RouterModule],
                exports: [NavigatorComponent],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResolveDataValue {
    /**
     * @param {?} value
     * @param {?} object
     * @param {?} property
     */
    constructor(value, object, property) {
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
    get() {
        return this.orgValue;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    resolve(form) {
        let /** @type {?} */ elem = form.get(this.path.join('.'));
        if (elem) {
            this.object[this.property] = elem[this.fetchKey];
            return elem[this.fetchKey];
        }
        else {
            throw new Error('cant resolve data');
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class TreeObject {
    constructor() {
        this.parent = null;
        this.children = [];
    }
    /**
     * @param {?} object
     * @return {?}
     */
    insert(object) {
        object.parent = this;
        object.index = this.children.length;
        this.children.push(object);
    }
    /**
     * @return {?}
     */
    getParent() {
        return this.parent;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    setParent(parent) {
        if (parent) {
            this.parent = parent;
            this.index = this.parent.children.indexOf(this);
        }
    }
    /**
     * @return {?}
     */
    getChildren() {
        return this.children;
    }
}

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
class FormObject extends TreeObject {
    constructor() {
        super(...arguments);
        this.usedKeys = [];
        this.binding = null;
    }
    /**
     * @return {?}
     */
    getBinding() {
        return this.binding;
    }
    /**
     * @return {?}
     */
    getUsedKeys() {
        return this.usedKeys;
    }
    /**
     * @return {?}
     */
    getPath() {
        let /** @type {?} */ arr = [];
        if (this.getBinding() instanceof PropertyDef) {
            if (this.getParent()) {
                const /** @type {?} */ parent = this.getParent();
                if (isFormObject(parent)) {
                    arr.push(parent.getPath());
                }
            }
            arr.push(this.name);
            if (this.getBinding().isCollection()) {
                arr.push('$idx');
            }
        }
        return filter(arr, (x) => x.trim() != '').join('.');
    }
    /**
     * @return {?}
     */
    getForm() {
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
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    handle(key, value) {
        if (value instanceof ResolveDataValue) {
            let /** @type {?} */ form = this.getForm(); //
            form['resolver'].push(value);
        }
        this.usedKeys.push(key);
        let /** @type {?} */ methodName = 'handle' + capitalize(key);
        if (this[methodName]) {
            this[methodName](value);
        }
        else {
            this[key] = value;
        }
    }
    /**
     * Don't override type
     * @param {?} value
     * @return {?}
     */
    handleType(value) {
    }
    /**
     * @return {?}
     */
    postProcess() {
    }
    /**
     * @param {?} someObject
     * @return {?}
     */
    replace(someObject) {
        let /** @type {?} */ parent = this.getParent();
        let /** @type {?} */ idx = parent.getChildren().indexOf(this);
        if (idx < 0) {
            throw new Error('can not find index, something is wrong');
        }
        parent.getChildren()[idx] = someObject;
        someObject.setParent(parent);
        return someObject;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NoFormHandlerDefinedForTypeError extends Error {
    /**
     * @param {?} typeName
     */
    constructor(typeName) {
        super(typeName + ' not defined');
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ContentComponentRegistry {
    constructor() {
        this.formHandler = [];
    }
    /**
     * @return {?}
     */
    static $() {
        if (!this.$self) {
            this.$self = new ContentComponentRegistry();
        }
        return this.$self;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    getOrCreateDef(typeName) {
        let /** @type {?} */ exists = find(this.formHandler, { type: typeName });
        if (!exists) {
            exists = { type: typeName };
            this.formHandler.push(exists);
        }
        return exists;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    getDef(typeName) {
        return find(this.formHandler, { type: typeName });
    }
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    static addHandler(typeName, klass) {
        let /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.handler = klass;
        return def;
    }
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    static addComponent(typeName, klass) {
        let /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.component = klass;
        return def;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    static createHandler(typeName) {
        let /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.handler) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        let /** @type {?} */ obj = Reflect.construct(handler.handler, []);
        obj.type = typeName;
        return obj;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    static createComponent(typeName) {
        let /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.component) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        let /** @type {?} */ obj = Reflect.construct(handler.component, []);
        obj.type = typeName;
        return obj;
    }
}
ContentComponentRegistry.$self = null;

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
let Tabs = class Tabs extends FormObject {
};
Tabs = __decorate([
    ViewContent('tabs')
], Tabs);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Tab = class Tab extends FormObject {
};
Tab = __decorate([
    ViewContent('tab')
], Tab);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Ref = class Ref extends FormObject {
    /**
     * @return {?}
     */
    postProcess() {
        this.getForm()['resolver'].push(this);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    resolve(form) {
        let /** @type {?} */ elem = form.get(this.use);
        if (isFormObject(elem)) {
            let /** @type {?} */ e = clone(elem);
            this.replace(e);
            // copy properties
            this.getUsedKeys().forEach(k => {
                e.handle(k, this[k]);
            });
        }
    }
};
Ref = __decorate([
    ViewContent('ref')
], Ref);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Input$1 = class Input$$1 extends FormObject {
    constructor() {
        super(...arguments);
        this.variant = 'text';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleVariant(value) {
        this.variant = value;
    }
};
Input$1 = __decorate([
    ViewContent('input')
], Input$1);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Form = class Form extends FormObject {
    constructor() {
        super(...arguments);
        this.resolver = [];
    }
    /**
     * @param {?} otherForm
     * @return {?}
     */
    combine(otherForm) {
        let /** @type {?} */ resolverCache = [];
        while (this.resolver.length > 0) {
            let /** @type {?} */ resolver = this.resolver.shift();
            if (resolver instanceof ResolveDataValue) {
                resolver.resolve(otherForm);
            }
            else {
                resolverCache.push(resolver);
            }
        }
        while (resolverCache.length > 0) {
            let /** @type {?} */ resolver = resolverCache.shift();
            if (resolver instanceof Ref) {
                resolver.resolve(otherForm);
            }
        }
        return this;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        let /** @type {?} */ _path = path.split('.');
        let /** @type {?} */ tmpElem = this;
        let /** @type {?} */ element = null;
        while (_path.length > 0) {
            let /** @type {?} */ _p = _path.shift();
            let /** @type {?} */ ret = find(/** @type {?} */ (tmpElem.getChildren()), { name: _p });
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
    }
};
Form = __decorate([
    ViewContent('form')
], Form);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Checkbox = class Checkbox extends Input$1 {
};
Checkbox = __decorate([
    ViewContent('checkbox')
], Checkbox);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Radio = class Radio extends Input$1 {
};
Radio = __decorate([
    ViewContent('radio')
], Radio);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Select = class Select extends FormObject {
};
Select = __decorate([
    ViewContent('select')
], Select);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let Grid = class Grid extends FormObject {
};
Grid = __decorate([
    ViewContent('grid')
], Grid);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NoFormTypeDefinedError extends Error {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormBuilder {
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
            let /** @type {?} */ methodName = 'for' + capitalize(formType);
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
        formObject.handle('label', property.label ? property.label : capitalize(property.name));
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
        let /** @type {?} */ keys = remove(Object.keys(data), (e) => ['children', 'type'].indexOf(e) === -1);
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
            if (isString(value)) {
                if (/^\$/.test(value)) {
                    value = new ResolveDataValue(value, formObject, key);
                }
            }
            formObject.handle(key, value);
        }
        if (data.children) {
            let /** @type {?} */ value = data.children;
            if (isArray(value)) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormService {
    constructor() {
        this.cache = {};
    }
    /**
     * @param {?} name
     * @param {?} instance
     * @return {?}
     */
    get(name, instance) {
        // TODO lookup for form modifications
        let /** @type {?} */ entityDef = Registry.getEntityDefFor(instance);
        let /** @type {?} */ builder2 = new FormBuilder();
        return builder2.buildFromEntity(entityDef);
    }
}
FormService.decorators = [
    { type: Injectable },
];

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
const /** @type {?} */ PROP_METADATA = '__prop__metadata__';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
class AbstractComponent {
    /**
     * @param {?} injector
     * @param {?} r
     */
    constructor(injector, r) {
        this.injector = injector;
        this.r = r;
        this.construct();
    }
    /**
     * @return {?}
     */
    construct() {
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    setElem(elem) {
        this.elem = elem;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    buildSingle(content) {
        const /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
        if (handle && handle.component) {
            if (this.vc) {
                const /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                const /** @type {?} */ compRef = this.vc.createComponent(factory);
                const /** @type {?} */ instance = /** @type {?} */ (compRef.instance);
                let /** @type {?} */ metadata = null;
                if (instance.constructor.hasOwnProperty(PROP_METADATA)) {
                    metadata = instance.constructor[PROP_METADATA];
                }
                instance.setElem(content);
                if (instance.build) {
                    let /** @type {?} */ refs = instance.build(content);
                    if (metadata) {
                        Object.keys(metadata).forEach(key => {
                            let /** @type {?} */ v = metadata[key];
                            if (!isEmpty(v)) {
                                if (isArray(v) && v.length === 1) {
                                    let /** @type {?} */ propDecorator = first(v);
                                    if (isFunction(propDecorator.selector)) {
                                        if (propDecorator.first) {
                                            // simple ViewChild
                                            instance[key] = find(refs, ref => ref.constructor == propDecorator.selector);
                                            instance[key + '2'] = find(refs, ref => ref.constructor == propDecorator.selector);
                                        }
                                        else {
                                            // simple ViewChildren
                                            instance[key] = filter(refs, ref => ref.constructor == propDecorator.selector);
                                            instance[key + '2'] = filter(refs, ref => ref.constructor == propDecorator.selector);
                                        }
                                    }
                                }
                                else {
                                    console.error('can\'t resolve metadata', instance.constructor, key, v);
                                }
                            }
                        });
                    }
                }
                return instance;
            }
            else {
                console.error('No view content setted');
            }
        }
        else {
            throw new NoFormTypeDefinedError(content.type);
        }
        return null;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    build(content) {
        let /** @type {?} */ refs = [];
        content.getChildren().forEach(contentObject => {
            let /** @type {?} */ ref = this.buildSingle(/** @type {?} */ (contentObject));
            refs.push(ref);
        });
        return refs;
    }
}
/** @nocollapse */
AbstractComponent.ctorParameters = () => [
    { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
    { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
];
AbstractComponent.propDecorators = {
    "vc": [{ type: ViewChild, args: ['content', { read: ViewContainerRef },] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Context {
    constructor() {
        this.idx = -1;
    }
    /**
     * @param {?=} _name
     * @param {?=} idx
     * @return {?}
     */
    child(_name = null, idx = -1) {
        let /** @type {?} */ name = new Context();
        name.parent = this;
        name.name = _name;
        name.idx = idx;
        return name;
    }
    /**
     * @return {?}
     */
    path() {
        let /** @type {?} */ arr = [];
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
        return filter(arr, (x) => !isEmpty(x)).join('.');
    }
    /**
     * @param {?} key
     * @param {?=} _default
     * @return {?}
     */
    get(key, _default = null) {
        if (has(this, key)) {
            return get(this, key, _default);
        }
        else if (this.parent) {
            return this.parent.get(key);
        }
        return _default;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
class AbstractFormComponent extends AbstractComponent {
    constructor() {
        super(...arguments);
        this.inc = 0;
    }
    /**
     * @return {?}
     */
    construct() {
        this.inc = AbstractFormComponent._inc++;
    }
    /**
     * @return {?}
     */
    get id() {
        return this.elem.id;
    }
    /**
     * @return {?}
     */
    get name() {
        return this.elem.name;
    }
    /**
     * @return {?}
     */
    get label() {
        return this.elem.label;
    }
    /**
     * @return {?}
     */
    get labelDisplay() {
        return this.context.get('labelDisplay', 'top');
    }
    /**
     * @return {?}
     */
    get help() {
        return this.elem.help;
    }
    /**
     * @return {?}
     */
    get isReadOnly() {
        return this.elem.readonly;
    }
    /**
     * @return {?}
     */
    get isValid() {
        return this.data.checked(this.name) && this.data.valid(this.name);
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    setFormObject(elem) {
        this.setElem(elem);
    }
    /**
     * @param {?} elem
     * @param {?} parent
     * @param {?=} idx
     * @return {?}
     */
    setData(elem, parent, idx = -1) {
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
    }
    /**
     * @return {?}
     */
    get value() {
        let /** @type {?} */ path = this.context.path();
        return get(this.data.instance, path, null);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        let /** @type {?} */ path = this.context.path();
        set(this.data.instance, path, v);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    build(form) {
        let /** @type {?} */ comp = [];
        form.getChildren().forEach(formObject => {
            if (isFormObject(formObject)) {
                let /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
                if (handle && handle.component) {
                    if (this.vc) {
                        let /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        let /** @type {?} */ ref = this.vc.createComponent(factory);
                        let /** @type {?} */ instance = /** @type {?} */ (ref.instance);
                        instance.data = this.data;
                        instance.setData(formObject, this.context);
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
    }
}
AbstractFormComponent._inc = 0;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let FormComponent = class FormComponent extends AbstractFormComponent {
    /**
     * @param {?} formService
     * @param {?} injector
     * @param {?} r
     */
    constructor(formService, injector, r) {
        super(injector, r);
        this.formService = formService;
        this.injector = injector;
        this.r = r;
        this.ngSubmit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // TODO instance must be present
        this.data = new DataContainer(this.instance);
        this.elem = this.formService.get(this.formName, this.instance);
        // TODO restructure form
        this.build(this.elem);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSubmit($event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.data.validate();
            this.ngSubmit.emit({ event: $event, data: this.data });
            return false;
        });
    }
};
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'xform',
                templateUrl: './form.component.html',
            },] },
];
/** @nocollapse */
FormComponent.ctorParameters = () => [
    { type: FormService, decorators: [{ type: Inject, args: [FormService,] },] },
    { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
    { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let InputComponent = class InputComponent extends AbstractFormComponent /* implements OnInit, OnChanges */ {
    /**
     * @return {?}
     */
    get type() {
        return this.elem.variant;
    }
};
InputComponent.decorators = [
    { type: Component, args: [{
                selector: 'xinput',
                templateUrl: './input.component.html',
            },] },
];
InputComponent = __decorate([
    ViewComponent('input')
], InputComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let CheckboxComponent = class CheckboxComponent extends AbstractFormComponent {
    /**
     * @return {?}
     */
    get type() {
        return this.elem.variant;
    }
    /**
     * @return {?}
     */
    get isChecked() {
        return this.data.instance[this.name];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isChecked(value) {
        if (value) {
            this.data.instance[this.name] = true;
        }
        else {
            this.data.instance[this.name] = false;
        }
    }
};
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'xcheckbox',
                templateUrl: './checkbox.component.html',
            },] },
];
CheckboxComponent = __decorate([
    ViewComponent('checkbox')
], CheckboxComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let RadioComponent = class RadioComponent extends AbstractFormComponent {
    constructor() {
        super(...arguments);
        this.on = 'Yes';
        this.off = 'No';
    }
    /**
     * @return {?}
     */
    get type() {
        return this.elem.variant;
    }
    /**
     * @return {?}
     */
    get isChecked() {
        return this.data.instance[this.name];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isChecked(value) {
        if (value) {
            this.data.instance[this.name] = true;
        }
        else {
            this.data.instance[this.name] = false;
        }
    }
};
RadioComponent.decorators = [
    { type: Component, args: [{
                selector: 'xradio',
                templateUrl: './radio.component.html',
            },] },
];
RadioComponent = __decorate([
    ViewComponent('radio')
], RadioComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Option {
    constructor() {
        this.value = '';
        this.label = '---';
    }
}
let SelectComponent = class SelectComponent extends AbstractFormComponent {
    constructor() {
        super(...arguments);
        this.cachedOptions = [];
    }
    /**
     * @return {?}
     */
    get supportsMultiple() {
        return this.elem.getBinding().isCollection();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.cachedOptions = [];
        this.loadOptions();
    }
    /**
     * @return {?}
     */
    loadOptions() {
        let /** @type {?} */ enums = this.retrieveEnum();
        if (enums) {
            if (enums instanceof Observable) {
                enums.subscribe(e => {
                    let /** @type {?} */ o = new Option();
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
                    this.cachedOptions.push(o);
                });
            }
            else {
                enums.forEach(e => {
                    let /** @type {?} */ o = new Option();
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
                    this.cachedOptions.push(o);
                });
            }
        }
    }
    /**
     * @return {?}
     */
    retrieveEnum() {
        if (isArray(this.elem.enum)) {
            return this.elem.enum;
        }
        else if (isFunction(this.elem.enum)) {
            return this.injector.get(this.elem.enum).get(this.name);
        }
        else if (isString(this.elem.enum)) {
            // check if an entry with the propertyname exists
            let /** @type {?} */ lookupPath = [];
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
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridCellComponent extends AbstractFormComponent {
    /**
     * @return {?}
     */
    get hostClasses() {
        return [
            'col'
        ].join(' ');
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    setGridComponent(grid) {
        this.grid = grid;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridRowComponent extends AbstractFormComponent {
    /**
     * @param {?} grid
     * @return {?}
     */
    setGridComponent(grid) {
        this.grid = grid;
    }
    /**
     * @return {?}
     */
    get hostClasses() {
        return [
            'form-row'
        ].join(' ');
    }
    /**
     * @return {?}
     */
    get idx() {
        return this.context.idx;
    }
    /**
     * @return {?}
     */
    removeRow() {
        this.grid.removeRow(this.context.idx);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    build(form) {
        let /** @type {?} */ comp = [];
        form.getChildren().forEach(formObject => {
            if (isFormObject(formObject)) {
                let /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
                if (handle && handle.component) {
                    let /** @type {?} */ cGridCellFactory = this.r.resolveComponentFactory(GridCellComponent);
                    let /** @type {?} */ cGridCell = this.vc.createComponent(cGridCellFactory);
                    cGridCell.instance.data = this.data;
                    cGridCell.instance.setGridComponent(this.grid);
                    cGridCell.instance.setData(formObject, this.context);
                    if (cGridCell.instance.vc) {
                        let /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        let /** @type {?} */ ref = cGridCell.instance.vc.createComponent(factory);
                        let /** @type {?} */ instance = /** @type {?} */ (ref.instance);
                        instance.data = this.data;
                        instance.setData(formObject, this.context);
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
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let GridComponent = class GridComponent extends AbstractFormComponent {
    constructor() {
        super(...arguments);
        this.entries = [];
        this.header = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    addRow(index = -1) {
        let /** @type {?} */ factory = this.r.resolveComponentFactory(GridRowComponent);
        let /** @type {?} */ cGridRow = this.vc.createComponent(factory);
        cGridRow.instance.data = this.data;
        cGridRow.instance.setGridComponent(this);
        cGridRow.instance.setData(this.elem, this.context, this.entries.length);
        this.entries.push(cGridRow);
        let /** @type {?} */ object = Reflect.construct(this.elem.getBinding().targetRef.getClass(), []);
        let /** @type {?} */ path = this.context.path();
        if (this.elem.getBinding().isCollection()) {
            let /** @type {?} */ arraySetted = get(this.data.instance, path, null);
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
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeRow(idx) {
        // TODO check if exists
        let /** @type {?} */ path = this.context.path();
        let /** @type {?} */ components = this.entries.splice(idx, 1);
        let /** @type {?} */ component = components.shift();
        this.vc.remove(idx);
        if (this.elem.getBinding().isCollection()) {
            let /** @type {?} */ arraySetted = get(this.data.instance, path, null);
            if (!arraySetted) {
                arraySetted = [];
            }
            arraySetted.splice(idx, 1);
            set(this.data.instance, path, arraySetted);
        }
        else {
            set(this.data.instance, path, null);
        }
        for (let /** @type {?} */ i = this.entries.length - 1; i >= 0; i--) {
            this.entries[i].instance.context.idx = i;
        }
        component.destroy();
    }
    /**
     * @param {?} form
     * @return {?}
     */
    build(form) {
        this.context.labelDisplay = 'none';
        form.getChildren().forEach(obj => {
            if (isFormObject(obj)) {
                this.header.push(obj.label);
            }
        });
        let /** @type {?} */ dataEntries = this.elem.getBinding().get(this.data.instance);
        let /** @type {?} */ c = this.addRow();
        return [c];
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ XFORMCOMPONENT = [
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
class xFormsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
class ViewBuilderComponent extends AbstractComponent {
    constructor() {
        super(...arguments);
        this._build = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set instance(value) {
        this._instance = value;
        this._build = false;
        this.__build();
    }
    /**
     * @return {?}
     */
    get instance() {
        return this._instance;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.__build();
    }
    /**
     * @return {?}
     */
    __build() {
        if (!this._build) {
            this.vc.clear();
            this.buildSingle(this._instance);
            this._build = true;
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class xViewsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NavigatorModule, xFormsModule, xViewsModule, AbstractFormComponent as ɵd, AbstractComponent as ɵe, ViewComponent as ɵf, NavigatorComponent as ɵa, CheckboxComponent as ɵi, FormComponent as ɵc, FormService as ɵg, GridCellComponent as ɵn, GridRowComponent as ɵm, GridComponent as ɵl, InputComponent as ɵh, RadioComponent as ɵj, SelectComponent as ɵk, XFORMCOMPONENT as ɵb, ViewBuilderComponent as ɵo };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXhzLW5nLWJhc2UuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL25hdmlnYXRvci9OYXZFbnRyeS50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMvbmF2aWdhdG9yL25hdmlnYXRvci5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL25hdmlnYXRvci9uYXZpZ2F0b3IubW9kdWxlLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vUmVzb2x2ZURhdGFWYWx1ZS50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHN2aWV3L1RyZWVPYmplY3QudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9Gb3JtT2JqZWN0LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy9leGNlcHRpb25zL05vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c3ZpZXcvQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29udGVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL1RhYnMudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9UYWIudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9SZWYudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9JbnB1dC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL0Zvcm0udHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9DaGVja2JveC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL1JhZGlvLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvU2VsZWN0LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvR3JpZC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vRm9ybUJ1aWxkZXIudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9mb3JtLnNlcnZpY2UudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHN2aWV3L0NvbnRleHQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2lucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2NoZWNrYm94LmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL3JhZGlvLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL3NlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9ncmlkLWNlbGwuY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vZ3JpZC1yb3cuY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS94Zm9ybXMuZWxlbWVudHMudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS94Zm9ybXMubW9kdWxlLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c3ZpZXcvdmlldy1idWlsZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHN2aWV3L3h2aWV3cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE5hdkVudHJ5IHtcbiAgcGF0aDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtOYXZFbnRyeX0gZnJvbSBcIi4vTmF2RW50cnlcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmF2LXJvb3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yQ29tcG9uZW50IHtcblxuICByb3V0ZXM6IE5hdkVudHJ5W10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XG5cbiAgICBmb3IgKGxldCByb3V0ZSBvZiByb3V0ZXIuY29uZmlnKSB7XG4gICAgICBsZXQgZW50cnkgPSBuZXcgTmF2RW50cnkoKTtcbiAgICAgIGVudHJ5LmxhYmVsID0gcm91dGUuZGF0YS5sYWJlbDtcbiAgICAgIGVudHJ5LnBhdGggPSByb3V0ZS5wYXRoO1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaChlbnRyeSk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGVzKVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge05hdmlnYXRvckNvbXBvbmVudH0gZnJvbSBcIi4vbmF2aWdhdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOYXZpZ2F0b3JDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSxSb3V0ZXJNb2R1bGVdLFxuICBleHBvcnRzOltOYXZpZ2F0b3JDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvck1vZHVsZSB7XG5cblxuXG5cbn1cbiIsImltcG9ydCB7Rm9ybU9iamVjdH0gZnJvbSAnLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9lbGVtZW50cy9Gb3JtJztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuL0lSZXNvbHZlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlRGF0YVZhbHVlIGltcGxlbWVudHMgSVJlc29sdmVyIHtcblxuICBwcml2YXRlIG9yZ1ZhbHVlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBwYXRoOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmV0Y2hLZXk6IHN0cmluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcm9wZXJ0eTogc3RyaW5nID0gbnVsbDtcblxuICBwcml2YXRlIG9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgb2JqZWN0OiBGb3JtT2JqZWN0LCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMub3JnVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eXFwkLywgJycpO1xuICAgIHRoaXMucGF0aCA9IHRoaXMub3JnVmFsdWUuc3BsaXQoJy4nKTtcbiAgICB0aGlzLmZldGNoS2V5ID0gdGhpcy5wYXRoLnBvcCgpO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9yZ1ZhbHVlO1xuICB9XG5cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMucGF0aC5qb2luKCcuJykpO1xuICAgIGlmIChlbGVtKSB7XG4gICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IGVsZW1bdGhpcy5mZXRjaEtleV07XG4gICAgICByZXR1cm4gZWxlbVt0aGlzLmZldGNoS2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW50IHJlc29sdmUgZGF0YScpO1xuICAgIH1cblxuICB9XG5cbn1cblxuIiwiaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmVlT2JqZWN0IHtcblxuICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogQ29udGV4dDtcblxuICBpbmRleDogbnVtYmVyO1xuXG4gIHBhcmVudDogVHJlZU9iamVjdCA9IG51bGw7XG5cbiAgY2hpbGRyZW46IFRyZWVPYmplY3RbXSA9IFtdO1xuXG4gIGluc2VydChvYmplY3Q6IFRyZWVPYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcbiAgICBvYmplY3QuaW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIGdldFBhcmVudCgpOiBUcmVlT2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICBzZXRQYXJlbnQocGFyZW50OiBUcmVlT2JqZWN0KSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4uL3hzdmlldy9UcmVlT2JqZWN0JztcblxuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtT2JqZWN0KG9iajogVHJlZU9iamVjdCB8IEZvcm1PYmplY3QpOiBvYmogaXMgRm9ybU9iamVjdCB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBGb3JtT2JqZWN0O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybU9iamVjdCBleHRlbmRzIFRyZWVPYmplY3Qge1xuXG4gIGlkOiBzdHJpbmc7XG5cbiAgdXNlZEtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgaGVscDogc3RyaW5nO1xuXG4gIHJlYWRvbmx5OiBmYWxzZTtcblxuICBwcml2YXRlIGJpbmRpbmc6IFByb3BlcnR5RGVmID0gbnVsbDtcblxuXG4gIGdldEJpbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZGluZztcbiAgfVxuXG5cblxuICBnZXRVc2VkS2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy51c2VkS2V5cztcbiAgfVxuXG5cblxuICBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgaWYgKHRoaXMuZ2V0QmluZGluZygpIGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIGlmICh0aGlzLmdldFBhcmVudCgpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmKGlzRm9ybU9iamVjdChwYXJlbnQpKXtcbiAgICAgICAgICBhcnIucHVzaChwYXJlbnQuZ2V0UGF0aCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAvLyAgdGhyb3cgbmV3IEVycm9yKCdwYXJlbnQgaXMgbm90IGEgZm9ybSBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLnB1c2godGhpcy5uYW1lKTtcbiAgICAgIGlmICh0aGlzLmdldEJpbmRpbmcoKS5pc0NvbGxlY3Rpb24oKSkge1xuICAgICAgICBhcnIucHVzaCgnJGlkeCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiB4LnRyaW0oKSAhPSAnJykuam9pbignLicpO1xuICB9XG5cblxuICBnZXRGb3JtKCk6IEZvcm1PYmplY3Qge1xuICAgIGlmICh0aGlzLnBhcmVudCAmJiBpc0Zvcm1PYmplY3QodGhpcy5wYXJlbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0Rm9ybSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09ICdmb3JtJykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3IgdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgIGxldCBmb3JtID0gdGhpcy5nZXRGb3JtKCk7IC8vXG4gICAgICBmb3JtWydyZXNvbHZlciddLnB1c2godmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMudXNlZEtleXMucHVzaChrZXkpO1xuICAgIGxldCBtZXRob2ROYW1lID0gJ2hhbmRsZScgKyBfLmNhcGl0YWxpemUoa2V5KTtcbiAgICBpZiAodGhpc1ttZXRob2ROYW1lXSkge1xuICAgICAgdGhpc1ttZXRob2ROYW1lXSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEb24ndCBvdmVycmlkZSB0eXBlXG4gICAqL1xuICBoYW5kbGVUeXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgfVxuXG5cbiAgcG9zdFByb2Nlc3MoKSB7XG4gIH1cblxuXG4gIHJlcGxhY2Uoc29tZU9iamVjdDogRm9ybU9iamVjdCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgIGxldCBpZHggPSBwYXJlbnQuZ2V0Q2hpbGRyZW4oKS5pbmRleE9mKHRoaXMpO1xuICAgIGlmIChpZHggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgZmluZCBpbmRleCwgc29tZXRoaW5nIGlzIHdyb25nJyk7XG4gICAgfVxuICAgIHBhcmVudC5nZXRDaGlsZHJlbigpW2lkeF0gPSBzb21lT2JqZWN0O1xuICAgIHNvbWVPYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgcmV0dXJuIHNvbWVPYmplY3Q7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IodHlwZU5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHR5cGVOYW1lICsgJyBub3QgZGVmaW5lZCcpO1xuICB9XG59XG4iLCJpbXBvcnQge05vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yfSBmcm9tICcuLy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcic7XG5pbXBvcnQge0lFbGVtZW50RGVmfSBmcm9tICcuL0lFbGVtZW50RGVmJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHN0YXRpYyAkc2VsZjogQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5ID0gbnVsbDtcblxuICBwcml2YXRlIGZvcm1IYW5kbGVyOiBJRWxlbWVudERlZltdID0gW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHN0YXRpYyAkKCk6IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSB7XG4gICAgaWYgKCF0aGlzLiRzZWxmKSB7XG4gICAgICB0aGlzLiRzZWxmID0gbmV3IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kc2VsZjtcbiAgfVxuXG4gIGdldE9yQ3JlYXRlRGVmKHR5cGVOYW1lOiBzdHJpbmcpOiBJRWxlbWVudERlZiB7XG4gICAgbGV0IGV4aXN0cyA9IF8uZmluZCh0aGlzLmZvcm1IYW5kbGVyLCB7dHlwZTogdHlwZU5hbWV9KTtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgZXhpc3RzID0ge3R5cGU6IHR5cGVOYW1lfTtcbiAgICAgIHRoaXMuZm9ybUhhbmRsZXIucHVzaChleGlzdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZXhpc3RzO1xuICB9XG5cbiAgZ2V0RGVmKHR5cGVOYW1lOiBzdHJpbmcpOiBJRWxlbWVudERlZiB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLmZvcm1IYW5kbGVyLCB7dHlwZTogdHlwZU5hbWV9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRIYW5kbGVyKHR5cGVOYW1lOiBzdHJpbmcsIGtsYXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBkZWYgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgZGVmLmhhbmRsZXIgPSBrbGFzcztcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cblxuICBzdGF0aWMgYWRkQ29tcG9uZW50KHR5cGVOYW1lOiBzdHJpbmcsIGtsYXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBkZWYgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgZGVmLmNvbXBvbmVudCA9IGtsYXNzO1xuICAgIHJldHVybiBkZWY7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlSGFuZGxlcih0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgaWYgKCFoYW5kbGVyIHx8ICFoYW5kbGVyLmhhbmRsZXIpIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcih0eXBlTmFtZSk7XG4gICAgfVxuICAgIGxldCBvYmogPSBSZWZsZWN0LmNvbnN0cnVjdChoYW5kbGVyLmhhbmRsZXIsIFtdKTtcbiAgICBvYmoudHlwZSA9IHR5cGVOYW1lO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlQ29tcG9uZW50KHR5cGVOYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgaGFuZGxlciA9IHRoaXMuJCgpLmdldE9yQ3JlYXRlRGVmKHR5cGVOYW1lKTtcbiAgICBpZiAoIWhhbmRsZXIgfHwgIWhhbmRsZXIuY29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3IodHlwZU5hbWUpO1xuICAgIH1cbiAgICBsZXQgb2JqID0gUmVmbGVjdC5jb25zdHJ1Y3QoaGFuZGxlci5jb21wb25lbnQsIFtdKTtcbiAgICBvYmoudHlwZSA9IHR5cGVOYW1lO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxufVxuXG4iLCJpbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVmlld0NvbnRlbnQodHlwZU5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iamVjdDogRnVuY3Rpb24pIHtcbiAgICBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuYWRkSGFuZGxlcih0eXBlTmFtZSwgb2JqZWN0KTtcbiAgfTtcbn1cbiIsIlxuaW1wb3J0IHtGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcblxuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3RhYnMnKVxuZXhwb3J0IGNsYXNzIFRhYnMgZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxufVxuIiwiXG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3RhYicpXG5leHBvcnQgY2xhc3MgVGFiIGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbn1cbiIsImltcG9ydCB7Rm9ybU9iamVjdCwgaXNGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuLi9JUmVzb2x2ZXInO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL0Zvcm0nO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuQFZpZXdDb250ZW50KCdyZWYnKVxuZXhwb3J0IGNsYXNzIFJlZiBleHRlbmRzIEZvcm1PYmplY3QgaW1wbGVtZW50cyBJUmVzb2x2ZXIge1xuXG4gIHVzZTogc3RyaW5nO1xuXG4gIHBvc3RQcm9jZXNzKCkge1xuICAgIHRoaXMuZ2V0Rm9ybSgpWydyZXNvbHZlciddLnB1c2godGhpcyk7XG4gIH1cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMudXNlKTtcbiAgICBpZihpc0Zvcm1PYmplY3QoZWxlbSkpe1xuICAgICAgbGV0IGUgPSBfLmNsb25lKGVsZW0pO1xuICAgICAgdGhpcy5yZXBsYWNlKGUpO1xuXG4gICAgICAvLyBjb3B5IHByb3BlcnRpZXNcbiAgICAgIHRoaXMuZ2V0VXNlZEtleXMoKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBlLmhhbmRsZShrLCB0aGlzW2tdKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG5cblxuIiwiXG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2lucHV0JylcbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIEZvcm1PYmplY3Qge1xuXG4gIHZhcmlhbnQ6IHN0cmluZyA9ICd0ZXh0JztcblxuXG4gIGhhbmRsZVZhcmlhbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFyaWFudCA9IHZhbHVlO1xuICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtJUmVzb2x2ZXJ9IGZyb20gJy4uL0lSZXNvbHZlcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtSZXNvbHZlRGF0YVZhbHVlfSBmcm9tICcuLi9SZXNvbHZlRGF0YVZhbHVlJztcbmltcG9ydCB7UmVmfSBmcm9tICcuL1JlZic7XG5cbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuXG5AVmlld0NvbnRlbnQoJ2Zvcm0nKVxuZXhwb3J0IGNsYXNzIEZvcm0gZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuICBkYXRhQ29udGFpbmVyOiBhbnk7XG5cbiAgcmVzb2x2ZXI6IElSZXNvbHZlcltdID0gW107XG5cbiAgY29tYmluZShvdGhlckZvcm06IEZvcm0pIHtcbiAgICBsZXQgcmVzb2x2ZXJDYWNoZTogSVJlc29sdmVyW10gPSBbXTtcblxuICAgIHdoaWxlICh0aGlzLnJlc29sdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCByZXNvbHZlciA9IHRoaXMucmVzb2x2ZXIuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZXIucmVzb2x2ZShvdGhlckZvcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZXJDYWNoZS5wdXNoKHJlc29sdmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAocmVzb2x2ZXJDYWNoZS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGxldCByZXNvbHZlciA9IHJlc29sdmVyQ2FjaGUuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlZikge1xuICAgICAgICByZXNvbHZlci5yZXNvbHZlKG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IF9wYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCB0bXBFbGVtOiBGb3JtT2JqZWN0ID0gdGhpcztcbiAgICBsZXQgZWxlbWVudCA9IG51bGw7XG4gICAgd2hpbGUgKF9wYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBfcCA9IF9wYXRoLnNoaWZ0KCk7XG4gICAgICBsZXQgcmV0ID0gXy5maW5kKDxGb3JtT2JqZWN0W10+dG1wRWxlbS5nZXRDaGlsZHJlbigpLCB7bmFtZTogX3B9KTtcbiAgICAgIC8vaWYoaXNGb3JtT2JqZWN0KHJldCkpe1xuICAgICAgdG1wRWxlbSA9IHJldDtcbiAgICAgIGlmICghdG1wRWxlbSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSB0bXBFbGVtO1xuICAgICAgfVxuICAgICAgLy99XG4gICAgfVxuICAgIHJldHVybiBfcGF0aC5sZW5ndGggPT0gMCAmJiBlbGVtZW50ID8gZWxlbWVudCA6IG51bGw7XG5cbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7SW5wdXR9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2NoZWNrYm94JylcbmV4cG9ydCBjbGFzcyBDaGVja2JveCBleHRlbmRzIElucHV0IHtcblxuXG59XG4iLCJcbmltcG9ydCB7SW5wdXR9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3JhZGlvJylcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIElucHV0IHtcblxuXG59XG4iLCJpbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3NlbGVjdCcpXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbiAgZW51bTogYW55O1xuXG59XG4iLCJpbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2dyaWQnKVxuZXhwb3J0IGNsYXNzIEdyaWQgZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuXG5cbn1cbiIsImV4cG9ydCBjbGFzcyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuIiwiaW1wb3J0IHtOb3RZZXRJbXBsZW1lbnRlZEVycm9yfSBmcm9tICd0eXBleHMtYmFzZS9saWJzL2V4Y2VwdGlvbnMvTm90WWV0SW1wbGVtZW50ZWRFcnJvcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZWxlbWVudHMnO1xuXG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge0VudGl0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL0VudGl0eURlZic7XG5pbXBvcnQge1Byb3BlcnR5RGVmfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvUHJvcGVydHlEZWYnO1xuaW1wb3J0IHtTY2hlbWFEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9TY2hlbWFEZWYnO1xuaW1wb3J0IHtSZWdpc3RyeX0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1JlZ2lzdHJ5JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4veHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuZXhwb3J0IGNsYXNzIEZvcm1CdWlsZGVyIHtcblxuICBwcml2YXRlIGRhdGE6IGFueTtcblxuICBwcml2YXRlIGZvcm06IEZvcm1PYmplY3Q7XG5cbiAgcHJpdmF0ZSBzY2hlbWE6IFNjaGVtYURlZjtcblxuICBidWlsZEZyb21KU09OKGRhdGE6IGFueSk6IEZvcm0ge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zY2hlbWEgPSBSZWdpc3RyeS5nZXRTY2hlbWEoJ2RlZmF1bHQnKTtcbiAgICByZXR1cm4gPEZvcm0+dGhpcy5fYnVpbGRGb3JtKGRhdGEpO1xuICB9XG5cbiAgYnVpbGRGcm9tRW50aXR5KGVudGl0eTogRW50aXR5RGVmKTogRm9ybSB7XG4gICAgdGhpcy5kYXRhID0gZW50aXR5O1xuICAgIHJldHVybiA8Rm9ybT50aGlzLl9idWlsZEZvcm1PYmplY3QoZW50aXR5KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfYnVpbGRGb3JtT2JqZWN0KGVudGl0eTogRW50aXR5RGVmIHwgUHJvcGVydHlEZWYsIHBhcmVudDogRm9ybU9iamVjdCA9IG51bGwpIHtcblxuICAgIGxldCBmb3JtT2JqZWN0OiBGb3JtT2JqZWN0ID0gbnVsbDtcblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLnNjaGVtYSA9IFJlZ2lzdHJ5LmdldFNjaGVtYShlbnRpdHkuc2NoZW1hTmFtZSk7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtT2JqZWN0ID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmNyZWF0ZUhhbmRsZXIoJ2Zvcm0nKTtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCduYW1lJywgZW50aXR5LmlkKCkpO1xuICAgICAgZm9ybU9iamVjdC5oYW5kbGUoJ2JpbmRpbmcnLCBlbnRpdHkpO1xuICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBhbHNvIG90aGVyIHR5cGVzXG4gICAgICBsZXQgcHJvcGVydHkgPSBlbnRpdHk7XG4gICAgICBsZXQgZm9ybVR5cGUgPSA8c3RyaW5nPnByb3BlcnR5LmdldE9wdGlvbnMoJ2Zvcm0nKSB8fCAndGV4dCc7XG4gICAgICBsZXQgbWV0aG9kTmFtZSA9ICdmb3InICsgXy5jYXBpdGFsaXplKGZvcm1UeXBlKTtcbiAgICAgIGlmICh0aGlzW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIGZvcm1PYmplY3QgPSB0aGlzW21ldGhvZE5hbWVdKGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtT2JqZWN0ID0gdGhpcy5mb3JEZWZhdWx0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlEZWYpIHtcblxuICAgIH1cblxuICAgIGlmIChmb3JtT2JqZWN0ICE9IG51bGwpIHtcbiAgICAgIGZvcm1PYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGZvcm1PYmplY3Qgbm8gY3JlYXRlZCBidXQgcGFyZW50IGlzIHBhc3NlZCB0aGVuIHVzZSBpdCBhcyBmb3Jtb2JqZWN0IGZ1cnRoZXIgKGdyaWQgPC0gYWRkIGZ1cnRlciBlbGVtZW50cylcbiAgICAgIGZvcm1PYmplY3QgPSBwYXJlbnQ7XG4gICAgfVxuXG5cbiAgICBpZiAoZW50aXR5IGluc3RhbmNlb2YgRW50aXR5RGVmKSB7XG4gICAgICBsZXQgcHJvcGVydGllcyA9IGVudGl0eS5nZXRQcm9wZXJ0eURlZnMoKTtcblxuICAgICAgZm9yIChsZXQgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm1PYmplY3QocHJvcGVydHksIGZvcm1PYmplY3QpO1xuICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgLy8gVE9ETyBmb3IgcHJvcGVydGllcyB3aGljaCBwb2ludHMgdG8gRW50aXR5IC8gRW50aXRpZXNcbiAgICAgIC8vcHJvcGVydHkuZ2V0RW50aXR5RGVmXG4gICAgICAvL2Zvcm1PYmplY3Q7XG4gICAgICBsZXQgcHJvcGVydHkgPSA8UHJvcGVydHlEZWY+ZW50aXR5O1xuICAgICAgaWYgKHByb3BlcnR5LmlzUmVmZXJlbmNlKCkpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5LmlzRW50aXR5UmVmZXJlbmNlKCkpIHtcbiAgICAgICAgICBsZXQgZW50aXR5ID0gcHJvcGVydHkudGFyZ2V0UmVmLmdldEVudGl0eSgpO1xuICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChlbnRpdHksIGZvcm1PYmplY3QpO1xuICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuc2NoZW1hLmdldFByb3BlcnRpZXNGb3IocHJvcGVydHkudGFyZ2V0UmVmLmdldENsYXNzKCkpO1xuICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChwcm9wZXJ0eSwgZm9ybU9iamVjdCk7XG4gICAgICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9ybU9iamVjdC5wb3N0UHJvY2VzcygpO1xuICAgIHJldHVybiBmb3JtT2JqZWN0O1xuXG4gIH1cblxuICBwcml2YXRlIGZvckRlZmF1bHQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgbGV0IGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcihmb3JtVHlwZSk7XG4gICAgaWYgKGZvcm1PYmplY3QpIHtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCd2YXJpYW50JywgZm9ybVR5cGUpO1xuICAgICAgdGhpcy5fYXBwbHlWYWx1ZXMoZm9ybU9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgcmV0dXJuIGZvcm1PYmplY3Q7XG4gICAgfVxuICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGZvcm1UeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yVGV4dChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ySW5wdXQoZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yUGFzc3dvcmQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcklucHV0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gIH1cblxuICBwcml2YXRlIGZvckVtYWlsKGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIHJldHVybiB0aGlzLl9mb3JJbnB1dChmb3JtVHlwZSwgcHJvcGVydHkpO1xuICB9XG5cblxuICBwcml2YXRlIF9mb3JJbnB1dChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICBsZXQgZm9ybU9iamVjdCA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5jcmVhdGVIYW5kbGVyKCdpbnB1dCcpO1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCd2YXJpYW50JywgZm9ybVR5cGUpO1xuICAgIHRoaXMuX2FwcGx5VmFsdWVzKGZvcm1PYmplY3QsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gZm9ybU9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5VmFsdWVzKGZvcm1PYmplY3Q6IEZvcm1PYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCduYW1lJywgcHJvcGVydHkubmFtZSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2lkJywgcHJvcGVydHkuaWQoKSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2xhYmVsJywgcHJvcGVydHkubGFiZWwgPyBwcm9wZXJ0eS5sYWJlbCA6IF8uY2FwaXRhbGl6ZShwcm9wZXJ0eS5uYW1lKSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2JpbmRpbmcnLCBwcm9wZXJ0eSk7XG5cbiAgICBsZXQgb3B0aW9ucyA9IHByb3BlcnR5LmdldE9wdGlvbnMoKTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChvcHQgPT4ge1xuICAgICAgICBpZiAoL14oc291cmNlfHRhcmdldHxwcm9wZXJ0eSkvLnRlc3Qob3B0KSkgcmV0dXJuO1xuICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICAgIGZvcm1PYmplY3QuaGFuZGxlKG9wdCwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybShkYXRhOiBhbnksIHBhcmVudDogRm9ybU9iamVjdCA9IG51bGwpIHtcbiAgICBsZXQga2V5cyA9IF8ucmVtb3ZlKE9iamVjdC5rZXlzKGRhdGEpLCAoZTogc3RyaW5nKSA9PiBbJ2NoaWxkcmVuJywgJ3R5cGUnXS5pbmRleE9mKGUpID09PSAtMSk7XG5cbiAgICBsZXQgZm9ybU9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG4gICAgaWYgKGRhdGEudHlwZSkge1xuICAgICAgLy8gbG9va3VwIGhhbmRsZXJcbiAgICAgIGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcihkYXRhLnR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcigpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtT2JqZWN0O1xuICAgIH1cblxuICAgIGZvcm1PYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgbGV0IHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGlmICgvXlxcJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBSZXNvbHZlRGF0YVZhbHVlKHZhbHVlLCBmb3JtT2JqZWN0LCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3JtT2JqZWN0LmhhbmRsZShrZXksIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIGlmIChkYXRhLmNoaWxkcmVuKSB7XG4gICAgICBsZXQgdmFsdWUgPSBkYXRhLmNoaWxkcmVuO1xuICAgICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdmFsdWUpIHtcbiAgICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm0oZW50cnksIGZvcm1PYmplY3QpO1xuICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdFlldEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtT2JqZWN0LnBvc3RQcm9jZXNzKCk7XG4gICAgcmV0dXJuIGZvcm1PYmplY3Q7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVnaXN0cnl9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9SZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL2VsZW1lbnRzJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1CdWlsZGVyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2Uge1xuXG4gIGNhY2hlOiBhbnkgPSB7fTtcblxuICBnZXQobmFtZTogc3RyaW5nLCBpbnN0YW5jZTogYW55KTogRm9ybSB7XG4gICAgLy8gVE9ETyBsb29rdXAgZm9yIGZvcm0gbW9kaWZpY2F0aW9uc1xuICAgIGxldCBlbnRpdHlEZWYgPSBSZWdpc3RyeS5nZXRFbnRpdHlEZWZGb3IoaW5zdGFuY2UpO1xuICAgIGxldCBidWlsZGVyMiA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICAgIHJldHVybiBidWlsZGVyMi5idWlsZEZyb21FbnRpdHkoZW50aXR5RGVmKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVmlld0NvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqZWN0OiBGdW5jdGlvbikge1xuICAgIENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5hZGRDb21wb25lbnQodHlwZU5hbWUsIG9iamVjdCk7XG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIEluamVjdG9yLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4vVHJlZU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuXG5jb25zdCBQUk9QX01FVEFEQVRBID0gJ19fcHJvcF9fbWV0YWRhdGFfXyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4ge1xuXG4gIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgZWxlbTogVDtcblxuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSB2YzogVmlld0NvbnRhaW5lclJlZjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSW5qZWN0b3IpIHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBwdWJsaWMgcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3QoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdCgpIHtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRFbGVtKGVsZW06IFQpIHtcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICB9XG5cblxuICBidWlsZFNpbmdsZShjb250ZW50OiBUKTogQWJzdHJhY3RDb21wb25lbnQ8VD4ge1xuXG5cbiAgICBjb25zdCBoYW5kbGUgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuJCgpLmdldE9yQ3JlYXRlRGVmKGNvbnRlbnQudHlwZSk7XG4gICAgaWYgKGhhbmRsZSAmJiBoYW5kbGUuY29tcG9uZW50KSB7XG5cblxuICAgICAgaWYgKHRoaXMudmMpIHtcblxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxhbnk+aGFuZGxlLmNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBSZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSA8QWJzdHJhY3RDb21wb25lbnQ8VD4+Y29tcFJlZi5pbnN0YW5jZTtcblxuICAgICAgICBsZXQgbWV0YWRhdGE6IHsgW2s6IHN0cmluZ106IGFueSB9ID0gbnVsbDtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KFBST1BfTUVUQURBVEEpKSB7XG4gICAgICAgICAgbWV0YWRhdGEgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcltQUk9QX01FVEFEQVRBXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3RhbmNlLnNldEVsZW0oY29udGVudCk7XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLmJ1aWxkKSB7XG4gICAgICAgICAgbGV0IHJlZnMgPSBpbnN0YW5jZS5idWlsZChjb250ZW50KTtcblxuICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgbGV0IHYgPSBtZXRhZGF0YVtrZXldO1xuICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eSh2KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheSh2KSAmJiB2Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZWNvcmF0b3IgPSBfLmZpcnN0KHYpO1xuICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcERlY29yYXRvci5maXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maW5kKHJlZnMsIHJlZiA9PiByZWYuY29uc3RydWN0b3IgPT0gcHJvcERlY29yYXRvci5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5ICsgJzInXSA9IF8uZmluZChyZWZzLCByZWYgPT4gcmVmLmNvbnN0cnVjdG9yID09IHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXkgKyAnMiddID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5cXCd0IHJlc29sdmUgbWV0YWRhdGEnLCBpbnN0YW5jZS5jb25zdHJ1Y3Rvciwga2V5LCB2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGNvbnRlbnQudHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuXG4gIH1cblxuXG4gIGJ1aWxkKGNvbnRlbnQ6IFQpOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgcmVmczogQWJzdHJhY3RDb21wb25lbnQ8VD5bXSA9IFtdO1xuICAgIGNvbnRlbnQuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGNvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgbGV0IHJlZiA9IHRoaXMuYnVpbGRTaW5nbGUoPFQ+Y29udGVudE9iamVjdCk7XG4gICAgICByZWZzLnB1c2gocmVmKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVmcztcbiAgfVxuXG59XG4iLCJcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuZXhwb3J0IHR5cGUgQUxJR05NRU5UID0gJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJ1xuXG5leHBvcnQgdHlwZSBMQUJFTF9ESVNQTEFZID0gJ3RvcCcgfCAnaW5saW5lJyB8ICdub25lJ1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGlkeDogbnVtYmVyID0gLTE7XG5cbiAgcGFyZW50OiBDb250ZXh0O1xuXG4gIGxhYmVsRGlzcGxheTogTEFCRUxfRElTUExBWTtcblxuICAvLyBhbGlnbm1lbnQ6XG5cbiAgY2hpbGQoX25hbWU6IHN0cmluZyA9IG51bGwsIGlkeDogbnVtYmVyID0gLTEpIHtcbiAgICBsZXQgbmFtZSA9IG5ldyBDb250ZXh0KCk7XG4gICAgbmFtZS5wYXJlbnQgPSB0aGlzO1xuICAgIG5hbWUubmFtZSA9IF9uYW1lO1xuICAgIG5hbWUuaWR4ID0gaWR4O1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cblxuICBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFycjogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGFyciA9IHRoaXMucGFyZW50LnBhdGgoKS5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlkeCA+IC0xKSB7XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gYXJyW2Fyci5sZW5ndGggLSAxXSArICdbJyArIHRoaXMuaWR4ICsgJ10nO1xuICAgICAgLy8gYXJyLnB1c2godGhpcy5uYW1lICsgJ1snICsgdGhpcy5pZHggKyAnXScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvLyAgY29uc29sZS5sb2coYXJyKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiAhXy5pc0VtcHR5KHgpKS5qb2luKCcuJyk7XG4gIH1cblxuXG4gIGdldChrZXk6IHN0cmluZywgX2RlZmF1bHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XG4gICAgICByZXR1cm4gXy5nZXQodGhpcywga2V5LCBfZGVmYXVsdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4veHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uL3hzdmlldy9Db250ZXh0JztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGb3JtQ29tcG9uZW50PFQgZXh0ZW5kcyBGb3JtT2JqZWN0PiBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PFQ+IHtcblxuICBzdGF0aWMgX2luYzogbnVtYmVyID0gMDtcblxuXG4gIGRhdGE6IERhdGFDb250YWluZXI8YW55PjtcblxuICBpbmM6IG51bWJlciA9IDA7XG5cblxuXG4gIGNvbnN0cnVjdCgpe1xuICAgIHRoaXMuaW5jID0gQWJzdHJhY3RGb3JtQ29tcG9uZW50Ll9pbmMrKztcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmlkO1xuICB9XG5cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLm5hbWU7XG4gIH1cblxuXG4gIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmxhYmVsO1xuICB9XG5cblxuICBnZXQgbGFiZWxEaXNwbGF5KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0KCdsYWJlbERpc3BsYXknLCAndG9wJyk7XG4gIH1cblxuXG4gIGdldCBoZWxwKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0uaGVscDtcbiAgfVxuXG5cbiAgZ2V0IGlzUmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5yZWFkb25seTtcbiAgfVxuXG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5jaGVja2VkKHRoaXMubmFtZSkgJiYgdGhpcy5kYXRhLnZhbGlkKHRoaXMubmFtZSk7XG4gIH1cblxuXG4gIHByb3RlY3RlZCBzZXRGb3JtT2JqZWN0KGVsZW06IFQpIHtcbiAgICB0aGlzLnNldEVsZW0oZWxlbSk7XG4gIH1cblxuXG4gIHNldERhdGEoZWxlbTogVCwgcGFyZW50OiBDb250ZXh0LCBpZHg6IG51bWJlciA9IC0xKSB7XG4gICAgdGhpcy5zZXRGb3JtT2JqZWN0KGVsZW0pO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHBhcmVudC5jaGlsZChlbGVtLm5hbWUsIGlkeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG4gICAgICBpZiAoZWxlbS5nZXRCaW5kaW5nKCkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgICB0aGlzLmNvbnRleHQubmFtZSA9IGVsZW0ubmFtZTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmlkeCA9IGlkeDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBsZXQgcGF0aCA9IHRoaXMuY29udGV4dC5wYXRoKCk7XG4gICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gIH1cblxuXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBsZXQgcGF0aCA9IHRoaXMuY29udGV4dC5wYXRoKCk7XG4gICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCB2KTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCkgOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgY29tcDpBYnN0cmFjdENvbXBvbmVudDxUPltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcbiAgICAgIGlmIChpc0Zvcm1PYmplY3QoZm9ybU9iamVjdCkpIHtcblxuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcbiAgICAgICAgICBpZiAodGhpcy52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZSA9IDxBYnN0cmFjdEZvcm1Db21wb25lbnQ8YW55Pj5yZWYuaW5zdGFuY2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5kYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgaW5zdGFuY2UuYnVpbGQoZm9ybU9iamVjdCk7XG4gICAgICAgICAgICBjb21wLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGZvcm1PYmplY3QudHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29tcDtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdG9yLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5AVmlld0NvbXBvbmVudCgnZm9ybScpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Zm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgLy9ob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy9vdXRwdXRzOiBbJ25nU3VibWl0J10sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8Rm9ybT4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBPdXRwdXQoKVxuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBmb3JtTmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGluc3RhbmNlOiBhbnk7XG5cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1TZXJ2aWNlKSBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChJbmplY3RvcikgcHVibGljIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHB1YmxpYyByOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgLy8gVE9ETyBpbnN0YW5jZSBtdXN0IGJlIHByZXNlbnRcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YUNvbnRhaW5lcih0aGlzLmluc3RhbmNlKTtcbiAgICB0aGlzLmVsZW0gPSB0aGlzLmZvcm1TZXJ2aWNlLmdldCh0aGlzLmZvcm1OYW1lLCB0aGlzLmluc3RhbmNlKTtcblxuICAgIC8vIFRPRE8gcmVzdHJ1Y3R1cmUgZm9ybVxuICAgIHRoaXMuYnVpbGQodGhpcy5lbGVtKTtcbiAgfVxuXG5cbiAgYXN5bmMgb25TdWJtaXQoJGV2ZW50OiBFdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuZGF0YS52YWxpZGF0ZSgpO1xuICAgIHRoaXMubmdTdWJtaXQuZW1pdCh7ZXZlbnQ6JGV2ZW50LCBkYXRhOnRoaXMuZGF0YX0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbn1cblxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge0lucHV0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5cblxuXG5AVmlld0NvbXBvbmVudCgnaW5wdXQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8SW5wdXQ+LyogaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyAqLyB7XG5cbiAgZ2V0IHR5cGUoKXtcbiAgICByZXR1cm4gdGhpcy5lbGVtLnZhcmlhbnQ7XG4gIH1cblxuXG5cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtDaGVja2JveH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdjaGVja2JveCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Y2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxDaGVja2JveD4ge1xuXG4gIGdldCB0eXBlKCl7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cblxuICBnZXQgaXNDaGVja2VkKCl7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdO1xuICB9XG5cbiAgc2V0IGlzQ2hlY2tlZCh2YWx1ZTpib29sZWFuKXtcbiAgICBpZih2YWx1ZSl7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMvUmFkaW8nO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdyYWRpbycpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4cmFkaW8nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmFkaW8uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxSYWRpbz4ge1xuXG4gIG9uOiBzdHJpbmcgPSAnWWVzJztcblxuICBvZmY6IHN0cmluZyA9ICdObyc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cbiAgZ2V0IGlzQ2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluc3RhbmNlW3RoaXMubmFtZV07XG4gIH1cblxuICBzZXQgaXNDaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7U2VsZWN0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnLS0tJztcbiAgZGVmYXVsdDogYm9vbGVhbjtcbn1cblxuQFZpZXdDb21wb25lbnQoJ3NlbGVjdCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4c2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxTZWxlY3Q+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjYWNoZWRPcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG5cbiAgZ2V0IHN1cHBvcnRzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhY2hlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmxvYWRPcHRpb25zKCk7XG4gIH1cblxuICBsb2FkT3B0aW9ucygpIHtcbiAgICBsZXQgZW51bXMgPSB0aGlzLnJldHJpZXZlRW51bSgpO1xuXG4gICAgaWYgKGVudW1zKSB7XG4gICAgICBpZiAoZW51bXMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIGVudW1zLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24oKTtcbiAgICAgICAgICBpZiAoXy5pc1N0cmluZyhlKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IG8udmFsdWUgPSBlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXy5oYXMoZSwgJ2xhYmVsJykgfHwgXy5oYXMoZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIG8ubGFiZWwgPSBfLmdldChlLCAnbGFiZWwnLCBfLmdldChlLCAndmFsdWUnKSk7XG4gICAgICAgICAgICBvLnZhbHVlID0gXy5nZXQoZSwgJ3ZhbHVlJywgXy5nZXQoZSwgJ2xhYmVsJykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhY2hlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbnVtcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgIGxldCBvID0gbmV3IE9wdGlvbigpO1xuICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGUpKSB7XG4gICAgICAgICAgICBvLmxhYmVsID0gby52YWx1ZSA9IGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmhhcyhlLCAnbGFiZWwnKSB8fCBfLmhhcyhlLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IF8uZ2V0KGUsICdsYWJlbCcsIF8uZ2V0KGUsICd2YWx1ZScpKTtcbiAgICAgICAgICAgIG8udmFsdWUgPSBfLmdldChlLCAndmFsdWUnLCBfLmdldChlLCAnbGFiZWwnKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FjaGVkT3B0aW9ucy5wdXNoKG8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIHJldHJpZXZlRW51bSgpOiBhbnlbXSB7XG4gICAgaWYgKF8uaXNBcnJheSh0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW0uZW51bTtcbiAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0aGlzLmVsZW0uZW51bSkuZ2V0KHRoaXMubmFtZSk7XG4gICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKHRoaXMuZWxlbS5lbnVtKSkge1xuICAgICAgLy8gY2hlY2sgaWYgYW4gZW50cnkgd2l0aCB0aGUgcHJvcGVydHluYW1lIGV4aXN0c1xuICAgICAgbGV0IGxvb2t1cFBhdGg6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG4gICAgICBpZiAodGhpcy5jb250ZXh0LnBhcmVudCkge1xuICAgICAgICBsb29rdXBQYXRoLnB1c2godGhpcy5jb250ZXh0LnBhcmVudC5wYXRoKCkpO1xuICAgICAgfVxuICAgICAgbG9va3VwUGF0aC5wdXNoKHRoaXMuZWxlbS5lbnVtKVxuICAgICAgbG9va3VwUGF0aCA9ICg8c3RyaW5nW10+bG9va3VwUGF0aCkuam9pbignLicpO1xuXG4gICAgICBpZiAoXy5oYXModGhpcy5kYXRhLmluc3RhbmNlLCBsb29rdXBQYXRoKSkge1xuICAgICAgICAvLyBUT0RPIG9ic2VydmUgaWYgcHJvcGVydHkgaXMgY2hhbmdlZCwgaWYgaXQgZG9lcyB0aGVuIHJlc2V0IGVudW1cbiAgICAgICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgbG9va3VwUGF0aCwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZm91bmQgZW51bSByZWZlcmVuY2UnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3hncmlkY2VsbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLWNlbGwuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ2VsbENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+IHtcblxuICBwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG5cdGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBbXG5cdFx0ICAnY29sJ1xuXHRcdF0uam9pbignICcpO1xuXHR9XG5cbiAgc2V0R3JpZENvbXBvbmVudChncmlkOiBHcmlkQ29tcG9uZW50KSB7XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG5cblxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7R3JpZENlbGxDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQge05vRm9ybVR5cGVEZWZpbmVkRXJyb3J9IGZyb20gJy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWRyb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4ge1xuXG4gIHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudDtcblxuICBzZXRHcmlkQ29tcG9uZW50KGdyaWQ6IEdyaWRDb21wb25lbnQpIHtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnZm9ybS1yb3cnXG4gICAgXS5qb2luKCcgJyk7XG4gIH1cblxuXG4gIGdldCBpZHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZHg7XG4gIH1cblxuICByZW1vdmVSb3coKSB7XG4gICAgdGhpcy5ncmlkLnJlbW92ZVJvdyh0aGlzLmNvbnRleHQuaWR4KTtcbiAgfVxuXG4gIGJ1aWxkKGZvcm06IEZvcm1PYmplY3QpOkFic3RyYWN0Q29tcG9uZW50PGFueT5bXSB7XG4gICAgbGV0IGNvbXA6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcblxuICAgICAgaWYgKGlzRm9ybU9iamVjdChmb3JtT2JqZWN0KSkge1xuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcblxuICAgICAgICAgIGxldCBjR3JpZENlbGxGYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEdyaWRDZWxsQ29tcG9uZW50KTtcbiAgICAgICAgICBsZXQgY0dyaWRDZWxsID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoY0dyaWRDZWxsRmFjdG9yeSk7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLnNldEdyaWRDb21wb25lbnQodGhpcy5ncmlkKTtcbiAgICAgICAgICBjR3JpZENlbGwuaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNHcmlkQ2VsbC5pbnN0YW5jZS52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSBjR3JpZENlbGwuaW5zdGFuY2UudmMuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gPEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+PnJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXREYXRhKGZvcm1PYmplY3QsIHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICBpbnN0YW5jZS5idWlsZChmb3JtT2JqZWN0KTtcbiAgICAgICAgICAgIGNvbXAucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHZpZXcgY29udGVudCBzZXR0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoZm9ybU9iamVjdC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wO1xuICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRSb3dDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1yb3cuY29tcG9uZW50JztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuQFZpZXdDb21wb25lbnQoJ2dyaWQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8R3JpZD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgZW50cmllczogQ29tcG9uZW50UmVmPEdyaWRSb3dDb21wb25lbnQ+W10gPSBbXTtcblxuICBoZWFkZXI6c3RyaW5nW10gPSBbXTtcblxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cblxuICBhZGRSb3coaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3JpZFJvd0NvbXBvbmVudCk7XG4gICAgbGV0IGNHcmlkUm93ID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBjR3JpZFJvdy5pbnN0YW5jZS5zZXRHcmlkQ29tcG9uZW50KHRoaXMpO1xuICAgIGNHcmlkUm93Lmluc3RhbmNlLnNldERhdGEodGhpcy5lbGVtLCB0aGlzLmNvbnRleHQsIHRoaXMuZW50cmllcy5sZW5ndGgpO1xuICAgIHRoaXMuZW50cmllcy5wdXNoKGNHcmlkUm93KTtcblxuICAgIGxldCBvYmplY3QgPSBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLmVsZW0uZ2V0QmluZGluZygpLnRhcmdldFJlZi5nZXRDbGFzcygpLCBbXSk7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIGlmICh0aGlzLmVsZW0uZ2V0QmluZGluZygpLmlzQ29sbGVjdGlvbigpKSB7XG4gICAgICBsZXQgYXJyYXlTZXR0ZWQgPSBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICAgICAgaWYgKCFhcnJheVNldHRlZCkge1xuICAgICAgICBhcnJheVNldHRlZCA9IFtdO1xuICAgICAgfVxuICAgICAgYXJyYXlTZXR0ZWRbY0dyaWRSb3cuaW5zdGFuY2UuY29udGV4dC5pZHhdID0gb2JqZWN0O1xuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgb2JqZWN0KTtcbiAgICB9XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuYnVpbGQodGhpcy5lbGVtKTtcbiAgICByZXR1cm4gY0dyaWRSb3cuaW5zdGFuY2U7XG4gIH1cblxuXG4gIHJlbW92ZVJvdyhpZHg6IG51bWJlcikge1xuICAgIC8vIFRPRE8gY2hlY2sgaWYgZXhpc3RzXG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuXG4gICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLmVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHMuc2hpZnQoKTtcblxuICAgIHRoaXMudmMucmVtb3ZlKGlkeCk7XG4gICAgaWYgKHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCkpIHtcbiAgICAgIGxldCBhcnJheVNldHRlZCA9IF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgICBpZiAoIWFycmF5U2V0dGVkKSB7XG4gICAgICAgIGFycmF5U2V0dGVkID0gW107XG4gICAgICB9XG4gICAgICBhcnJheVNldHRlZC5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5lbnRyaWVzW2ldLmluc3RhbmNlLmNvbnRleHQuaWR4ID0gaTtcbiAgICB9XG4gICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCk6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdIHtcbiAgICB0aGlzLmNvbnRleHQubGFiZWxEaXNwbGF5ID0gJ25vbmUnO1xuXG5cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgaWYoaXNGb3JtT2JqZWN0KG9iaikpe1xuICAgICAgICB0aGlzLmhlYWRlci5wdXNoKG9iai5sYWJlbCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGxldCBkYXRhRW50cmllcyA9IHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSk7XG5cbiAgICBsZXQgYyA9IHRoaXMuYWRkUm93KCk7XG4gICAgcmV0dXJuIFtjXTtcbiAgfVxuXG59XG4iLCJcbi8vIHRvIGludGVncmF0ZSB0aGUgZWxlbWVudHNcbmltcG9ydCB7Rk9STV9FTEVNRU5UU30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5GT1JNX0VMRU1FTlRTO1xuXG5pbXBvcnQge0Zvcm1Db21wb25lbnR9IGZyb20gJy4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb0NvbXBvbmVudH0gZnJvbSAnLi9yYWRpby5jb21wb25lbnQnO1xuaW1wb3J0IHtTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQge0dyaWRDb21wb25lbnR9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtHcmlkUm93Q29tcG9uZW50fSBmcm9tICcuL2dyaWQtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge0dyaWRDZWxsQ29tcG9uZW50fSBmcm9tICcuL2dyaWQtY2VsbC5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjb25zdCBYRk9STUNPTVBPTkVOVCA9IFtcbiAgRm9ybUNvbXBvbmVudCxcbiAgSW5wdXRDb21wb25lbnQsXG4gIENoZWNrYm94Q29tcG9uZW50LFxuICBSYWRpb0NvbXBvbmVudCxcbiAgU2VsZWN0Q29tcG9uZW50LFxuICBHcmlkQ29tcG9uZW50LFxuICBHcmlkUm93Q29tcG9uZW50LFxuICBHcmlkQ2VsbENvbXBvbmVudFxuXVxuXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1hGT1JNQ09NUE9ORU5UfSBmcm9tICcuL3hmb3Jtcy5lbGVtZW50cyc7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBYRk9STUNPTVBPTkVOVCxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBYRk9STUNPTVBPTkVOVCxcbiAgZXhwb3J0czogWEZPUk1DT01QT05FTlQsXG4gIHByb3ZpZGVyczogW1xuICAgIEZvcm1TZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgeEZvcm1zTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZU9iamVjdH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvVHJlZU9iamVjdCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudCc7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZpZXctYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy8gb3V0cHV0czogWyduZ1N1Ym1pdCddLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3QnVpbGRlckNvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBfYnVpbGQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgX2luc3RhbmNlOiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IHZhbHVlO1xuICAgIHRoaXMuX2J1aWxkID0gZmFsc2U7XG4gICAgdGhpcy5fX2J1aWxkKCk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9fYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19idWlsZCgpe1xuICAgIGlmKCF0aGlzLl9idWlsZCl7XG4gICAgICB0aGlzLnZjLmNsZWFyKCk7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlKHRoaXMuX2luc3RhbmNlKTtcbiAgICAgIHRoaXMuX2J1aWxkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtWaWV3QnVpbGRlckNvbXBvbmVudH0gZnJvbSAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtWaWV3QnVpbGRlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW10sXG4gIGV4cG9ydHM6IFtWaWV3QnVpbGRlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgeFZpZXdzTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJfLmZpbHRlciIsIl8uY2FwaXRhbGl6ZSIsIl8uZmluZCIsIl8uY2xvbmUiLCJJbnB1dCIsIl8ucmVtb3ZlIiwiXy5pc1N0cmluZyIsIl8uaXNBcnJheSIsIl8uaXNFbXB0eSIsIl8uZmlyc3QiLCJfLmlzRnVuY3Rpb24iLCJfLmhhcyIsIl8uZ2V0IiwiXy5zZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Q0FHQzs7Ozs7O0FDSEQ7Ozs7SUFhRSxZQUFZLE1BQWM7c0JBRkwsRUFBRTtRQUlyQixLQUFLLHFCQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQy9CLHFCQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksU0FBTSxDQUFDO1lBQy9CLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6Qjs7S0FFRjs7O1lBakJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsV0FBVyxFQUFFLDRCQUE0QjthQUMxQzs7OztZQVBPLE1BQU07Ozs7Ozs7QUNEZDs7O1lBTUMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNsQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUMsWUFBWSxDQUFDO2dCQUNyQyxPQUFPLEVBQUMsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDNUIsU0FBUyxFQUFFLEVBQUU7YUFDZDs7Ozs7Ozs7Ozs7O0FDUEQ7Ozs7OztJQVlFLFlBQVksS0FBYSxFQUFFLE1BQWtCLEVBQUUsUUFBZ0I7b0JBUnRDLEVBQUU7d0JBRUEsSUFBSTt3QkFFSixJQUFJO3NCQUVGLElBQUk7UUFHL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxD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