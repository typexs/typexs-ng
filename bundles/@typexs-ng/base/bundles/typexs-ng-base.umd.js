(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/platform-browser'), require('lodash'), require('typexs-schema/libs/PropertyDef'), require('typexs-base/libs/exceptions/NotYetImplementedError'), require('typexs-schema/libs/EntityDef'), require('typexs-schema/libs/Registry'), require('typexs-schema/libs/DataContainer'), require('rxjs/Observable'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@typexs-ng/base', ['exports', '@angular/core', '@angular/router', '@angular/platform-browser', 'lodash', 'typexs-schema/libs/PropertyDef', 'typexs-base/libs/exceptions/NotYetImplementedError', 'typexs-schema/libs/EntityDef', 'typexs-schema/libs/Registry', 'typexs-schema/libs/DataContainer', 'rxjs/Observable', '@angular/forms'], factory) :
    (factory((global['typexs-ng'] = global['typexs-ng'] || {}, global['typexs-ng'].base = {}),global.ng.core,global.ng.router,global.ng.platformBrowser,global._,global.PropertyDef,global.NotYetImplementedError,global.EntityDef,global.Registry,global.DataContainer,global.rxjs.Observable,global.ng.forms));
}(this, (function (exports,core,router,platformBrowser,_,PropertyDef,NotYetImplementedError,EntityDef,Registry,DataContainer,Observable,forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _$$1 = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_$$1)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [0, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _$$1.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _$$1.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _$$1.ops.pop();
                            _$$1.trys.pop();
                            continue;
                        default:
                            if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _$$1 = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _$$1.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _$$1.label < t[1]) {
                                _$$1.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _$$1.label < t[2]) {
                                _$$1.label = t[2];
                                _$$1.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _$$1.ops.pop();
                            _$$1.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _$$1);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

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
        function NavigatorComponent(router$$1) {
            this.routes = [];
            try {
                for (var _a = __values(router$$1.config), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var route = _b.value;
                    var /** @type {?} */ entry = new NavEntry();
                    entry.label = route.data["label"];
                    entry.path = route.path;
                    this.routes.push(entry);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            // console.log(this.routes)
            var e_1, _c;
        }
        NavigatorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nav-root',
                        templateUrl: './navigator.component.html',
                    },] },
        ];
        /** @nocollapse */
        NavigatorComponent.ctorParameters = function () {
            return [
                { type: router.Router, },
            ];
        };
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
            { type: core.NgModule, args: [{
                        declarations: [NavigatorComponent],
                        imports: [platformBrowser.BrowserModule, router.RouterModule],
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
     */ TreeObject = /** @class */ (function () {
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
     */ FormObject = /** @class */ (function (_super) {
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
                if (this.getBinding() instanceof PropertyDef.PropertyDef) {
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
                return _.filter(arr, function (x) { return x.trim() != ''; }).join('.');
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
                var /** @type {?} */ methodName = 'handle' + _.capitalize(key);
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
                var /** @type {?} */ exists = _.find(this.formHandler, { type: typeName });
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
                return _.find(this.formHandler, { type: typeName });
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
                    var /** @type {?} */ e_1 = _.clone(elem);
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
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        function Input() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.variant = 'text';
            return _this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        Input.prototype.handleVariant = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.variant = value;
            };
        Input = __decorate([
            ViewContent('input')
        ], Input);
        return Input;
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
                    var /** @type {?} */ ret = _.find(/** @type {?} */ (tmpElem.getChildren()), { name: _p });
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
    }(Input));

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
    }(Input));

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
                this.schema = Registry.Registry.getSchema('default');
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
                if (parent === void 0) {
                    parent = null;
                }
                var /** @type {?} */ formObject = null;
                if (!this.form) {
                    this.schema = Registry.Registry.getSchema(entity.schemaName);
                    this.form = formObject = ContentComponentRegistry.createHandler('form');
                    formObject.handle('name', entity.id());
                    formObject.handle('binding', entity);
                }
                else if (entity instanceof PropertyDef.PropertyDef) {
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
                if (formObject != null) {
                    formObject.setParent(parent);
                }
                else {
                    // if formObject no created but parent is passed then use it as formobject further (grid <- add furter elements)
                    formObject = parent;
                }
                if (entity instanceof EntityDef.EntityDef) {
                    var /** @type {?} */ properties = entity.getPropertyDefs();
                    try {
                        for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                            var property = properties_1_1.value;
                            var /** @type {?} */ childObject = this._buildFormObject(property, formObject);
                            formObject.insert(childObject);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return))
                                _a.call(properties_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                else if (entity instanceof PropertyDef.PropertyDef) {
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
                            catch (e_2_1) {
                                e_2 = { error: e_2_1 };
                            }
                            finally {
                                try {
                                    if (properties_2_1 && !properties_2_1.done && (_b = properties_2.return))
                                        _b.call(properties_2);
                                }
                                finally {
                                    if (e_2)
                                        throw e_2.error;
                                }
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
                if (parent === void 0) {
                    parent = null;
                }
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
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return))
                            _a.call(keys_1);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                if (data.children) {
                    var /** @type {?} */ value = data.children;
                    if (_.isArray(value)) {
                        try {
                            for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                                var entry = value_1_1.value;
                                var /** @type {?} */ childObject = this._buildForm(entry, formObject);
                                formObject.insert(childObject);
                            }
                        }
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (value_1_1 && !value_1_1.done && (_b = value_1.return))
                                    _b.call(value_1);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
                            }
                        }
                    }
                    else {
                        throw new NotYetImplementedError.NotYetImplementedError();
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
                var /** @type {?} */ entityDef = Registry.Registry.getEntityDefFor(instance);
                var /** @type {?} */ builder2 = new FormBuilder();
                return builder2.buildFromEntity(entityDef);
            };
        FormService.decorators = [
            { type: core.Injectable },
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
                                    if (!_.isEmpty(v)) {
                                        if (_.isArray(v) && v.length === 1) {
                                            var /** @type {?} */ propDecorator_1 = _.first(v);
                                            if (_.isFunction(propDecorator_1.selector)) {
                                                if (propDecorator_1.first) {
                                                    // simple ViewChild
                                                    // simple ViewChild
                                                    instance_1[key] = _.find(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                                    instance_1[key + '2'] = _.find(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                                }
                                                else {
                                                    // simple ViewChildren
                                                    // simple ViewChildren
                                                    instance_1[key] = _.filter(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                                    instance_1[key + '2'] = _.filter(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
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
        AbstractComponent.ctorParameters = function () {
            return [
                { type: core.Injector, decorators: [{ type: core.Inject, args: [core.Injector,] },] },
                { type: core.ComponentFactoryResolver, decorators: [{ type: core.Inject, args: [core.ComponentFactoryResolver,] },] },
            ];
        };
        AbstractComponent.propDecorators = {
            "vc": [{ type: core.ViewChild, args: ['content', { read: core.ViewContainerRef },] },],
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
                if (_name === void 0) {
                    _name = null;
                }
                if (idx === void 0) {
                    idx = -1;
                }
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
                return _.filter(arr, function (x) { return !_.isEmpty(x); }).join('.');
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
                if (_default === void 0) {
                    _default = null;
                }
                if (_.has(this, key)) {
                    return _.get(this, key, _default);
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
             */ function () {
                return this.elem.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractFormComponent.prototype, "name", {
            get: /**
             * @return {?}
             */ function () {
                return this.elem.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractFormComponent.prototype, "label", {
            get: /**
             * @return {?}
             */ function () {
                return this.elem.label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractFormComponent.prototype, "labelDisplay", {
            get: /**
             * @return {?}
             */ function () {
                return this.context.get('labelDisplay', 'top');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractFormComponent.prototype, "help", {
            get: /**
             * @return {?}
             */ function () {
                return this.elem.help;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractFormComponent.prototype, "isReadOnly", {
            get: /**
             * @return {?}
             */ function () {
                return this.elem.readonly;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractFormComponent.prototype, "isValid", {
            get: /**
             * @return {?}
             */ function () {
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
                if (idx === void 0) {
                    idx = -1;
                }
                this.setFormObject(elem);
                if (parent) {
                    this.context = parent.child(elem.name, idx);
                }
                else {
                    this.context = new Context();
                    if (elem.getBinding() instanceof PropertyDef.PropertyDef) {
                        this.context.name = elem.name;
                        this.context.idx = idx;
                    }
                }
            };
        Object.defineProperty(AbstractFormComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                var /** @type {?} */ path = this.context.path();
                return _.get(this.data.instance, path, null);
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                var /** @type {?} */ path = this.context.path();
                _.set(this.data.instance, path, v);
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
            _this.ngSubmit = new core.EventEmitter();
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
                this.data = new DataContainer.DataContainer(this.instance);
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
            { type: core.Component, args: [{
                        selector: 'xform',
                        templateUrl: './form.component.html',
                    },] },
        ];
        /** @nocollapse */
        FormComponent.ctorParameters = function () {
            return [
                { type: FormService, decorators: [{ type: core.Inject, args: [FormService,] },] },
                { type: core.Injector, decorators: [{ type: core.Inject, args: [core.Injector,] },] },
                { type: core.ComponentFactoryResolver, decorators: [{ type: core.Inject, args: [core.ComponentFactoryResolver,] },] },
            ];
        };
        FormComponent.propDecorators = {
            "ngSubmit": [{ type: core.Output },],
            "formName": [{ type: core.Input },],
            "instance": [{ type: core.Input },],
        };
        FormComponent = __decorate([
            ViewComponent('form'),
            __metadata("design:paramtypes", [FormService,
                core.Injector,
                core.ComponentFactoryResolver])
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
             */ function () {
                return this.elem.variant;
            },
            enumerable: true,
            configurable: true
        });
        InputComponent.decorators = [
            { type: core.Component, args: [{
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
             */ function () {
                return this.elem.variant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
            get: /**
             * @return {?}
             */ function () {
                return this.data.instance[this.name];
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
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
             */ function () {
                return this.elem.variant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioComponent.prototype, "isChecked", {
            get: /**
             * @return {?}
             */ function () {
                return this.data.instance[this.name];
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
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
             */ function () {
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
                    if (enums instanceof Observable.Observable) {
                        enums.subscribe(function (e) {
                            var /** @type {?} */ o = new Option();
                            if (_.isString(e)) {
                                o.label = o.value = e;
                            }
                            else if (_.has(e, 'label') || _.has(e, 'value')) {
                                o.label = _.get(e, 'label', _.get(e, 'value'));
                                o.value = _.get(e, 'value', _.get(e, 'label'));
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
                            if (_.isString(e)) {
                                o.label = o.value = e;
                            }
                            else if (_.has(e, 'label') || _.has(e, 'value')) {
                                o.label = _.get(e, 'label', _.get(e, 'value'));
                                o.value = _.get(e, 'value', _.get(e, 'label'));
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
                if (_.isArray(this.elem.enum)) {
                    return this.elem.enum;
                }
                else if (_.isFunction(this.elem.enum)) {
                    return this.injector.get(this.elem.enum).get(this.name);
                }
                else if (_.isString(this.elem.enum)) {
                    // check if an entry with the propertyname exists
                    var /** @type {?} */ lookupPath = [];
                    if (this.context.parent) {
                        lookupPath.push(this.context.parent.path());
                    }
                    lookupPath.push(this.elem.enum);
                    lookupPath = ( /** @type {?} */(lookupPath)).join('.');
                    if (_.has(this.data.instance, lookupPath)) {
                        // TODO observe if property is changed, if it does then reset enum
                        return _.get(this.data.instance, lookupPath, []);
                    }
                    else {
                        throw new Error('not found enum reference');
                    }
                }
                return [];
            };
        SelectComponent.decorators = [
            { type: core.Component, args: [{
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
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'xgridcell',
                        templateUrl: './grid-cell.component.html',
                    },] },
        ];
        /** @nocollapse */
        GridCellComponent.propDecorators = {
            "hostClasses": [{ type: core.HostBinding, args: ['class',] },],
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
             */ function () {
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
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'xgridrow',
                        templateUrl: './grid-row.component.html',
                    },] },
        ];
        /** @nocollapse */
        GridRowComponent.propDecorators = {
            "hostClasses": [{ type: core.HostBinding, args: ['class',] },],
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
                if (index === void 0) {
                    index = -1;
                }
                var /** @type {?} */ factory = this.r.resolveComponentFactory(GridRowComponent);
                var /** @type {?} */ cGridRow = this.vc.createComponent(factory);
                cGridRow.instance.data = this.data;
                cGridRow.instance.setGridComponent(this);
                cGridRow.instance.setData(this.elem, this.context, this.entries.length);
                this.entries.push(cGridRow);
                var /** @type {?} */ object = Reflect.construct(this.elem.getBinding().targetRef.getClass(), []);
                var /** @type {?} */ path = this.context.path();
                if (this.elem.getBinding().isCollection()) {
                    var /** @type {?} */ arraySetted = _.get(this.data.instance, path, null);
                    if (!arraySetted) {
                        arraySetted = [];
                    }
                    arraySetted[cGridRow.instance.context.idx] = object;
                    _.set(this.data.instance, path, arraySetted);
                }
                else {
                    _.set(this.data.instance, path, object);
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
                    var /** @type {?} */ arraySetted = _.get(this.data.instance, path, null);
                    if (!arraySetted) {
                        arraySetted = [];
                    }
                    arraySetted.splice(idx, 1);
                    _.set(this.data.instance, path, arraySetted);
                }
                else {
                    _.set(this.data.instance, path, null);
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
            { type: core.Component, args: [{
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
            { type: core.NgModule, args: [{
                        declarations: XFORMCOMPONENT,
                        imports: [
                            forms.FormsModule,
                            platformBrowser.BrowserModule
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
             */ function () {
                return this._instance;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'view-builder',
                        templateUrl: './view-builder.component.html',
                    },] },
        ];
        /** @nocollapse */
        ViewBuilderComponent.propDecorators = {
            "instance": [{ type: core.Input },],
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
            { type: core.NgModule, args: [{
                        declarations: [ViewBuilderComponent],
                        imports: [
                            platformBrowser.BrowserModule
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

    exports.NavigatorModule = NavigatorModule;
    exports.xFormsModule = xFormsModule;
    exports.xViewsModule = xViewsModule;
    exports.ɵd = AbstractFormComponent;
    exports.ɵe = AbstractComponent;
    exports.ɵf = ViewComponent;
    exports.ɵa = NavigatorComponent;
    exports.ɵi = CheckboxComponent;
    exports.ɵc = FormComponent;
    exports.ɵg = FormService;
    exports.ɵn = GridCellComponent;
    exports.ɵm = GridRowComponent;
    exports.ɵl = GridComponent;
    exports.ɵh = InputComponent;
    exports.ɵj = RadioComponent;
    exports.ɵk = SelectComponent;
    exports.ɵb = XFORMCOMPONENT;
    exports.ɵo = ViewBuilderComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXhzLW5nLWJhc2UudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMvbmF2aWdhdG9yL05hdkVudHJ5LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy9uYXZpZ2F0b3IvbmF2aWdhdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMvbmF2aWdhdG9yL25hdmlnYXRvci5tb2R1bGUudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9SZXNvbHZlRGF0YVZhbHVlLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c3ZpZXcvVHJlZU9iamVjdC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3IudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzdmlldy9Db250ZW50Q29tcG9uZW50UmVnaXN0cnkudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvVGFicy50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL1RhYi50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL1JlZi50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL0lucHV0LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvRm9ybS50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL2VsZW1lbnRzL0NoZWNrYm94LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c2Zvcm0vZWxlbWVudHMvUmFkaW8udHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9TZWxlY3QudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9lbGVtZW50cy9HcmlkLnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy9leGNlcHRpb25zL05vRm9ybVR5cGVEZWZpbmVkRXJyb3IudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9saWJzL3hzZm9ybS9Gb3JtQnVpbGRlci50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2Zvcm0uc2VydmljZS50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHN2aWV3L0Fic3RyYWN0Q29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbGlicy94c3ZpZXcvQ29udGV4dC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2Zvcm0uY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vcmFkaW8uY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c2Zvcm0vc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL2dyaWQtY2VsbC5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9ncmlkLXJvdy5jb21wb25lbnQudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzZm9ybS9ncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL3hmb3Jtcy5lbGVtZW50cy50cyIsIm5nOi8vQHR5cGV4cy1uZy9iYXNlL21vZHVsZXMveHNmb3JtL3hmb3Jtcy5tb2R1bGUudHMiLCJuZzovL0B0eXBleHMtbmcvYmFzZS9tb2R1bGVzL3hzdmlldy92aWV3LWJ1aWxkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvbW9kdWxlcy94c3ZpZXcveHZpZXdzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE5hdkVudHJ5IHtcbiAgcGF0aDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtOYXZFbnRyeX0gZnJvbSBcIi4vTmF2RW50cnlcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmF2LXJvb3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yQ29tcG9uZW50IHtcblxuICByb3V0ZXM6IE5hdkVudHJ5W10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XG5cbiAgICBmb3IgKGxldCByb3V0ZSBvZiByb3V0ZXIuY29uZmlnKSB7XG4gICAgICBsZXQgZW50cnkgPSBuZXcgTmF2RW50cnkoKTtcbiAgICAgIGVudHJ5LmxhYmVsID0gcm91dGUuZGF0YS5sYWJlbDtcbiAgICAgIGVudHJ5LnBhdGggPSByb3V0ZS5wYXRoO1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaChlbnRyeSk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGVzKVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge05hdmlnYXRvckNvbXBvbmVudH0gZnJvbSBcIi4vbmF2aWdhdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOYXZpZ2F0b3JDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSxSb3V0ZXJNb2R1bGVdLFxuICBleHBvcnRzOltOYXZpZ2F0b3JDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvck1vZHVsZSB7XG5cblxuXG5cbn1cbiIsImltcG9ydCB7Rm9ybU9iamVjdH0gZnJvbSAnLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9lbGVtZW50cy9Gb3JtJztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuL0lSZXNvbHZlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlRGF0YVZhbHVlIGltcGxlbWVudHMgSVJlc29sdmVyIHtcblxuICBwcml2YXRlIG9yZ1ZhbHVlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBwYXRoOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmV0Y2hLZXk6IHN0cmluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcm9wZXJ0eTogc3RyaW5nID0gbnVsbDtcblxuICBwcml2YXRlIG9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgb2JqZWN0OiBGb3JtT2JqZWN0LCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMub3JnVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eXFwkLywgJycpO1xuICAgIHRoaXMucGF0aCA9IHRoaXMub3JnVmFsdWUuc3BsaXQoJy4nKTtcbiAgICB0aGlzLmZldGNoS2V5ID0gdGhpcy5wYXRoLnBvcCgpO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9yZ1ZhbHVlO1xuICB9XG5cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMucGF0aC5qb2luKCcuJykpO1xuICAgIGlmIChlbGVtKSB7XG4gICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IGVsZW1bdGhpcy5mZXRjaEtleV07XG4gICAgICByZXR1cm4gZWxlbVt0aGlzLmZldGNoS2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW50IHJlc29sdmUgZGF0YScpO1xuICAgIH1cblxuICB9XG5cbn1cblxuIiwiaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmVlT2JqZWN0IHtcblxuICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogQ29udGV4dDtcblxuICBpbmRleDogbnVtYmVyO1xuXG4gIHBhcmVudDogVHJlZU9iamVjdCA9IG51bGw7XG5cbiAgY2hpbGRyZW46IFRyZWVPYmplY3RbXSA9IFtdO1xuXG4gIGluc2VydChvYmplY3Q6IFRyZWVPYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcbiAgICBvYmplY3QuaW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIGdldFBhcmVudCgpOiBUcmVlT2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICBzZXRQYXJlbnQocGFyZW50OiBUcmVlT2JqZWN0KSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4uL3hzdmlldy9UcmVlT2JqZWN0JztcblxuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtT2JqZWN0KG9iajogVHJlZU9iamVjdCB8IEZvcm1PYmplY3QpOiBvYmogaXMgRm9ybU9iamVjdCB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBGb3JtT2JqZWN0O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybU9iamVjdCBleHRlbmRzIFRyZWVPYmplY3Qge1xuXG4gIGlkOiBzdHJpbmc7XG5cbiAgdXNlZEtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgaGVscDogc3RyaW5nO1xuXG4gIHJlYWRvbmx5OiBmYWxzZTtcblxuICBwcml2YXRlIGJpbmRpbmc6IFByb3BlcnR5RGVmID0gbnVsbDtcblxuXG4gIGdldEJpbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZGluZztcbiAgfVxuXG5cblxuICBnZXRVc2VkS2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy51c2VkS2V5cztcbiAgfVxuXG5cblxuICBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgaWYgKHRoaXMuZ2V0QmluZGluZygpIGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIGlmICh0aGlzLmdldFBhcmVudCgpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmKGlzRm9ybU9iamVjdChwYXJlbnQpKXtcbiAgICAgICAgICBhcnIucHVzaChwYXJlbnQuZ2V0UGF0aCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAvLyAgdGhyb3cgbmV3IEVycm9yKCdwYXJlbnQgaXMgbm90IGEgZm9ybSBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLnB1c2godGhpcy5uYW1lKTtcbiAgICAgIGlmICh0aGlzLmdldEJpbmRpbmcoKS5pc0NvbGxlY3Rpb24oKSkge1xuICAgICAgICBhcnIucHVzaCgnJGlkeCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiB4LnRyaW0oKSAhPSAnJykuam9pbignLicpO1xuICB9XG5cblxuICBnZXRGb3JtKCk6IEZvcm1PYmplY3Qge1xuICAgIGlmICh0aGlzLnBhcmVudCAmJiBpc0Zvcm1PYmplY3QodGhpcy5wYXJlbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0Rm9ybSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09ICdmb3JtJykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3IgdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgIGxldCBmb3JtID0gdGhpcy5nZXRGb3JtKCk7IC8vXG4gICAgICBmb3JtWydyZXNvbHZlciddLnB1c2godmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMudXNlZEtleXMucHVzaChrZXkpO1xuICAgIGxldCBtZXRob2ROYW1lID0gJ2hhbmRsZScgKyBfLmNhcGl0YWxpemUoa2V5KTtcbiAgICBpZiAodGhpc1ttZXRob2ROYW1lXSkge1xuICAgICAgdGhpc1ttZXRob2ROYW1lXSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEb24ndCBvdmVycmlkZSB0eXBlXG4gICAqL1xuICBoYW5kbGVUeXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgfVxuXG5cbiAgcG9zdFByb2Nlc3MoKSB7XG4gIH1cblxuXG4gIHJlcGxhY2Uoc29tZU9iamVjdDogRm9ybU9iamVjdCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgIGxldCBpZHggPSBwYXJlbnQuZ2V0Q2hpbGRyZW4oKS5pbmRleE9mKHRoaXMpO1xuICAgIGlmIChpZHggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgZmluZCBpbmRleCwgc29tZXRoaW5nIGlzIHdyb25nJyk7XG4gICAgfVxuICAgIHBhcmVudC5nZXRDaGlsZHJlbigpW2lkeF0gPSBzb21lT2JqZWN0O1xuICAgIHNvbWVPYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgcmV0dXJuIHNvbWVPYmplY3Q7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IodHlwZU5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHR5cGVOYW1lICsgJyBub3QgZGVmaW5lZCcpO1xuICB9XG59XG4iLCJpbXBvcnQge05vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yfSBmcm9tICcuLy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcic7XG5pbXBvcnQge0lFbGVtZW50RGVmfSBmcm9tICcuL0lFbGVtZW50RGVmJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHN0YXRpYyAkc2VsZjogQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5ID0gbnVsbDtcblxuICBwcml2YXRlIGZvcm1IYW5kbGVyOiBJRWxlbWVudERlZltdID0gW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHN0YXRpYyAkKCk6IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSB7XG4gICAgaWYgKCF0aGlzLiRzZWxmKSB7XG4gICAgICB0aGlzLiRzZWxmID0gbmV3IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kc2VsZjtcbiAgfVxuXG4gIGdldE9yQ3JlYXRlRGVmKHR5cGVOYW1lOiBzdHJpbmcpOiBJRWxlbWVudERlZiB7XG4gICAgbGV0IGV4aXN0cyA9IF8uZmluZCh0aGlzLmZvcm1IYW5kbGVyLCB7dHlwZTogdHlwZU5hbWV9KTtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgZXhpc3RzID0ge3R5cGU6IHR5cGVOYW1lfTtcbiAgICAgIHRoaXMuZm9ybUhhbmRsZXIucHVzaChleGlzdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZXhpc3RzO1xuICB9XG5cbiAgZ2V0RGVmKHR5cGVOYW1lOiBzdHJpbmcpOiBJRWxlbWVudERlZiB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLmZvcm1IYW5kbGVyLCB7dHlwZTogdHlwZU5hbWV9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRIYW5kbGVyKHR5cGVOYW1lOiBzdHJpbmcsIGtsYXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBkZWYgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgZGVmLmhhbmRsZXIgPSBrbGFzcztcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cblxuICBzdGF0aWMgYWRkQ29tcG9uZW50KHR5cGVOYW1lOiBzdHJpbmcsIGtsYXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBkZWYgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgZGVmLmNvbXBvbmVudCA9IGtsYXNzO1xuICAgIHJldHVybiBkZWY7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlSGFuZGxlcih0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgaWYgKCFoYW5kbGVyIHx8ICFoYW5kbGVyLmhhbmRsZXIpIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcih0eXBlTmFtZSk7XG4gICAgfVxuICAgIGxldCBvYmogPSBSZWZsZWN0LmNvbnN0cnVjdChoYW5kbGVyLmhhbmRsZXIsIFtdKTtcbiAgICBvYmoudHlwZSA9IHR5cGVOYW1lO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlQ29tcG9uZW50KHR5cGVOYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgaGFuZGxlciA9IHRoaXMuJCgpLmdldE9yQ3JlYXRlRGVmKHR5cGVOYW1lKTtcbiAgICBpZiAoIWhhbmRsZXIgfHwgIWhhbmRsZXIuY29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3IodHlwZU5hbWUpO1xuICAgIH1cbiAgICBsZXQgb2JqID0gUmVmbGVjdC5jb25zdHJ1Y3QoaGFuZGxlci5jb21wb25lbnQsIFtdKTtcbiAgICBvYmoudHlwZSA9IHR5cGVOYW1lO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxufVxuXG4iLCJpbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVmlld0NvbnRlbnQodHlwZU5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iamVjdDogRnVuY3Rpb24pIHtcbiAgICBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuYWRkSGFuZGxlcih0eXBlTmFtZSwgb2JqZWN0KTtcbiAgfTtcbn1cbiIsIlxuaW1wb3J0IHtGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcblxuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3RhYnMnKVxuZXhwb3J0IGNsYXNzIFRhYnMgZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxufVxuIiwiXG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3RhYicpXG5leHBvcnQgY2xhc3MgVGFiIGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbn1cbiIsImltcG9ydCB7Rm9ybU9iamVjdCwgaXNGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuLi9JUmVzb2x2ZXInO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL0Zvcm0nO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuQFZpZXdDb250ZW50KCdyZWYnKVxuZXhwb3J0IGNsYXNzIFJlZiBleHRlbmRzIEZvcm1PYmplY3QgaW1wbGVtZW50cyBJUmVzb2x2ZXIge1xuXG4gIHVzZTogc3RyaW5nO1xuXG4gIHBvc3RQcm9jZXNzKCkge1xuICAgIHRoaXMuZ2V0Rm9ybSgpWydyZXNvbHZlciddLnB1c2godGhpcyk7XG4gIH1cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMudXNlKTtcbiAgICBpZihpc0Zvcm1PYmplY3QoZWxlbSkpe1xuICAgICAgbGV0IGUgPSBfLmNsb25lKGVsZW0pO1xuICAgICAgdGhpcy5yZXBsYWNlKGUpO1xuXG4gICAgICAvLyBjb3B5IHByb3BlcnRpZXNcbiAgICAgIHRoaXMuZ2V0VXNlZEtleXMoKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBlLmhhbmRsZShrLCB0aGlzW2tdKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG5cblxuIiwiXG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2lucHV0JylcbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIEZvcm1PYmplY3Qge1xuXG4gIHZhcmlhbnQ6IHN0cmluZyA9ICd0ZXh0JztcblxuXG4gIGhhbmRsZVZhcmlhbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFyaWFudCA9IHZhbHVlO1xuICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtJUmVzb2x2ZXJ9IGZyb20gJy4uL0lSZXNvbHZlcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtSZXNvbHZlRGF0YVZhbHVlfSBmcm9tICcuLi9SZXNvbHZlRGF0YVZhbHVlJztcbmltcG9ydCB7UmVmfSBmcm9tICcuL1JlZic7XG5cbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuXG5AVmlld0NvbnRlbnQoJ2Zvcm0nKVxuZXhwb3J0IGNsYXNzIEZvcm0gZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuICBkYXRhQ29udGFpbmVyOiBhbnk7XG5cbiAgcmVzb2x2ZXI6IElSZXNvbHZlcltdID0gW107XG5cbiAgY29tYmluZShvdGhlckZvcm06IEZvcm0pIHtcbiAgICBsZXQgcmVzb2x2ZXJDYWNoZTogSVJlc29sdmVyW10gPSBbXTtcblxuICAgIHdoaWxlICh0aGlzLnJlc29sdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCByZXNvbHZlciA9IHRoaXMucmVzb2x2ZXIuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZXIucmVzb2x2ZShvdGhlckZvcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZXJDYWNoZS5wdXNoKHJlc29sdmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAocmVzb2x2ZXJDYWNoZS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGxldCByZXNvbHZlciA9IHJlc29sdmVyQ2FjaGUuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlZikge1xuICAgICAgICByZXNvbHZlci5yZXNvbHZlKG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IF9wYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCB0bXBFbGVtOiBGb3JtT2JqZWN0ID0gdGhpcztcbiAgICBsZXQgZWxlbWVudCA9IG51bGw7XG4gICAgd2hpbGUgKF9wYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBfcCA9IF9wYXRoLnNoaWZ0KCk7XG4gICAgICBsZXQgcmV0ID0gXy5maW5kKDxGb3JtT2JqZWN0W10+dG1wRWxlbS5nZXRDaGlsZHJlbigpLCB7bmFtZTogX3B9KTtcbiAgICAgIC8vaWYoaXNGb3JtT2JqZWN0KHJldCkpe1xuICAgICAgdG1wRWxlbSA9IHJldDtcbiAgICAgIGlmICghdG1wRWxlbSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSB0bXBFbGVtO1xuICAgICAgfVxuICAgICAgLy99XG4gICAgfVxuICAgIHJldHVybiBfcGF0aC5sZW5ndGggPT0gMCAmJiBlbGVtZW50ID8gZWxlbWVudCA6IG51bGw7XG5cbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7SW5wdXR9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2NoZWNrYm94JylcbmV4cG9ydCBjbGFzcyBDaGVja2JveCBleHRlbmRzIElucHV0IHtcblxuXG59XG4iLCJcbmltcG9ydCB7SW5wdXR9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3JhZGlvJylcbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIElucHV0IHtcblxuXG59XG4iLCJpbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ3NlbGVjdCcpXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbiAgZW51bTogYW55O1xuXG59XG4iLCJpbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5AVmlld0NvbnRlbnQoJ2dyaWQnKVxuZXhwb3J0IGNsYXNzIEdyaWQgZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuXG5cbn1cbiIsImV4cG9ydCBjbGFzcyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuIiwiaW1wb3J0IHtOb3RZZXRJbXBsZW1lbnRlZEVycm9yfSBmcm9tICd0eXBleHMtYmFzZS9saWJzL2V4Y2VwdGlvbnMvTm90WWV0SW1wbGVtZW50ZWRFcnJvcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZWxlbWVudHMnO1xuXG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge0VudGl0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL0VudGl0eURlZic7XG5pbXBvcnQge1Byb3BlcnR5RGVmfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvUHJvcGVydHlEZWYnO1xuaW1wb3J0IHtTY2hlbWFEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9TY2hlbWFEZWYnO1xuaW1wb3J0IHtSZWdpc3RyeX0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1JlZ2lzdHJ5JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4veHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuZXhwb3J0IGNsYXNzIEZvcm1CdWlsZGVyIHtcblxuICBwcml2YXRlIGRhdGE6IGFueTtcblxuICBwcml2YXRlIGZvcm06IEZvcm1PYmplY3Q7XG5cbiAgcHJpdmF0ZSBzY2hlbWE6IFNjaGVtYURlZjtcblxuICBidWlsZEZyb21KU09OKGRhdGE6IGFueSk6IEZvcm0ge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zY2hlbWEgPSBSZWdpc3RyeS5nZXRTY2hlbWEoJ2RlZmF1bHQnKTtcbiAgICByZXR1cm4gPEZvcm0+dGhpcy5fYnVpbGRGb3JtKGRhdGEpO1xuICB9XG5cbiAgYnVpbGRGcm9tRW50aXR5KGVudGl0eTogRW50aXR5RGVmKTogRm9ybSB7XG4gICAgdGhpcy5kYXRhID0gZW50aXR5O1xuICAgIHJldHVybiA8Rm9ybT50aGlzLl9idWlsZEZvcm1PYmplY3QoZW50aXR5KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfYnVpbGRGb3JtT2JqZWN0KGVudGl0eTogRW50aXR5RGVmIHwgUHJvcGVydHlEZWYsIHBhcmVudDogRm9ybU9iamVjdCA9IG51bGwpIHtcblxuICAgIGxldCBmb3JtT2JqZWN0OiBGb3JtT2JqZWN0ID0gbnVsbDtcblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLnNjaGVtYSA9IFJlZ2lzdHJ5LmdldFNjaGVtYShlbnRpdHkuc2NoZW1hTmFtZSk7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtT2JqZWN0ID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmNyZWF0ZUhhbmRsZXIoJ2Zvcm0nKTtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCduYW1lJywgZW50aXR5LmlkKCkpO1xuICAgICAgZm9ybU9iamVjdC5oYW5kbGUoJ2JpbmRpbmcnLCBlbnRpdHkpO1xuICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBhbHNvIG90aGVyIHR5cGVzXG4gICAgICBsZXQgcHJvcGVydHkgPSBlbnRpdHk7XG4gICAgICBsZXQgZm9ybVR5cGUgPSA8c3RyaW5nPnByb3BlcnR5LmdldE9wdGlvbnMoJ2Zvcm0nKSB8fCAndGV4dCc7XG4gICAgICBsZXQgbWV0aG9kTmFtZSA9ICdmb3InICsgXy5jYXBpdGFsaXplKGZvcm1UeXBlKTtcbiAgICAgIGlmICh0aGlzW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIGZvcm1PYmplY3QgPSB0aGlzW21ldGhvZE5hbWVdKGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtT2JqZWN0ID0gdGhpcy5mb3JEZWZhdWx0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlEZWYpIHtcblxuICAgIH1cblxuICAgIGlmIChmb3JtT2JqZWN0ICE9IG51bGwpIHtcbiAgICAgIGZvcm1PYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGZvcm1PYmplY3Qgbm8gY3JlYXRlZCBidXQgcGFyZW50IGlzIHBhc3NlZCB0aGVuIHVzZSBpdCBhcyBmb3Jtb2JqZWN0IGZ1cnRoZXIgKGdyaWQgPC0gYWRkIGZ1cnRlciBlbGVtZW50cylcbiAgICAgIGZvcm1PYmplY3QgPSBwYXJlbnQ7XG4gICAgfVxuXG5cbiAgICBpZiAoZW50aXR5IGluc3RhbmNlb2YgRW50aXR5RGVmKSB7XG4gICAgICBsZXQgcHJvcGVydGllcyA9IGVudGl0eS5nZXRQcm9wZXJ0eURlZnMoKTtcblxuICAgICAgZm9yIChsZXQgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm1PYmplY3QocHJvcGVydHksIGZvcm1PYmplY3QpO1xuICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgLy8gVE9ETyBmb3IgcHJvcGVydGllcyB3aGljaCBwb2ludHMgdG8gRW50aXR5IC8gRW50aXRpZXNcbiAgICAgIC8vcHJvcGVydHkuZ2V0RW50aXR5RGVmXG4gICAgICAvL2Zvcm1PYmplY3Q7XG4gICAgICBsZXQgcHJvcGVydHkgPSA8UHJvcGVydHlEZWY+ZW50aXR5O1xuICAgICAgaWYgKHByb3BlcnR5LmlzUmVmZXJlbmNlKCkpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5LmlzRW50aXR5UmVmZXJlbmNlKCkpIHtcbiAgICAgICAgICBsZXQgZW50aXR5ID0gcHJvcGVydHkudGFyZ2V0UmVmLmdldEVudGl0eSgpO1xuICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChlbnRpdHksIGZvcm1PYmplY3QpO1xuICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuc2NoZW1hLmdldFByb3BlcnRpZXNGb3IocHJvcGVydHkudGFyZ2V0UmVmLmdldENsYXNzKCkpO1xuICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZE9iamVjdCA9IHRoaXMuX2J1aWxkRm9ybU9iamVjdChwcm9wZXJ0eSwgZm9ybU9iamVjdCk7XG4gICAgICAgICAgICBmb3JtT2JqZWN0Lmluc2VydChjaGlsZE9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9ybU9iamVjdC5wb3N0UHJvY2VzcygpO1xuICAgIHJldHVybiBmb3JtT2JqZWN0O1xuXG4gIH1cblxuICBwcml2YXRlIGZvckRlZmF1bHQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgbGV0IGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcihmb3JtVHlwZSk7XG4gICAgaWYgKGZvcm1PYmplY3QpIHtcbiAgICAgIGZvcm1PYmplY3QuaGFuZGxlKCd2YXJpYW50JywgZm9ybVR5cGUpO1xuICAgICAgdGhpcy5fYXBwbHlWYWx1ZXMoZm9ybU9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgcmV0dXJuIGZvcm1PYmplY3Q7XG4gICAgfVxuICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGZvcm1UeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yVGV4dChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ySW5wdXQoZm9ybVR5cGUsIHByb3BlcnR5KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9yUGFzc3dvcmQoZm9ybVR5cGU6IHN0cmluZywgcHJvcGVydHk6IFByb3BlcnR5RGVmKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcklucHV0KGZvcm1UeXBlLCBwcm9wZXJ0eSk7XG4gIH1cblxuICBwcml2YXRlIGZvckVtYWlsKGZvcm1UeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIHJldHVybiB0aGlzLl9mb3JJbnB1dChmb3JtVHlwZSwgcHJvcGVydHkpO1xuICB9XG5cblxuICBwcml2YXRlIF9mb3JJbnB1dChmb3JtVHlwZTogc3RyaW5nLCBwcm9wZXJ0eTogUHJvcGVydHlEZWYpIHtcbiAgICBsZXQgZm9ybU9iamVjdCA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5jcmVhdGVIYW5kbGVyKCdpbnB1dCcpO1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCd2YXJpYW50JywgZm9ybVR5cGUpO1xuICAgIHRoaXMuX2FwcGx5VmFsdWVzKGZvcm1PYmplY3QsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gZm9ybU9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5VmFsdWVzKGZvcm1PYmplY3Q6IEZvcm1PYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eURlZikge1xuICAgIGZvcm1PYmplY3QuaGFuZGxlKCduYW1lJywgcHJvcGVydHkubmFtZSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2lkJywgcHJvcGVydHkuaWQoKSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2xhYmVsJywgcHJvcGVydHkubGFiZWwgPyBwcm9wZXJ0eS5sYWJlbCA6IF8uY2FwaXRhbGl6ZShwcm9wZXJ0eS5uYW1lKSk7XG4gICAgZm9ybU9iamVjdC5oYW5kbGUoJ2JpbmRpbmcnLCBwcm9wZXJ0eSk7XG5cbiAgICBsZXQgb3B0aW9ucyA9IHByb3BlcnR5LmdldE9wdGlvbnMoKTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChvcHQgPT4ge1xuICAgICAgICBpZiAoL14oc291cmNlfHRhcmdldHxwcm9wZXJ0eSkvLnRlc3Qob3B0KSkgcmV0dXJuO1xuICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICAgIGZvcm1PYmplY3QuaGFuZGxlKG9wdCwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybShkYXRhOiBhbnksIHBhcmVudDogRm9ybU9iamVjdCA9IG51bGwpIHtcbiAgICBsZXQga2V5cyA9IF8ucmVtb3ZlKE9iamVjdC5rZXlzKGRhdGEpLCAoZTogc3RyaW5nKSA9PiBbJ2NoaWxkcmVuJywgJ3R5cGUnXS5pbmRleE9mKGUpID09PSAtMSk7XG5cbiAgICBsZXQgZm9ybU9iamVjdDogRm9ybU9iamVjdCA9IG51bGw7XG4gICAgaWYgKGRhdGEudHlwZSkge1xuICAgICAgLy8gbG9va3VwIGhhbmRsZXJcbiAgICAgIGZvcm1PYmplY3QgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuY3JlYXRlSGFuZGxlcihkYXRhLnR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcigpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLmZvcm0gPSBmb3JtT2JqZWN0O1xuICAgIH1cblxuICAgIGZvcm1PYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgbGV0IHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGlmICgvXlxcJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBSZXNvbHZlRGF0YVZhbHVlKHZhbHVlLCBmb3JtT2JqZWN0LCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3JtT2JqZWN0LmhhbmRsZShrZXksIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIGlmIChkYXRhLmNoaWxkcmVuKSB7XG4gICAgICBsZXQgdmFsdWUgPSBkYXRhLmNoaWxkcmVuO1xuICAgICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdmFsdWUpIHtcbiAgICAgICAgICBsZXQgY2hpbGRPYmplY3QgPSB0aGlzLl9idWlsZEZvcm0oZW50cnksIGZvcm1PYmplY3QpO1xuICAgICAgICAgIGZvcm1PYmplY3QuaW5zZXJ0KGNoaWxkT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdFlldEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtT2JqZWN0LnBvc3RQcm9jZXNzKCk7XG4gICAgcmV0dXJuIGZvcm1PYmplY3Q7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVnaXN0cnl9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9SZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL2VsZW1lbnRzJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1CdWlsZGVyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2Uge1xuXG4gIGNhY2hlOiBhbnkgPSB7fTtcblxuICBnZXQobmFtZTogc3RyaW5nLCBpbnN0YW5jZTogYW55KTogRm9ybSB7XG4gICAgLy8gVE9ETyBsb29rdXAgZm9yIGZvcm0gbW9kaWZpY2F0aW9uc1xuICAgIGxldCBlbnRpdHlEZWYgPSBSZWdpc3RyeS5nZXRFbnRpdHlEZWZGb3IoaW5zdGFuY2UpO1xuICAgIGxldCBidWlsZGVyMiA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICAgIHJldHVybiBidWlsZGVyMi5idWlsZEZyb21FbnRpdHkoZW50aXR5RGVmKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVmlld0NvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqZWN0OiBGdW5jdGlvbikge1xuICAgIENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS5hZGRDb21wb25lbnQodHlwZU5hbWUsIG9iamVjdCk7XG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIEluamVjdG9yLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4vVHJlZU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuXG5jb25zdCBQUk9QX01FVEFEQVRBID0gJ19fcHJvcF9fbWV0YWRhdGFfXyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4ge1xuXG4gIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgZWxlbTogVDtcblxuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSB2YzogVmlld0NvbnRhaW5lclJlZjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSW5qZWN0b3IpIHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBwdWJsaWMgcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3QoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdCgpIHtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRFbGVtKGVsZW06IFQpIHtcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICB9XG5cblxuICBidWlsZFNpbmdsZShjb250ZW50OiBUKTogQWJzdHJhY3RDb21wb25lbnQ8VD4ge1xuXG5cbiAgICBjb25zdCBoYW5kbGUgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuJCgpLmdldE9yQ3JlYXRlRGVmKGNvbnRlbnQudHlwZSk7XG4gICAgaWYgKGhhbmRsZSAmJiBoYW5kbGUuY29tcG9uZW50KSB7XG5cblxuICAgICAgaWYgKHRoaXMudmMpIHtcblxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxhbnk+aGFuZGxlLmNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBSZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSA8QWJzdHJhY3RDb21wb25lbnQ8VD4+Y29tcFJlZi5pbnN0YW5jZTtcblxuICAgICAgICBsZXQgbWV0YWRhdGE6IHsgW2s6IHN0cmluZ106IGFueSB9ID0gbnVsbDtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KFBST1BfTUVUQURBVEEpKSB7XG4gICAgICAgICAgbWV0YWRhdGEgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcltQUk9QX01FVEFEQVRBXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3RhbmNlLnNldEVsZW0oY29udGVudCk7XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLmJ1aWxkKSB7XG4gICAgICAgICAgbGV0IHJlZnMgPSBpbnN0YW5jZS5idWlsZChjb250ZW50KTtcblxuICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgbGV0IHYgPSBtZXRhZGF0YVtrZXldO1xuICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eSh2KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheSh2KSAmJiB2Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZWNvcmF0b3IgPSBfLmZpcnN0KHYpO1xuICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcERlY29yYXRvci5maXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maW5kKHJlZnMsIHJlZiA9PiByZWYuY29uc3RydWN0b3IgPT0gcHJvcERlY29yYXRvci5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5ICsgJzInXSA9IF8uZmluZChyZWZzLCByZWYgPT4gcmVmLmNvbnN0cnVjdG9yID09IHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXkgKyAnMiddID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5cXCd0IHJlc29sdmUgbWV0YWRhdGEnLCBpbnN0YW5jZS5jb25zdHJ1Y3Rvciwga2V5LCB2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGNvbnRlbnQudHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuXG4gIH1cblxuXG4gIGJ1aWxkKGNvbnRlbnQ6IFQpOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgcmVmczogQWJzdHJhY3RDb21wb25lbnQ8VD5bXSA9IFtdO1xuICAgIGNvbnRlbnQuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGNvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgbGV0IHJlZiA9IHRoaXMuYnVpbGRTaW5nbGUoPFQ+Y29udGVudE9iamVjdCk7XG4gICAgICByZWZzLnB1c2gocmVmKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVmcztcbiAgfVxuXG59XG4iLCJcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuZXhwb3J0IHR5cGUgQUxJR05NRU5UID0gJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJ1xuXG5leHBvcnQgdHlwZSBMQUJFTF9ESVNQTEFZID0gJ3RvcCcgfCAnaW5saW5lJyB8ICdub25lJ1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGlkeDogbnVtYmVyID0gLTE7XG5cbiAgcGFyZW50OiBDb250ZXh0O1xuXG4gIGxhYmVsRGlzcGxheTogTEFCRUxfRElTUExBWTtcblxuICAvLyBhbGlnbm1lbnQ6XG5cbiAgY2hpbGQoX25hbWU6IHN0cmluZyA9IG51bGwsIGlkeDogbnVtYmVyID0gLTEpIHtcbiAgICBsZXQgbmFtZSA9IG5ldyBDb250ZXh0KCk7XG4gICAgbmFtZS5wYXJlbnQgPSB0aGlzO1xuICAgIG5hbWUubmFtZSA9IF9uYW1lO1xuICAgIG5hbWUuaWR4ID0gaWR4O1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cblxuICBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFycjogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGFyciA9IHRoaXMucGFyZW50LnBhdGgoKS5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlkeCA+IC0xKSB7XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gYXJyW2Fyci5sZW5ndGggLSAxXSArICdbJyArIHRoaXMuaWR4ICsgJ10nO1xuICAgICAgLy8gYXJyLnB1c2godGhpcy5uYW1lICsgJ1snICsgdGhpcy5pZHggKyAnXScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvLyAgY29uc29sZS5sb2coYXJyKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiAhXy5pc0VtcHR5KHgpKS5qb2luKCcuJyk7XG4gIH1cblxuXG4gIGdldChrZXk6IHN0cmluZywgX2RlZmF1bHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XG4gICAgICByZXR1cm4gXy5nZXQodGhpcywga2V5LCBfZGVmYXVsdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4veHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uL3hzdmlldy9Db250ZXh0JztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGb3JtQ29tcG9uZW50PFQgZXh0ZW5kcyBGb3JtT2JqZWN0PiBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PFQ+IHtcblxuICBzdGF0aWMgX2luYzogbnVtYmVyID0gMDtcblxuXG4gIGRhdGE6IERhdGFDb250YWluZXI8YW55PjtcblxuICBpbmM6IG51bWJlciA9IDA7XG5cblxuXG4gIGNvbnN0cnVjdCgpe1xuICAgIHRoaXMuaW5jID0gQWJzdHJhY3RGb3JtQ29tcG9uZW50Ll9pbmMrKztcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmlkO1xuICB9XG5cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLm5hbWU7XG4gIH1cblxuXG4gIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmxhYmVsO1xuICB9XG5cblxuICBnZXQgbGFiZWxEaXNwbGF5KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0KCdsYWJlbERpc3BsYXknLCAndG9wJyk7XG4gIH1cblxuXG4gIGdldCBoZWxwKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0uaGVscDtcbiAgfVxuXG5cbiAgZ2V0IGlzUmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5yZWFkb25seTtcbiAgfVxuXG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5jaGVja2VkKHRoaXMubmFtZSkgJiYgdGhpcy5kYXRhLnZhbGlkKHRoaXMubmFtZSk7XG4gIH1cblxuXG4gIHByb3RlY3RlZCBzZXRGb3JtT2JqZWN0KGVsZW06IFQpIHtcbiAgICB0aGlzLnNldEVsZW0oZWxlbSk7XG4gIH1cblxuXG4gIHNldERhdGEoZWxlbTogVCwgcGFyZW50OiBDb250ZXh0LCBpZHg6IG51bWJlciA9IC0xKSB7XG4gICAgdGhpcy5zZXRGb3JtT2JqZWN0KGVsZW0pO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHBhcmVudC5jaGlsZChlbGVtLm5hbWUsIGlkeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG4gICAgICBpZiAoZWxlbS5nZXRCaW5kaW5nKCkgaW5zdGFuY2VvZiBQcm9wZXJ0eURlZikge1xuICAgICAgICB0aGlzLmNvbnRleHQubmFtZSA9IGVsZW0ubmFtZTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmlkeCA9IGlkeDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBsZXQgcGF0aCA9IHRoaXMuY29udGV4dC5wYXRoKCk7XG4gICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gIH1cblxuXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBsZXQgcGF0aCA9IHRoaXMuY29udGV4dC5wYXRoKCk7XG4gICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCB2KTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCkgOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgY29tcDpBYnN0cmFjdENvbXBvbmVudDxUPltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcbiAgICAgIGlmIChpc0Zvcm1PYmplY3QoZm9ybU9iamVjdCkpIHtcblxuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcbiAgICAgICAgICBpZiAodGhpcy52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZSA9IDxBYnN0cmFjdEZvcm1Db21wb25lbnQ8YW55Pj5yZWYuaW5zdGFuY2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5kYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgaW5zdGFuY2UuYnVpbGQoZm9ybU9iamVjdCk7XG4gICAgICAgICAgICBjb21wLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGZvcm1PYmplY3QudHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29tcDtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdG9yLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5AVmlld0NvbXBvbmVudCgnZm9ybScpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Zm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgLy9ob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy9vdXRwdXRzOiBbJ25nU3VibWl0J10sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8Rm9ybT4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBPdXRwdXQoKVxuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBmb3JtTmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGluc3RhbmNlOiBhbnk7XG5cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1TZXJ2aWNlKSBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChJbmplY3RvcikgcHVibGljIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHB1YmxpYyByOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgLy8gVE9ETyBpbnN0YW5jZSBtdXN0IGJlIHByZXNlbnRcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YUNvbnRhaW5lcih0aGlzLmluc3RhbmNlKTtcbiAgICB0aGlzLmVsZW0gPSB0aGlzLmZvcm1TZXJ2aWNlLmdldCh0aGlzLmZvcm1OYW1lLCB0aGlzLmluc3RhbmNlKTtcblxuICAgIC8vIFRPRE8gcmVzdHJ1Y3R1cmUgZm9ybVxuICAgIHRoaXMuYnVpbGQodGhpcy5lbGVtKTtcbiAgfVxuXG5cbiAgYXN5bmMgb25TdWJtaXQoJGV2ZW50OiBFdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuZGF0YS52YWxpZGF0ZSgpO1xuICAgIHRoaXMubmdTdWJtaXQuZW1pdCh7ZXZlbnQ6JGV2ZW50LCBkYXRhOnRoaXMuZGF0YX0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbn1cblxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge0lucHV0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5cblxuXG5AVmlld0NvbXBvbmVudCgnaW5wdXQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8SW5wdXQ+LyogaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyAqLyB7XG5cbiAgZ2V0IHR5cGUoKXtcbiAgICByZXR1cm4gdGhpcy5lbGVtLnZhcmlhbnQ7XG4gIH1cblxuXG5cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtDaGVja2JveH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdjaGVja2JveCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Y2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxDaGVja2JveD4ge1xuXG4gIGdldCB0eXBlKCl7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cblxuICBnZXQgaXNDaGVja2VkKCl7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdO1xuICB9XG5cbiAgc2V0IGlzQ2hlY2tlZCh2YWx1ZTpib29sZWFuKXtcbiAgICBpZih2YWx1ZSl7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMvUmFkaW8nO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdyYWRpbycpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4cmFkaW8nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmFkaW8uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxSYWRpbz4ge1xuXG4gIG9uOiBzdHJpbmcgPSAnWWVzJztcblxuICBvZmY6IHN0cmluZyA9ICdObyc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cbiAgZ2V0IGlzQ2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluc3RhbmNlW3RoaXMubmFtZV07XG4gIH1cblxuICBzZXQgaXNDaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7U2VsZWN0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnLS0tJztcbiAgZGVmYXVsdDogYm9vbGVhbjtcbn1cblxuQFZpZXdDb21wb25lbnQoJ3NlbGVjdCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4c2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxTZWxlY3Q+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjYWNoZWRPcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG5cbiAgZ2V0IHN1cHBvcnRzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhY2hlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmxvYWRPcHRpb25zKCk7XG4gIH1cblxuICBsb2FkT3B0aW9ucygpIHtcbiAgICBsZXQgZW51bXMgPSB0aGlzLnJldHJpZXZlRW51bSgpO1xuXG4gICAgaWYgKGVudW1zKSB7XG4gICAgICBpZiAoZW51bXMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIGVudW1zLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24oKTtcbiAgICAgICAgICBpZiAoXy5pc1N0cmluZyhlKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IG8udmFsdWUgPSBlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXy5oYXMoZSwgJ2xhYmVsJykgfHwgXy5oYXMoZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIG8ubGFiZWwgPSBfLmdldChlLCAnbGFiZWwnLCBfLmdldChlLCAndmFsdWUnKSk7XG4gICAgICAgICAgICBvLnZhbHVlID0gXy5nZXQoZSwgJ3ZhbHVlJywgXy5nZXQoZSwgJ2xhYmVsJykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhY2hlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbnVtcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgIGxldCBvID0gbmV3IE9wdGlvbigpO1xuICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGUpKSB7XG4gICAgICAgICAgICBvLmxhYmVsID0gby52YWx1ZSA9IGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmhhcyhlLCAnbGFiZWwnKSB8fCBfLmhhcyhlLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IF8uZ2V0KGUsICdsYWJlbCcsIF8uZ2V0KGUsICd2YWx1ZScpKTtcbiAgICAgICAgICAgIG8udmFsdWUgPSBfLmdldChlLCAndmFsdWUnLCBfLmdldChlLCAnbGFiZWwnKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FjaGVkT3B0aW9ucy5wdXNoKG8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIHJldHJpZXZlRW51bSgpOiBhbnlbXSB7XG4gICAgaWYgKF8uaXNBcnJheSh0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW0uZW51bTtcbiAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0aGlzLmVsZW0uZW51bSkuZ2V0KHRoaXMubmFtZSk7XG4gICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKHRoaXMuZWxlbS5lbnVtKSkge1xuICAgICAgLy8gY2hlY2sgaWYgYW4gZW50cnkgd2l0aCB0aGUgcHJvcGVydHluYW1lIGV4aXN0c1xuICAgICAgbGV0IGxvb2t1cFBhdGg6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG4gICAgICBpZiAodGhpcy5jb250ZXh0LnBhcmVudCkge1xuICAgICAgICBsb29rdXBQYXRoLnB1c2godGhpcy5jb250ZXh0LnBhcmVudC5wYXRoKCkpO1xuICAgICAgfVxuICAgICAgbG9va3VwUGF0aC5wdXNoKHRoaXMuZWxlbS5lbnVtKVxuICAgICAgbG9va3VwUGF0aCA9ICg8c3RyaW5nW10+bG9va3VwUGF0aCkuam9pbignLicpO1xuXG4gICAgICBpZiAoXy5oYXModGhpcy5kYXRhLmluc3RhbmNlLCBsb29rdXBQYXRoKSkge1xuICAgICAgICAvLyBUT0RPIG9ic2VydmUgaWYgcHJvcGVydHkgaXMgY2hhbmdlZCwgaWYgaXQgZG9lcyB0aGVuIHJlc2V0IGVudW1cbiAgICAgICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgbG9va3VwUGF0aCwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZm91bmQgZW51bSByZWZlcmVuY2UnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3hncmlkY2VsbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLWNlbGwuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ2VsbENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+IHtcblxuICBwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG5cdGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBbXG5cdFx0ICAnY29sJ1xuXHRcdF0uam9pbignICcpO1xuXHR9XG5cbiAgc2V0R3JpZENvbXBvbmVudChncmlkOiBHcmlkQ29tcG9uZW50KSB7XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG5cblxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7R3JpZENlbGxDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQge05vRm9ybVR5cGVEZWZpbmVkRXJyb3J9IGZyb20gJy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWRyb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4ge1xuXG4gIHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudDtcblxuICBzZXRHcmlkQ29tcG9uZW50KGdyaWQ6IEdyaWRDb21wb25lbnQpIHtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnZm9ybS1yb3cnXG4gICAgXS5qb2luKCcgJyk7XG4gIH1cblxuXG4gIGdldCBpZHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZHg7XG4gIH1cblxuICByZW1vdmVSb3coKSB7XG4gICAgdGhpcy5ncmlkLnJlbW92ZVJvdyh0aGlzLmNvbnRleHQuaWR4KTtcbiAgfVxuXG4gIGJ1aWxkKGZvcm06IEZvcm1PYmplY3QpOkFic3RyYWN0Q29tcG9uZW50PGFueT5bXSB7XG4gICAgbGV0IGNvbXA6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcblxuICAgICAgaWYgKGlzRm9ybU9iamVjdChmb3JtT2JqZWN0KSkge1xuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcblxuICAgICAgICAgIGxldCBjR3JpZENlbGxGYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEdyaWRDZWxsQ29tcG9uZW50KTtcbiAgICAgICAgICBsZXQgY0dyaWRDZWxsID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoY0dyaWRDZWxsRmFjdG9yeSk7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLnNldEdyaWRDb21wb25lbnQodGhpcy5ncmlkKTtcbiAgICAgICAgICBjR3JpZENlbGwuaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNHcmlkQ2VsbC5pbnN0YW5jZS52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSBjR3JpZENlbGwuaW5zdGFuY2UudmMuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gPEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+PnJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXREYXRhKGZvcm1PYmplY3QsIHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICBpbnN0YW5jZS5idWlsZChmb3JtT2JqZWN0KTtcbiAgICAgICAgICAgIGNvbXAucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHZpZXcgY29udGVudCBzZXR0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoZm9ybU9iamVjdC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wO1xuICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRSb3dDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1yb3cuY29tcG9uZW50JztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuQFZpZXdDb21wb25lbnQoJ2dyaWQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8R3JpZD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgZW50cmllczogQ29tcG9uZW50UmVmPEdyaWRSb3dDb21wb25lbnQ+W10gPSBbXTtcblxuICBoZWFkZXI6c3RyaW5nW10gPSBbXTtcblxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cblxuICBhZGRSb3coaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3JpZFJvd0NvbXBvbmVudCk7XG4gICAgbGV0IGNHcmlkUm93ID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBjR3JpZFJvdy5pbnN0YW5jZS5zZXRHcmlkQ29tcG9uZW50KHRoaXMpO1xuICAgIGNHcmlkUm93Lmluc3RhbmNlLnNldERhdGEodGhpcy5lbGVtLCB0aGlzLmNvbnRleHQsIHRoaXMuZW50cmllcy5sZW5ndGgpO1xuICAgIHRoaXMuZW50cmllcy5wdXNoKGNHcmlkUm93KTtcblxuICAgIGxldCBvYmplY3QgPSBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLmVsZW0uZ2V0QmluZGluZygpLnRhcmdldFJlZi5nZXRDbGFzcygpLCBbXSk7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIGlmICh0aGlzLmVsZW0uZ2V0QmluZGluZygpLmlzQ29sbGVjdGlvbigpKSB7XG4gICAgICBsZXQgYXJyYXlTZXR0ZWQgPSBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICAgICAgaWYgKCFhcnJheVNldHRlZCkge1xuICAgICAgICBhcnJheVNldHRlZCA9IFtdO1xuICAgICAgfVxuICAgICAgYXJyYXlTZXR0ZWRbY0dyaWRSb3cuaW5zdGFuY2UuY29udGV4dC5pZHhdID0gb2JqZWN0O1xuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgb2JqZWN0KTtcbiAgICB9XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuYnVpbGQodGhpcy5lbGVtKTtcbiAgICByZXR1cm4gY0dyaWRSb3cuaW5zdGFuY2U7XG4gIH1cblxuXG4gIHJlbW92ZVJvdyhpZHg6IG51bWJlcikge1xuICAgIC8vIFRPRE8gY2hlY2sgaWYgZXhpc3RzXG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuXG4gICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLmVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHMuc2hpZnQoKTtcblxuICAgIHRoaXMudmMucmVtb3ZlKGlkeCk7XG4gICAgaWYgKHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCkpIHtcbiAgICAgIGxldCBhcnJheVNldHRlZCA9IF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgICBpZiAoIWFycmF5U2V0dGVkKSB7XG4gICAgICAgIGFycmF5U2V0dGVkID0gW107XG4gICAgICB9XG4gICAgICBhcnJheVNldHRlZC5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5lbnRyaWVzW2ldLmluc3RhbmNlLmNvbnRleHQuaWR4ID0gaTtcbiAgICB9XG4gICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCk6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdIHtcbiAgICB0aGlzLmNvbnRleHQubGFiZWxEaXNwbGF5ID0gJ25vbmUnO1xuXG5cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgaWYoaXNGb3JtT2JqZWN0KG9iaikpe1xuICAgICAgICB0aGlzLmhlYWRlci5wdXNoKG9iai5sYWJlbCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGxldCBkYXRhRW50cmllcyA9IHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSk7XG5cbiAgICBsZXQgYyA9IHRoaXMuYWRkUm93KCk7XG4gICAgcmV0dXJuIFtjXTtcbiAgfVxuXG59XG4iLCJcbi8vIHRvIGludGVncmF0ZSB0aGUgZWxlbWVudHNcbmltcG9ydCB7Rk9STV9FTEVNRU5UU30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5GT1JNX0VMRU1FTlRTO1xuXG5pbXBvcnQge0Zvcm1Db21wb25lbnR9IGZyb20gJy4vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb0NvbXBvbmVudH0gZnJvbSAnLi9yYWRpby5jb21wb25lbnQnO1xuaW1wb3J0IHtTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQge0dyaWRDb21wb25lbnR9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtHcmlkUm93Q29tcG9uZW50fSBmcm9tICcuL2dyaWQtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge0dyaWRDZWxsQ29tcG9uZW50fSBmcm9tICcuL2dyaWQtY2VsbC5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjb25zdCBYRk9STUNPTVBPTkVOVCA9IFtcbiAgRm9ybUNvbXBvbmVudCxcbiAgSW5wdXRDb21wb25lbnQsXG4gIENoZWNrYm94Q29tcG9uZW50LFxuICBSYWRpb0NvbXBvbmVudCxcbiAgU2VsZWN0Q29tcG9uZW50LFxuICBHcmlkQ29tcG9uZW50LFxuICBHcmlkUm93Q29tcG9uZW50LFxuICBHcmlkQ2VsbENvbXBvbmVudFxuXVxuXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1hGT1JNQ09NUE9ORU5UfSBmcm9tICcuL3hmb3Jtcy5lbGVtZW50cyc7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBYRk9STUNPTVBPTkVOVCxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBYRk9STUNPTVBPTkVOVCxcbiAgZXhwb3J0czogWEZPUk1DT01QT05FTlQsXG4gIHByb3ZpZGVyczogW1xuICAgIEZvcm1TZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgeEZvcm1zTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZU9iamVjdH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvVHJlZU9iamVjdCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudCc7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZpZXctYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy8gb3V0cHV0czogWyduZ1N1Ym1pdCddLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3QnVpbGRlckNvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBfYnVpbGQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgX2luc3RhbmNlOiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IHZhbHVlO1xuICAgIHRoaXMuX2J1aWxkID0gZmFsc2U7XG4gICAgdGhpcy5fX2J1aWxkKCk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9fYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19idWlsZCgpe1xuICAgIGlmKCF0aGlzLl9idWlsZCl7XG4gICAgICB0aGlzLnZjLmNsZWFyKCk7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlKHRoaXMuX2luc3RhbmNlKTtcbiAgICAgIHRoaXMuX2J1aWxkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtWaWV3QnVpbGRlckNvbXBvbmVudH0gZnJvbSAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtWaWV3QnVpbGRlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW10sXG4gIGV4cG9ydHM6IFtWaWV3QnVpbGRlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgeFZpZXdzTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJfIiwicm91dGVyIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsIlJvdXRlciIsIk5nTW9kdWxlIiwiQnJvd3Nlck1vZHVsZSIsIlJvdXRlck1vZHVsZSIsInRzbGliXzEuX19leHRlbmRzIiwiUHJvcGVydHlEZWYiLCJfLmZpbHRlciIsIl8uY2FwaXRhbGl6ZSIsIl8uZmluZCIsIl8uY2xvbmUiLCJSZWdpc3RyeSIsIkVudGl0eURlZiIsIl8ucmVtb3ZlIiwiXy5pc1N0cmluZyIsIl8uaXNBcnJheSIsIk5vdFlldEltcGxlbWVudGVkRXJyb3IiLCJJbmplY3RhYmxlIiwiXy5pc0VtcHR5IiwiXy5maXJzdCIsIl8uaXNGdW5jdGlvbiIsIkluamVjdG9yIiwiSW5qZWN0IiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiVmlld0NoaWxkIiwiVmlld0NvbnRhaW5lclJlZiIsIl8uaGFzIiwiXy5nZXQiLCJfLnNldCIsIkV2ZW50RW1pdHRlciIsIkRhdGFDb250YWluZXIiLCJPdXRwdXQiLCJJbnB1dCIsIk9ic2VydmFibGUiLCJIb3N0QmluZGluZyIsIkZvcm1zTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO1NBQ3BDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRS9FLHVCQUEwQixDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFnQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxT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QUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUVBLElBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLE1BQU07NkJBQUU7NEJBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSUEsSUFBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUVBLElBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUlBLElBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFQSxJQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQ0EsSUFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFFQSxJQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUN0QkEsSUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3FCQUM5QjtvQkFDRCxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUVBLElBQUMsQ0FBQyxDQUFDO2lCQUM5QjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxD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