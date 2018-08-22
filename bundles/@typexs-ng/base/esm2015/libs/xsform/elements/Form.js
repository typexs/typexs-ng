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
let Form = class Form extends FormObject {
    constructor() {
        super(...arguments);
        this.resolver = [];
    }
    /**
     * @param {?} otherForm
     * @return {?}
     */
    combine(otherForm) {
        let /** @type {?} */ resolverCache = [];
        while (this.resolver.length > 0) {
            let /** @type {?} */ resolver = this.resolver.shift();
            if (resolver instanceof ResolveDataValue) {
                resolver.resolve(otherForm);
            }
            else {
                resolverCache.push(resolver);
            }
        }
        while (resolverCache.length > 0) {
            let /** @type {?} */ resolver = resolverCache.shift();
            if (resolver instanceof Ref) {
                resolver.resolve(otherForm);
            }
        }
        return this;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        let /** @type {?} */ _path = path.split('.');
        let /** @type {?} */ tmpElem = this;
        let /** @type {?} */ element = null;
        while (_path.length > 0) {
            let /** @type {?} */ _p = _path.shift();
            let /** @type {?} */ ret = _.find(/** @type {?} */ (tmpElem.getChildren()), { name: _p });
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
    }
};
Form = tslib_1.__decorate([
    ViewContent('form')
], Form);
export { Form };
function Form_tsickle_Closure_declarations() {
    /** @type {?} */
    Form.prototype.dataContainer;
    /** @type {?} */
    Form.prototype.resolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHNmb3JtL2VsZW1lbnRzL0Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFHaEUsSUFDYSxJQUFJLEdBRGpCLFVBQ2tCLFNBQVEsVUFBVTs7O3dCQUlWLEVBQUU7Ozs7OztJQUUxQixPQUFPLENBQUMsU0FBZTtRQUNyQixxQkFBSSxhQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFFBQVEsWUFBWSxnQkFBZ0IsRUFBRTtnQkFDeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFFRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRS9CLHFCQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckMsSUFBSSxRQUFRLFlBQVksR0FBRyxFQUFFO2dCQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQUVELEdBQUcsQ0FBQyxJQUFZO1FBQ2QscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIscUJBQUksT0FBTyxHQUFlLElBQUksQ0FBQztRQUMvQixxQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIscUJBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixxQkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksbUJBQWUsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFFLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7O1lBRWxFLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE1BQU07YUFDUDtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQ25COztTQUVGO1FBQ0QsT0FBTyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBRXREO0NBR0YsQ0FBQTtBQWxEWSxJQUFJO0lBRGhCLFdBQVcsQ0FBQyxNQUFNLENBQUM7R0FDUCxJQUFJLEVBa0RoQjtTQWxEWSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge0lSZXNvbHZlcn0gZnJvbSAnLi4vSVJlc29sdmVyJztcbmltcG9ydCB7Rm9ybU9iamVjdH0gZnJvbSAnLi4vRm9ybU9iamVjdCc7XG5pbXBvcnQge1Jlc29sdmVEYXRhVmFsdWV9IGZyb20gJy4uL1Jlc29sdmVEYXRhVmFsdWUnO1xuaW1wb3J0IHtSZWZ9IGZyb20gJy4vUmVmJztcblxuaW1wb3J0IHtWaWV3Q29udGVudH0gZnJvbSAnLi4vLi4veHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbnRlbnQnO1xuXG5cbkBWaWV3Q29udGVudCgnZm9ybScpXG5leHBvcnQgY2xhc3MgRm9ybSBleHRlbmRzIEZvcm1PYmplY3Qge1xuXG4gIGRhdGFDb250YWluZXI6IGFueTtcblxuICByZXNvbHZlcjogSVJlc29sdmVyW10gPSBbXTtcblxuICBjb21iaW5lKG90aGVyRm9ybTogRm9ybSkge1xuICAgIGxldCByZXNvbHZlckNhY2hlOiBJUmVzb2x2ZXJbXSA9IFtdO1xuXG4gICAgd2hpbGUgKHRoaXMucmVzb2x2ZXIubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHJlc29sdmVyID0gdGhpcy5yZXNvbHZlci5zaGlmdCgpO1xuICAgICAgaWYgKHJlc29sdmVyIGluc3RhbmNlb2YgUmVzb2x2ZURhdGFWYWx1ZSkge1xuICAgICAgICByZXNvbHZlci5yZXNvbHZlKG90aGVyRm9ybSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlckNhY2hlLnB1c2gocmVzb2x2ZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlIChyZXNvbHZlckNhY2hlLmxlbmd0aCA+IDApIHtcblxuICAgICAgbGV0IHJlc29sdmVyID0gcmVzb2x2ZXJDYWNoZS5zaGlmdCgpO1xuICAgICAgaWYgKHJlc29sdmVyIGluc3RhbmNlb2YgUmVmKSB7XG4gICAgICAgIHJlc29sdmVyLnJlc29sdmUob3RoZXJGb3JtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgX3BhdGggPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IHRtcEVsZW06IEZvcm1PYmplY3QgPSB0aGlzO1xuICAgIGxldCBlbGVtZW50ID0gbnVsbDtcbiAgICB3aGlsZSAoX3BhdGgubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IF9wID0gX3BhdGguc2hpZnQoKTtcbiAgICAgIGxldCByZXQgPSBfLmZpbmQoPEZvcm1PYmplY3RbXT50bXBFbGVtLmdldENoaWxkcmVuKCksIHtuYW1lOiBfcH0pO1xuICAgICAgLy9pZihpc0Zvcm1PYmplY3QocmV0KSl7XG4gICAgICB0bXBFbGVtID0gcmV0O1xuICAgICAgaWYgKCF0bXBFbGVtKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IHRtcEVsZW07XG4gICAgICB9XG4gICAgICAvL31cbiAgICB9XG4gICAgcmV0dXJuIF9wYXRoLmxlbmd0aCA9PSAwICYmIGVsZW1lbnQgPyBlbGVtZW50IDogbnVsbDtcblxuICB9XG5cblxufVxuIl19