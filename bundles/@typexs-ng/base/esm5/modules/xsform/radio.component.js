/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
var RadioComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RadioComponent, _super);
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
    RadioComponent = tslib_1.__decorate([
        ViewComponent('radio')
    ], RadioComponent);
    return RadioComponent;
}(AbstractFormComponent));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vcmFkaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7O0lBUXJDLDBDQUE0Qjs7O21CQUVqRCxLQUFLO29CQUVKLElBQUk7OztJQUVsQixzQkFBSSxnQ0FBSTs7OztRQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUMxQjs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7Ozs7O1FBRUQsVUFBYyxLQUFjO1lBQzFCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN2QztTQUNGOzs7T0FSQTs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsV0FBVyxFQUFFLHdCQUF3QjtpQkFDdEM7O0lBQ1ksY0FBYztRQUwxQixhQUFhLENBQUMsT0FBTyxDQUFDO09BS1YsY0FBYyxFQXFCMUI7eUJBaENEO0VBV29DLHFCQUFxQjtTQUE1QyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtSYWRpb30gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMvUmFkaW8nO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuXG5cbkBWaWV3Q29tcG9uZW50KCdyYWRpbycpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4cmFkaW8nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmFkaW8uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxSYWRpbz4ge1xuXG4gIG9uOiBzdHJpbmcgPSAnWWVzJztcblxuICBvZmY6IHN0cmluZyA9ICdObyc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS52YXJpYW50O1xuICB9XG5cbiAgZ2V0IGlzQ2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluc3RhbmNlW3RoaXMubmFtZV07XG4gIH1cblxuICBzZXQgaXNDaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmRhdGEuaW5zdGFuY2VbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5pbnN0YW5jZVt0aGlzLm5hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=