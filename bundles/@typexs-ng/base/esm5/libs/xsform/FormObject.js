/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import * as _ from '../../libs/LoDash';
import { ResolveDataValue } from './ResolveDataValue';
import { TreeObject } from '../xsview/TreeObject';
/**
 * @param {?} obj
 * @return {?}
 */
export function isFormObject(obj) {
    return obj instanceof FormObject;
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
FormObject = /** @class */ (function (_super) {
    tslib_1.__extends(FormObject, _super);
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
                else {
                    //  throw new Error('parent is not a form object');
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
 * @abstract
 */
export { FormObject };
function FormObject_tsickle_Closure_declarations() {
    /** @type {?} */
    FormObject.prototype.id;
    /** @type {?} */
    FormObject.prototype.usedKeys;
    /** @type {?} */
    FormObject.prototype.name;
    /** @type {?} */
    FormObject.prototype.label;
    /** @type {?} */
    FormObject.prototype.help;
    /** @type {?} */
    FormObject.prototype.readonly;
    /** @type {?} */
    FormObject.prototype.binding;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHNmb3JtL0Zvcm1PYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxLQUFLLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBR2hELE1BQU0sdUJBQXVCLEdBQTRCO0lBQ3ZELE9BQU8sR0FBRyxZQUFZLFVBQVUsQ0FBQztDQUNsQzs7OztBQUVEOzs7QUFBQTtJQUF5QyxzQ0FBVTs7O3lCQUk1QixFQUFFO3dCQVVRLElBQUk7Ozs7OztJQUduQywrQkFBVTs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDckI7Ozs7SUFJRCxnQ0FBVzs7O0lBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7SUFJRCw0QkFBTzs7O0lBQVA7UUFDRSxxQkFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksV0FBVyxFQUFFO1lBQzVDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixxQkFBTSxRQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQyxJQUFHLFlBQVksQ0FBQyxRQUFNLENBQUMsRUFBQztvQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDNUI7cUJBQUk7O2lCQUVKO2FBQ0Y7WUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQjtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9EOzs7O0lBR0QsNEJBQU87OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07O1lBRUwsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGOzs7Ozs7SUFFRCwyQkFBTTs7Ozs7SUFBTixVQUFPLEdBQVcsRUFBRSxLQUFVO1FBRTVCLElBQUksS0FBSyxZQUFZLGdCQUFnQixFQUFFO1lBQ3JDLHFCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLHFCQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbkI7S0FDRjtJQUVEOztPQUVHOzs7Ozs7SUFDSCwrQkFBVTs7Ozs7SUFBVixVQUFXLEtBQWE7S0FDdkI7Ozs7SUFHRCxnQ0FBVzs7O0lBQVg7S0FDQzs7Ozs7SUFHRCw0QkFBTzs7OztJQUFQLFVBQVEsVUFBc0I7UUFDNUIscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixxQkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsT0FBTyxVQUFVLENBQUM7S0FDbkI7cUJBNUdIO0VBV3lDLFVBQVUsRUFrR2xELENBQUE7Ozs7QUFsR0Qsc0JBa0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9wZXJ0eURlZn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL1Byb3BlcnR5RGVmJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4vUmVzb2x2ZURhdGFWYWx1ZSc7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4uL3hzdmlldy9UcmVlT2JqZWN0JztcblxuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtT2JqZWN0KG9iajogVHJlZU9iamVjdCB8IEZvcm1PYmplY3QpOiBvYmogaXMgRm9ybU9iamVjdCB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBGb3JtT2JqZWN0O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybU9iamVjdCBleHRlbmRzIFRyZWVPYmplY3Qge1xuXG4gIGlkOiBzdHJpbmc7XG5cbiAgdXNlZEtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgaGVscDogc3RyaW5nO1xuXG4gIHJlYWRvbmx5OiBmYWxzZTtcblxuICBwcml2YXRlIGJpbmRpbmc6IFByb3BlcnR5RGVmID0gbnVsbDtcblxuXG4gIGdldEJpbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZGluZztcbiAgfVxuXG5cblxuICBnZXRVc2VkS2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy51c2VkS2V5cztcbiAgfVxuXG5cblxuICBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgaWYgKHRoaXMuZ2V0QmluZGluZygpIGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgIGlmICh0aGlzLmdldFBhcmVudCgpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmKGlzRm9ybU9iamVjdChwYXJlbnQpKXtcbiAgICAgICAgICBhcnIucHVzaChwYXJlbnQuZ2V0UGF0aCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAvLyAgdGhyb3cgbmV3IEVycm9yKCdwYXJlbnQgaXMgbm90IGEgZm9ybSBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLnB1c2godGhpcy5uYW1lKTtcbiAgICAgIGlmICh0aGlzLmdldEJpbmRpbmcoKS5pc0NvbGxlY3Rpb24oKSkge1xuICAgICAgICBhcnIucHVzaCgnJGlkeCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiB4LnRyaW0oKSAhPSAnJykuam9pbignLicpO1xuICB9XG5cblxuICBnZXRGb3JtKCk6IEZvcm1PYmplY3Qge1xuICAgIGlmICh0aGlzLnBhcmVudCAmJiBpc0Zvcm1PYmplY3QodGhpcy5wYXJlbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0Rm9ybSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09ICdmb3JtJykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3IgdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgIGxldCBmb3JtID0gdGhpcy5nZXRGb3JtKCk7IC8vXG4gICAgICBmb3JtWydyZXNvbHZlciddLnB1c2godmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMudXNlZEtleXMucHVzaChrZXkpO1xuICAgIGxldCBtZXRob2ROYW1lID0gJ2hhbmRsZScgKyBfLmNhcGl0YWxpemUoa2V5KTtcbiAgICBpZiAodGhpc1ttZXRob2ROYW1lXSkge1xuICAgICAgdGhpc1ttZXRob2ROYW1lXSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEb24ndCBvdmVycmlkZSB0eXBlXG4gICAqL1xuICBoYW5kbGVUeXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgfVxuXG5cbiAgcG9zdFByb2Nlc3MoKSB7XG4gIH1cblxuXG4gIHJlcGxhY2Uoc29tZU9iamVjdDogRm9ybU9iamVjdCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgIGxldCBpZHggPSBwYXJlbnQuZ2V0Q2hpbGRyZW4oKS5pbmRleE9mKHRoaXMpO1xuICAgIGlmIChpZHggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgZmluZCBpbmRleCwgc29tZXRoaW5nIGlzIHdyb25nJyk7XG4gICAgfVxuICAgIHBhcmVudC5nZXRDaGlsZHJlbigpW2lkeF0gPSBzb21lT2JqZWN0O1xuICAgIHNvbWVPYmplY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgcmV0dXJuIHNvbWVPYmplY3Q7XG4gIH1cbn1cbiJdfQ==