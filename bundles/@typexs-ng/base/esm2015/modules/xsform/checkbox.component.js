/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
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
CheckboxComponent = tslib_1.__decorate([
    ViewComponent('checkbox')
], CheckboxComponent);
export { CheckboxComponent };
function CheckboxComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CheckboxComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CheckboxComponent.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFJOUUsSUFLYSxpQkFBaUIsR0FMOUIsdUJBSytCLFNBQVEscUJBQStCOzs7O0lBRXBFLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDMUI7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3pCLElBQUcsS0FBSyxFQUFDO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN0QzthQUFJO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN2QztLQUNGO0NBQ0YsQ0FBQTs7WUF0QkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixXQUFXLEVBQUUsMkJBQTJCO2FBQ3pDOztBQUNZLGlCQUFpQjtJQUw3QixhQUFhLENBQUMsVUFBVSxDQUFDO0dBS2IsaUJBQWlCLEVBa0I3QjtTQWxCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge0NoZWNrYm94fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9lbGVtZW50cyc7XG5cblxuQFZpZXdDb21wb25lbnQoJ2NoZWNrYm94JylcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3hjaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PENoZWNrYm94PiB7XG5cbiAgZ2V0IHR5cGUoKXtcbiAgICByZXR1cm4gdGhpcy5lbGVtLnZhcmlhbnQ7XG4gIH1cblxuXG4gIGdldCBpc0NoZWNrZWQoKXtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluc3RhbmNlW3RoaXMubmFtZV07XG4gIH1cblxuICBzZXQgaXNDaGVja2VkKHZhbHVlOmJvb2xlYW4pe1xuICAgIGlmKHZhbHVlKXtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gdHJ1ZTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=