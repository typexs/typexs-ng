/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Registry } from 'typexs-schema/libs/Registry';
import { FormBuilder } from '../../libs/xsform/FormBuilder';
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
export { FormService };
function FormService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormService.ctorParameters;
    /** @type {?} */
    FormService.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sK0JBQStCLENBQUM7OztxQkFNM0MsRUFBRTs7Ozs7OztJQUVmLHlCQUFHOzs7OztJQUFILFVBQUksSUFBWSxFQUFFLFFBQWE7O1FBRTdCLHFCQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELHFCQUFJLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1Qzs7Z0JBVkYsVUFBVTs7c0JBTlg7O1NBT2EsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlZ2lzdHJ5fSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvUmVnaXN0cnknO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5pbXBvcnQge0Zvcm1CdWlsZGVyfSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9Gb3JtQnVpbGRlcic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TZXJ2aWNlIHtcblxuICBjYWNoZTogYW55ID0ge307XG5cbiAgZ2V0KG5hbWU6IHN0cmluZywgaW5zdGFuY2U6IGFueSk6IEZvcm0ge1xuICAgIC8vIFRPRE8gbG9va3VwIGZvciBmb3JtIG1vZGlmaWNhdGlvbnNcbiAgICBsZXQgZW50aXR5RGVmID0gUmVnaXN0cnkuZ2V0RW50aXR5RGVmRm9yKGluc3RhbmNlKTtcbiAgICBsZXQgYnVpbGRlcjIgPSBuZXcgRm9ybUJ1aWxkZXIoKTtcbiAgICByZXR1cm4gYnVpbGRlcjIuYnVpbGRGcm9tRW50aXR5KGVudGl0eURlZik7XG4gIH1cblxufVxuIl19