/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
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
RadioComponent = tslib_1.__decorate([
    ViewComponent('radio')
], RadioComponent);
export { RadioComponent };
function RadioComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RadioComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RadioComponent.ctorParameters;
    /** @type {?} */
    RadioComponent.prototype.on;
    /** @type {?} */
    RadioComponent.prototype.off;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vcmFkaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFHekUsSUFLYSxjQUFjLEdBTDNCLG9CQUs0QixTQUFRLHFCQUE0Qjs7O2tCQUVqRCxLQUFLO21CQUVKLElBQUk7Ozs7O0lBRWxCLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDMUI7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFjO1FBQzFCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN2QztLQUNGO0NBQ0YsQ0FBQTs7WUF6QkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2dCQUNsQixXQUFXLEVBQUUsd0JBQXdCO2FBQ3RDOztBQUNZLGNBQWM7SUFMMUIsYUFBYSxDQUFDLE9BQU8sQ0FBQztHQUtWLGNBQWMsRUFxQjFCO1NBckJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge1JhZGlvfSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cy9SYWRpbyc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5cblxuQFZpZXdDb21wb25lbnQoJ3JhZGlvJylcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3hyYWRpbycsXG4gIHRlbXBsYXRlVXJsOiAnLi9yYWRpby5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PFJhZGlvPiB7XG5cbiAgb246IHN0cmluZyA9ICdZZXMnO1xuXG4gIG9mZjogc3RyaW5nID0gJ05vJztcblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLnZhcmlhbnQ7XG4gIH1cblxuICBnZXQgaXNDaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXTtcbiAgfVxuXG4gIHNldCBpc0NoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhLmluc3RhbmNlW3RoaXMubmFtZV0gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==