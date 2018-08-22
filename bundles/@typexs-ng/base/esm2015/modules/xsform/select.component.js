/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as _ from '../../libs/LoDash';
import { Observable } from 'rxjs/Observable';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
export class Option {
    constructor() {
        this.value = '';
        this.label = '---';
    }
}
function Option_tsickle_Closure_declarations() {
    /** @type {?} */
    Option.prototype.value;
    /** @type {?} */
    Option.prototype.label;
    /** @type {?} */
    Option.prototype.default;
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
                    this.cachedOptions.push(o);
                });
            }
            else {
                enums.forEach(e => {
                    let /** @type {?} */ o = new Option();
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
                    this.cachedOptions.push(o);
                });
            }
        }
    }
    /**
     * @return {?}
     */
    retrieveEnum() {
        if (_.isArray(this.elem.enum)) {
            return this.elem.enum;
        }
        else if (_.isFunction(this.elem.enum)) {
            return this.injector.get(this.elem.enum).get(this.name);
        }
        else if (_.isString(this.elem.enum)) {
            // check if an entry with the propertyname exists
            let /** @type {?} */ lookupPath = [];
            if (this.context.parent) {
                lookupPath.push(this.context.parent.path());
            }
            lookupPath.push(this.elem.enum);
            lookupPath = (/** @type {?} */ (lookupPath)).join('.');
            if (_.has(this.data.instance, lookupPath)) {
                // TODO observe if property is changed, if it does then reset enum
                return _.get(this.data.instance, lookupPath, []);
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
SelectComponent = tslib_1.__decorate([
    ViewComponent('select')
], SelectComponent);
export { SelectComponent };
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectComponent.ctorParameters;
    /** @type {?} */
    SelectComponent.prototype.cachedOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMveHNmb3JtL3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRTlFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUV6RSxNQUFNOztxQkFDWSxFQUFFO3FCQUNGLEtBQUs7O0NBRXRCOzs7Ozs7Ozs7QUFFRCxJQUthLGVBQWUsR0FMNUIscUJBSzZCLFNBQVEscUJBQTZCOzs7NkJBRXRDLEVBQUU7Ozs7O0lBRzVCLElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM5Qzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxXQUFXO1FBQ1QscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVoQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksS0FBSyxZQUFZLFVBQVUsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEIscUJBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDakIsQ0FBQyxDQUFD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QUcsbUJBQVcsVUFBVSxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBRTs7Z0JBRXpDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztLQUNYO0NBQ0YsQ0FBQTs7WUE1RUEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUseUJBQXlCO2FBQ3ZDOztBQUNZLGVBQWU7SUFMM0IsYUFBYSxDQUFDLFFBQVEsQ0FBQztHQUtYLGVBQWUsRUF3RTNCO1NBeEVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7U2VsZWN0fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnLS0tJztcbiAgZGVmYXVsdDogYm9vbGVhbjtcbn1cblxuQFZpZXdDb21wb25lbnQoJ3NlbGVjdCcpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4c2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxTZWxlY3Q+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjYWNoZWRPcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG5cbiAgZ2V0IHN1cHBvcnRzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhY2hlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmxvYWRPcHRpb25zKCk7XG4gIH1cblxuICBsb2FkT3B0aW9ucygpIHtcbiAgICBsZXQgZW51bXMgPSB0aGlzLnJldHJpZXZlRW51bSgpO1xuXG4gICAgaWYgKGVudW1zKSB7XG4gICAgICBpZiAoZW51bXMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIGVudW1zLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24oKTtcbiAgICAgICAgICBpZiAoXy5pc1N0cmluZyhlKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IG8udmFsdWUgPSBlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXy5oYXMoZSwgJ2xhYmVsJykgfHwgXy5oYXMoZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIG8ubGFiZWwgPSBfLmdldChlLCAnbGFiZWwnLCBfLmdldChlLCAndmFsdWUnKSk7XG4gICAgICAgICAgICBvLnZhbHVlID0gXy5nZXQoZSwgJ3ZhbHVlJywgXy5nZXQoZSwgJ2xhYmVsJykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhY2hlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbnVtcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgIGxldCBvID0gbmV3IE9wdGlvbigpO1xuICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGUpKSB7XG4gICAgICAgICAgICBvLmxhYmVsID0gby52YWx1ZSA9IGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmhhcyhlLCAnbGFiZWwnKSB8fCBfLmhhcyhlLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IF8uZ2V0KGUsICdsYWJlbCcsIF8uZ2V0KGUsICd2YWx1ZScpKTtcbiAgICAgICAgICAgIG8udmFsdWUgPSBfLmdldChlLCAndmFsdWUnLCBfLmdldChlLCAnbGFiZWwnKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FjaGVkT3B0aW9ucy5wdXNoKG8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIHJldHJpZXZlRW51bSgpOiBhbnlbXSB7XG4gICAgaWYgKF8uaXNBcnJheSh0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW0uZW51bTtcbiAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0aGlzLmVsZW0uZW51bSkuZ2V0KHRoaXMubmFtZSk7XG4gICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKHRoaXMuZWxlbS5lbnVtKSkge1xuICAgICAgLy8gY2hlY2sgaWYgYW4gZW50cnkgd2l0aCB0aGUgcHJvcGVydHluYW1lIGV4aXN0c1xuICAgICAgbGV0IGxvb2t1cFBhdGg6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG4gICAgICBpZiAodGhpcy5jb250ZXh0LnBhcmVudCkge1xuICAgICAgICBsb29rdXBQYXRoLnB1c2godGhpcy5jb250ZXh0LnBhcmVudC5wYXRoKCkpO1xuICAgICAgfVxuICAgICAgbG9va3VwUGF0aC5wdXNoKHRoaXMuZWxlbS5lbnVtKVxuICAgICAgbG9va3VwUGF0aCA9ICg8c3RyaW5nW10+bG9va3VwUGF0aCkuam9pbignLicpO1xuXG4gICAgICBpZiAoXy5oYXModGhpcy5kYXRhLmluc3RhbmNlLCBsb29rdXBQYXRoKSkge1xuICAgICAgICAvLyBUT0RPIG9ic2VydmUgaWYgcHJvcGVydHkgaXMgY2hhbmdlZCwgaWYgaXQgZG9lcyB0aGVuIHJlc2V0IGVudW1cbiAgICAgICAgcmV0dXJuIF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgbG9va3VwUGF0aCwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZm91bmQgZW51bSByZWZlcmVuY2UnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=