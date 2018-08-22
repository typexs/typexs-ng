/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Registry } from 'typexs-schema/libs/Registry';
import { FormBuilder } from '../../libs/xsform/FormBuilder';
export class FormService {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFJMUQsTUFBTTs7cUJBRVMsRUFBRTs7Ozs7OztJQUVmLEdBQUcsQ0FBQyxJQUFZLEVBQUUsUUFBYTs7UUFFN0IscUJBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQscUJBQUksUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakMsT0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzVDOzs7WUFWRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVnaXN0cnl9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9SZWdpc3RyeSc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL2VsZW1lbnRzJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1CdWlsZGVyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2Uge1xuXG4gIGNhY2hlOiBhbnkgPSB7fTtcblxuICBnZXQobmFtZTogc3RyaW5nLCBpbnN0YW5jZTogYW55KTogRm9ybSB7XG4gICAgLy8gVE9ETyBsb29rdXAgZm9yIGZvcm0gbW9kaWZpY2F0aW9uc1xuICAgIGxldCBlbnRpdHlEZWYgPSBSZWdpc3RyeS5nZXRFbnRpdHlEZWZGb3IoaW5zdGFuY2UpO1xuICAgIGxldCBidWlsZGVyMiA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICAgIHJldHVybiBidWlsZGVyMi5idWlsZEZyb21FbnRpdHkoZW50aXR5RGVmKTtcbiAgfVxuXG59XG4iXX0=