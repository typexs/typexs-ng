/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class FormObject extends TreeObject {
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
                else {
                    //  throw new Error('parent is not a form object');
                }
            }
            arr.push(this.name);
            if (this.getBinding().isCollection()) {
                arr.push('$idx');
            }
        }
        return _.filter(arr, (x) => x.trim() != '').join('.');
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
        let /** @type {?} */ methodName = 'handle' + _.capitalize(key);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHNmb3JtL0Zvcm1PYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRCxPQUFPLEtBQUssQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFHaEQsTUFBTSx1QkFBdUIsR0FBNEI7SUFDdkQsT0FBTyxHQUFHLFlBQVksVUFBVSxDQUFDO0NBQ2xDOzs7O0FBRUQsTUFBTSxpQkFBMkIsU0FBUSxVQUFVOzs7d0JBSTVCLEVBQUU7dUJBVVEsSUFBSTs7Ozs7SUFHbkMsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7OztJQUlELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7SUFJRCxPQUFPO1FBQ0wscUJBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLFdBQVcsRUFBRTtZQUM1QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEIsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEMsSUFBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7aUJBQzVCO3FCQUFJOztpQkFFSjthQUNGO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEI7U0FDRjtRQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDL0Q7Ozs7SUFHRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07O1lBRUwsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGOzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFFNUIsSUFBSSxLQUFLLFlBQVksZ0JBQWdCLEVBQUU7WUFDckMscUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIscUJBQUksVUFBVSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNuQjtLQUNGOzs7Ozs7SUFLRCxVQUFVLENBQUMsS0FBYTtLQUN2Qjs7OztJQUdELFdBQVc7S0FDVjs7Ozs7SUFHRCxPQUFPLENBQUMsVUFBc0I7UUFDNUIscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixxQkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsT0FBTyxVQUFVLENBQUM7S0FDbkI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvcGVydHlEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9Qcm9wZXJ0eURlZic7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtSZXNvbHZlRGF0YVZhbHVlfSBmcm9tICcuL1Jlc29sdmVEYXRhVmFsdWUnO1xuaW1wb3J0IHtUcmVlT2JqZWN0fSBmcm9tICcuLi94c3ZpZXcvVHJlZU9iamVjdCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRm9ybU9iamVjdChvYmo6IFRyZWVPYmplY3QgfCBGb3JtT2JqZWN0KTogb2JqIGlzIEZvcm1PYmplY3Qge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRm9ybU9iamVjdDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZvcm1PYmplY3QgZXh0ZW5kcyBUcmVlT2JqZWN0IHtcblxuICBpZDogc3RyaW5nO1xuXG4gIHVzZWRLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIG5hbWU6IHN0cmluZztcblxuICBsYWJlbDogc3RyaW5nO1xuXG4gIGhlbHA6IHN0cmluZztcblxuICByZWFkb25seTogZmFsc2U7XG5cbiAgcHJpdmF0ZSBiaW5kaW5nOiBQcm9wZXJ0eURlZiA9IG51bGw7XG5cblxuICBnZXRCaW5kaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmc7XG4gIH1cblxuXG5cbiAgZ2V0VXNlZEtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlZEtleXM7XG4gIH1cblxuXG5cbiAgZ2V0UGF0aCgpOiBzdHJpbmcge1xuICAgIGxldCBhcnIgPSBbXTtcblxuICAgIGlmICh0aGlzLmdldEJpbmRpbmcoKSBpbnN0YW5jZW9mIFByb3BlcnR5RGVmKSB7XG4gICAgICBpZiAodGhpcy5nZXRQYXJlbnQoKSkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZihpc0Zvcm1PYmplY3QocGFyZW50KSl7XG4gICAgICAgICAgYXJyLnB1c2gocGFyZW50LmdldFBhdGgoKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgLy8gIHRocm93IG5ldyBFcnJvcigncGFyZW50IGlzIG5vdCBhIGZvcm0gb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFyci5wdXNoKHRoaXMubmFtZSk7XG4gICAgICBpZiAodGhpcy5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCkpIHtcbiAgICAgICAgYXJyLnB1c2goJyRpZHgnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFyciwgKHg6IHN0cmluZykgPT4geC50cmltKCkgIT0gJycpLmpvaW4oJy4nKTtcbiAgfVxuXG5cbiAgZ2V0Rm9ybSgpOiBGb3JtT2JqZWN0IHtcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgaXNGb3JtT2JqZWN0KHRoaXMucGFyZW50KSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldEZvcm0oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAnZm9ybScpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPIHRocm93IGVycm9yIHRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBSZXNvbHZlRGF0YVZhbHVlKSB7XG4gICAgICBsZXQgZm9ybSA9IHRoaXMuZ2V0Rm9ybSgpOyAvL1xuICAgICAgZm9ybVsncmVzb2x2ZXInXS5wdXNoKHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnVzZWRLZXlzLnB1c2goa2V5KTtcbiAgICBsZXQgbWV0aG9kTmFtZSA9ICdoYW5kbGUnICsgXy5jYXBpdGFsaXplKGtleSk7XG4gICAgaWYgKHRoaXNbbWV0aG9kTmFtZV0pIHtcbiAgICAgIHRoaXNbbWV0aG9kTmFtZV0odmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRG9uJ3Qgb3ZlcnJpZGUgdHlwZVxuICAgKi9cbiAgaGFuZGxlVHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gIH1cblxuXG4gIHBvc3RQcm9jZXNzKCkge1xuICB9XG5cblxuICByZXBsYWNlKHNvbWVPYmplY3Q6IEZvcm1PYmplY3QpIHtcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICBsZXQgaWR4ID0gcGFyZW50LmdldENoaWxkcmVuKCkuaW5kZXhPZih0aGlzKTtcbiAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IGZpbmQgaW5kZXgsIHNvbWV0aGluZyBpcyB3cm9uZycpO1xuICAgIH1cbiAgICBwYXJlbnQuZ2V0Q2hpbGRyZW4oKVtpZHhdID0gc29tZU9iamVjdDtcbiAgICBzb21lT2JqZWN0LnNldFBhcmVudChwYXJlbnQpO1xuICAgIHJldHVybiBzb21lT2JqZWN0O1xuICB9XG59XG4iXX0=