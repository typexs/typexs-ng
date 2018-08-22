/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormObject } from '../FormObject';
import { ViewContent } from '../../xsview/decorators/ViewContent';
var Input = /** @class */ (function (_super) {
    tslib_1.__extends(Input, _super);
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
    Input = tslib_1.__decorate([
        ViewContent('input')
    ], Input);
    return Input;
}(FormObject));
export { Input };
function Input_tsickle_Closure_declarations() {
    /** @type {?} */
    Input.prototype.variant;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJsaWJzL3hzZm9ybS9lbGVtZW50cy9JbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOztJQUdyQyxpQ0FBVTs7O3dCQUVqQixNQUFNOzs7Ozs7O0lBR3hCLDZCQUFhOzs7O0lBQWIsVUFBYyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3RCO0lBUFUsS0FBSztRQURqQixXQUFXLENBQUMsT0FBTyxDQUFDO09BQ1IsS0FBSyxFQVNqQjtnQkFkRDtFQUsyQixVQUFVO1NBQXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Rm9ybU9iamVjdH0gZnJvbSAnLi4vRm9ybU9iamVjdCc7XG5pbXBvcnQge1ZpZXdDb250ZW50fSBmcm9tICcuLi8uLi94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29udGVudCc7XG5cbkBWaWV3Q29udGVudCgnaW5wdXQnKVxuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgRm9ybU9iamVjdCB7XG5cbiAgdmFyaWFudDogc3RyaW5nID0gJ3RleHQnO1xuXG5cbiAgaGFuZGxlVmFyaWFudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YXJpYW50ID0gdmFsdWU7XG4gIH1cblxufVxuIl19