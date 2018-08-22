/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from '../../libs/LoDash';
import { PropertyDef } from 'typexs-schema/libs/PropertyDef';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { AbstractComponent } from '../xsview/AbstractComponent';
import { isFormObject } from './FormObject';
import { ContentComponentRegistry } from '../xsview/ContentComponentRegistry';
import { Context } from '../xsview/Context';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var AbstractFormComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AbstractFormComponent, _super);
    function AbstractFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inc = 0;
        return _this;
    }
    /**
     * @return {?}
     */
    AbstractFormComponent.prototype.construct = /**
     * @return {?}
     */
    function () {
        this.inc = AbstractFormComponent._inc++;
    };
    Object.defineProperty(AbstractFormComponent.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "labelDisplay", {
        get: /**
         * @return {?}
         */
        function () {
            return this.context.get('labelDisplay', 'top');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "help", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.help;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "isReadOnly", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormComponent.prototype, "isValid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.data.checked(this.name) && this.data.valid(this.name);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} elem
     * @return {?}
     */
    AbstractFormComponent.prototype.setFormObject = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        this.setElem(elem);
    };
    /**
     * @param {?} elem
     * @param {?} parent
     * @param {?=} idx
     * @return {?}
     */
    AbstractFormComponent.prototype.setData = /**
     * @param {?} elem
     * @param {?} parent
     * @param {?=} idx
     * @return {?}
     */
    function (elem, parent, idx) {
        if (idx === void 0) { idx = -1; }
        this.setFormObject(elem);
        if (parent) {
            this.context = parent.child(elem.name, idx);
        }
        else {
            this.context = new Context();
            if (elem.getBinding() instanceof PropertyDef) {
                this.context.name = elem.name;
                this.context.idx = idx;
            }
        }
    };
    Object.defineProperty(AbstractFormComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ path = this.context.path();
            return _.get(this.data.instance, path, null);
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ path = this.context.path();
            _.set(this.data.instance, path, v);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} form
     * @return {?}
     */
    AbstractFormComponent.prototype.build = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        var /** @type {?} */ comp = [];
        form.getChildren().forEach(function (formObject) {
            if (isFormObject(formObject)) {
                var /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
                if (handle && handle.component) {
                    if (_this.vc) {
                        var /** @type {?} */ factory = _this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        var /** @type {?} */ ref = _this.vc.createComponent(factory);
                        var /** @type {?} */ instance = /** @type {?} */ (ref.instance);
                        instance.data = _this.data;
                        instance.setData(formObject, _this.context);
                        instance.build(formObject);
                        comp.push(instance);
                    }
                    else {
                        console.error('No view content setted');
                    }
                }
                else {
                    throw new NoFormTypeDefinedError(formObject.type);
                }
            }
        });
        return comp;
    };
    AbstractFormComponent._inc = 0;
    return AbstractFormComponent;
}(AbstractComponent));
export { AbstractFormComponent };
function AbstractFormComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractFormComponent._inc;
    /** @type {?} */
    AbstractFormComponent.prototype.data;
    /** @type {?} */
    AbstractFormComponent.prototype.inc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RGb3JtQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxLQUFLLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7SUFHZ0MsaURBQW9COzs7b0JBTzlFLENBQUM7Ozs7OztJQUlmLHlDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekM7SUFFRCxzQkFBSSxxQ0FBRTs7OztRQUFOO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNyQjs7O09BQUE7SUFHRCxzQkFBSSx1Q0FBSTs7OztRQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN2Qjs7O09BQUE7SUFHRCxzQkFBSSx3Q0FBSzs7OztRQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUN4Qjs7O09BQUE7SUFHRCxzQkFBSSwrQ0FBWTs7OztRQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFD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QUFVLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMzQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNyQjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQ3pDO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25EO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztLQUNiO2lDQXZHcUIsQ0FBQztnQ0FkekI7RUFZMEUsaUJBQWlCO1NBQXJFLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGF0YUNvbnRhaW5lcn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL0RhdGFDb250YWluZXInO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7UHJvcGVydHlEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9Qcm9wZXJ0eURlZic7XG5cbmltcG9ydCB7Tm9Gb3JtVHlwZURlZmluZWRFcnJvcn0gZnJvbSAnLi4vLi4vbGlicy9leGNlcHRpb25zL05vRm9ybVR5cGVEZWZpbmVkRXJyb3InO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4veHN2aWV3L0Fic3RyYWN0Q29tcG9uZW50JztcbmltcG9ydCB7Rm9ybU9iamVjdCwgaXNGb3JtT2JqZWN0fSBmcm9tICcuL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uL3hzdmlldy9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi94c3ZpZXcvQ29udGV4dCc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxUIGV4dGVuZHMgRm9ybU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiB7XG5cbiAgc3RhdGljIF9pbmM6IG51bWJlciA9IDA7XG5cblxuICBkYXRhOiBEYXRhQ29udGFpbmVyPGFueT47XG5cbiAgaW5jOiBudW1iZXIgPSAwO1xuXG5cblxuICBjb25zdHJ1Y3QoKXtcbiAgICB0aGlzLmluYyA9IEFic3RyYWN0Rm9ybUNvbXBvbmVudC5faW5jKys7XG4gIH1cblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5pZDtcbiAgfVxuXG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5uYW1lO1xuICB9XG5cblxuICBnZXQgbGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5sYWJlbDtcbiAgfVxuXG5cbiAgZ2V0IGxhYmVsRGlzcGxheSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldCgnbGFiZWxEaXNwbGF5JywgJ3RvcCcpO1xuICB9XG5cblxuICBnZXQgaGVscCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmhlbHA7XG4gIH1cblxuXG4gIGdldCBpc1JlYWRPbmx5KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0ucmVhZG9ubHk7XG4gIH1cblxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuY2hlY2tlZCh0aGlzLm5hbWUpICYmIHRoaXMuZGF0YS52YWxpZCh0aGlzLm5hbWUpO1xuICB9XG5cblxuICBwcm90ZWN0ZWQgc2V0Rm9ybU9iamVjdChlbGVtOiBUKSB7XG4gICAgdGhpcy5zZXRFbGVtKGVsZW0pO1xuICB9XG5cblxuICBzZXREYXRhKGVsZW06IFQsIHBhcmVudDogQ29udGV4dCwgaWR4OiBudW1iZXIgPSAtMSkge1xuICAgIHRoaXMuc2V0Rm9ybU9iamVjdChlbGVtKTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBwYXJlbnQuY2hpbGQoZWxlbS5uYW1lLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuICAgICAgaWYgKGVsZW0uZ2V0QmluZGluZygpIGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5hbWUgPSBlbGVtLm5hbWU7XG4gICAgICAgIHRoaXMuY29udGV4dC5pZHggPSBpZHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIHJldHVybiBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICB9XG5cblxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgdik7XG4gIH1cblxuXG4gIGJ1aWxkKGZvcm06IEZvcm1PYmplY3QpIDogQWJzdHJhY3RDb21wb25lbnQ8VD5bXSB7XG4gICAgbGV0IGNvbXA6QWJzdHJhY3RDb21wb25lbnQ8VD5bXSA9IFtdXG4gICAgZm9ybS5nZXRDaGlsZHJlbigpLmZvckVhY2goZm9ybU9iamVjdCA9PiB7XG4gICAgICBpZiAoaXNGb3JtT2JqZWN0KGZvcm1PYmplY3QpKSB7XG5cbiAgICAgICAgbGV0IGhhbmRsZSA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS4kKCkuZ2V0T3JDcmVhdGVEZWYoZm9ybU9iamVjdC50eXBlKTtcbiAgICAgICAgaWYgKGhhbmRsZSAmJiBoYW5kbGUuY29tcG9uZW50KSB7XG4gICAgICAgICAgaWYgKHRoaXMudmMpIHtcbiAgICAgICAgICAgIGxldCBmYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxhbnk+aGFuZGxlLmNvbXBvbmVudCk7XG4gICAgICAgICAgICBsZXQgcmVmID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSA8QWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4+cmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGluc3RhbmNlLnNldERhdGEoZm9ybU9iamVjdCwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIGluc3RhbmNlLmJ1aWxkKGZvcm1PYmplY3QpO1xuICAgICAgICAgICAgY29tcC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdmlldyBjb250ZW50IHNldHRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxufVxuIl19