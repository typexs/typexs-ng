/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from '../../../libs/LoDash';
import { FormObject } from '../FormObject';
import { ResolveDataValue } from '../ResolveDataValue';
import { Ref } from './Ref';
import { ViewContent } from '../../xsview/decorators/ViewContent';
var Form = /** @class */ (function (_super) {
    tslib_1.__extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resolver = [];
        return _this;
    }
    /**
     * @param {?} otherForm
     * @return {?}
     */
    Form.prototype.combine = /**
     * @param {?} otherForm
     * @return {?}
     */
    function (otherForm) {
        var /** @type {?} */ resolverCache = [];
        while (this.resolver.length > 0) {
            var /** @type {?} */ resolver = this.resolver.shift();
            if (resolver instanceof ResolveDataValue) {
                resolver.resolve(otherForm);
            }
            else {
                resolverCache.push(resolver);
            }
        }
        while (resolverCache.length > 0) {
            var /** @type {?} */ resolver = resolverCache.shift();
            if (resolver instanceof Ref) {
                resolver.resolve(otherForm);
            }
        }
        return this;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    Form.prototype.get = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ _path = path.split('.');
        var /** @type {?} */ tmpElem = this;
        var /** @type {?} */ element = null;
        while (_path.length > 0) {
            var /** @type {?} */ _p = _path.shift();
            var /** @type {?} */ ret = _.find(/** @type {?} */ (tmpElem.getChildren()), { name: _p });
            //if(isFormObject(ret)){
            tmpElem = ret;
            if (!tmpElem) {
                break;
            }
            else {
                element = tmpElem;
            }
            //}
        }
        return _path.length == 0 && element ? element : null;
    };
    Form = tslib_1.__decorate([
        ViewContent('form')
    ], Form);
    return Form;
}(FormObject));
export { Form };
function Form_tsickle_Closure_declarations() {
    /** @type {?} */
    Form.prototype.dataContainer;
    /** @type {?} */
    Form.prototype.resolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHNmb3JtL2VsZW1lbnRzL0Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7O0lBSXRDLGdDQUFVOzs7eUJBSVYsRUFBRTs7Ozs7OztJQUUxQixzQkFBTzs7OztJQUFQLFVBQVEsU0FBZTtRQUNyQixxQkFBSSxhQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFFBQVEsWUFBWSxnQkFBZ0IsRUFBRTtnQkFDeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFFRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRS9CLHFCQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckMsSUFBSSxRQUFRLFlBQVksR0FBRyxFQUFFO2dCQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQUVELGtCQUFHOzs7O0lBQUgsVUFBSSxJQUFZO1FBQ2QscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIscUJBQUksT0FBTyxHQUFlLElBQUksQ0FBQztRQUMvQixxQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIscUJBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixxQkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksbUJBQWUsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFFLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7O1lBRWxFLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE1BQU07YUFDUDtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQ25COztTQUVGO1FBQ0QsT0FBTyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBRXREO0lBL0NVLElBQUk7UUFEaEIsV0FBVyxDQUFDLE1BQU0sQ0FBQztPQUNQLElBQUksRUFrRGhCO2VBNUREO0VBVTBCLFVBQVU7U0FBdkIsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtJUmVzb2x2ZXJ9IGZyb20gJy4uL0lSZXNvbHZlcic7XG5pbXBvcnQge0Zvcm1PYmplY3R9IGZyb20gJy4uL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtSZXNvbHZlRGF0YVZhbHVlfSBmcm9tICcuLi9SZXNvbHZlRGF0YVZhbHVlJztcbmltcG9ydCB7UmVmfSBmcm9tICcuL1JlZic7XG5cbmltcG9ydCB7Vmlld0NvbnRlbnR9IGZyb20gJy4uLy4uL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb250ZW50JztcblxuXG5AVmlld0NvbnRlbnQoJ2Zvcm0nKVxuZXhwb3J0IGNsYXNzIEZvcm0gZXh0ZW5kcyBGb3JtT2JqZWN0IHtcblxuICBkYXRhQ29udGFpbmVyOiBhbnk7XG5cbiAgcmVzb2x2ZXI6IElSZXNvbHZlcltdID0gW107XG5cbiAgY29tYmluZShvdGhlckZvcm06IEZvcm0pIHtcbiAgICBsZXQgcmVzb2x2ZXJDYWNoZTogSVJlc29sdmVyW10gPSBbXTtcblxuICAgIHdoaWxlICh0aGlzLnJlc29sdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCByZXNvbHZlciA9IHRoaXMucmVzb2x2ZXIuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlc29sdmVEYXRhVmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZXIucmVzb2x2ZShvdGhlckZvcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZXJDYWNoZS5wdXNoKHJlc29sdmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAocmVzb2x2ZXJDYWNoZS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGxldCByZXNvbHZlciA9IHJlc29sdmVyQ2FjaGUuc2hpZnQoKTtcbiAgICAgIGlmIChyZXNvbHZlciBpbnN0YW5jZW9mIFJlZikge1xuICAgICAgICByZXNvbHZlci5yZXNvbHZlKG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IF9wYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCB0bXBFbGVtOiBGb3JtT2JqZWN0ID0gdGhpcztcbiAgICBsZXQgZWxlbWVudCA9IG51bGw7XG4gICAgd2hpbGUgKF9wYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBfcCA9IF9wYXRoLnNoaWZ0KCk7XG4gICAgICBsZXQgcmV0ID0gXy5maW5kKDxGb3JtT2JqZWN0W10+dG1wRWxlbS5nZXRDaGlsZHJlbigpLCB7bmFtZTogX3B9KTtcbiAgICAgIC8vaWYoaXNGb3JtT2JqZWN0KHJldCkpe1xuICAgICAgdG1wRWxlbSA9IHJldDtcbiAgICAgIGlmICghdG1wRWxlbSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSB0bXBFbGVtO1xuICAgICAgfVxuICAgICAgLy99XG4gICAgfVxuICAgIHJldHVybiBfcGF0aC5sZW5ndGggPT0gMCAmJiBlbGVtZW50ID8gZWxlbWVudCA6IG51bGw7XG5cbiAgfVxuXG5cbn1cbiJdfQ==