/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormObject, isFormObject } from '../FormObject';
import * as _ from '../../../libs/LoDash';
import { ViewContent } from '../../xsview/decorators/ViewContent';
var Ref = /** @class */ (function (_super) {
    tslib_1.__extends(Ref, _super);
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
    Ref = tslib_1.__decorate([
        ViewContent('ref')
    ], Ref);
    return Ref;
}(FormObject));
export { Ref };
function Ref_tsickle_Closure_declarations() {
    /** @type {?} */
    Ref.prototype.use;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibGlicy94c2Zvcm0vZWxlbWVudHMvUmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJdkQsT0FBTyxLQUFLLENBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7O0lBR3ZDLCtCQUFVOzs7Ozs7O0lBSWpDLHlCQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBRUQscUJBQU87Ozs7SUFBUCxVQUFRLElBQVU7UUFBbEIsaUJBYUM7UUFaQyxxQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDcEIscUJBQUksR0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQzs7WUFHaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQzFCLEdBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztTQUVKO0tBRUY7SUFyQlUsR0FBRztRQURmLFdBQVcsQ0FBQyxLQUFLLENBQUM7T0FDTixHQUFHLEVBc0JmO2NBOUJEO0VBUXlCLFVBQVU7U0FBdEIsR0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Rm9ybU9iamVjdCwgaXNGb3JtT2JqZWN0fSBmcm9tICcuLi9Gb3JtT2JqZWN0JztcbmltcG9ydCB7SVJlc29sdmVyfSBmcm9tICcuLi9JUmVzb2x2ZXInO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL0Zvcm0nO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuQFZpZXdDb250ZW50KCdyZWYnKVxuZXhwb3J0IGNsYXNzIFJlZiBleHRlbmRzIEZvcm1PYmplY3QgaW1wbGVtZW50cyBJUmVzb2x2ZXIge1xuXG4gIHVzZTogc3RyaW5nO1xuXG4gIHBvc3RQcm9jZXNzKCkge1xuICAgIHRoaXMuZ2V0Rm9ybSgpWydyZXNvbHZlciddLnB1c2godGhpcyk7XG4gIH1cblxuICByZXNvbHZlKGZvcm06IEZvcm0pIHtcbiAgICBsZXQgZWxlbSA9IGZvcm0uZ2V0KHRoaXMudXNlKTtcbiAgICBpZihpc0Zvcm1PYmplY3QoZWxlbSkpe1xuICAgICAgbGV0IGUgPSBfLmNsb25lKGVsZW0pO1xuICAgICAgdGhpcy5yZXBsYWNlKGUpO1xuXG4gICAgICAvLyBjb3B5IHByb3BlcnRpZXNcbiAgICAgIHRoaXMuZ2V0VXNlZEtleXMoKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBlLmhhbmRsZShrLCB0aGlzW2tdKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG5cblxuIl19