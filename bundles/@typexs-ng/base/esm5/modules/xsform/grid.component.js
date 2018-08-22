/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GridRowComponent } from './grid-row.component';
import * as _ from '../../libs/LoDash';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { isFormObject } from '../../libs/xsform/FormObject';
var GridComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GridComponent, _super);
    function GridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entries = [];
        _this.header = [];
        return _this;
    }
    /**
     * @return {?}
     */
    GridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    GridComponent.prototype.addRow = /**
     * @param {?=} index
     * @return {?}
     */
    function (index) {
        if (index === void 0) { index = -1; }
        var /** @type {?} */ factory = this.r.resolveComponentFactory(GridRowComponent);
        var /** @type {?} */ cGridRow = this.vc.createComponent(factory);
        cGridRow.instance.data = this.data;
        cGridRow.instance.setGridComponent(this);
        cGridRow.instance.setData(this.elem, this.context, this.entries.length);
        this.entries.push(cGridRow);
        var /** @type {?} */ object = Reflect.construct(this.elem.getBinding().targetRef.getClass(), []);
        var /** @type {?} */ path = this.context.path();
        if (this.elem.getBinding().isCollection()) {
            var /** @type {?} */ arraySetted = _.get(this.data.instance, path, null);
            if (!arraySetted) {
                arraySetted = [];
            }
            arraySetted[cGridRow.instance.context.idx] = object;
            _.set(this.data.instance, path, arraySetted);
        }
        else {
            _.set(this.data.instance, path, object);
        }
        cGridRow.instance.build(this.elem);
        return cGridRow.instance;
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    GridComponent.prototype.removeRow = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        // TODO check if exists
        var /** @type {?} */ path = this.context.path();
        var /** @type {?} */ components = this.entries.splice(idx, 1);
        var /** @type {?} */ component = components.shift();
        this.vc.remove(idx);
        if (this.elem.getBinding().isCollection()) {
            var /** @type {?} */ arraySetted = _.get(this.data.instance, path, null);
            if (!arraySetted) {
                arraySetted = [];
            }
            arraySetted.splice(idx, 1);
            _.set(this.data.instance, path, arraySetted);
        }
        else {
            _.set(this.data.instance, path, null);
        }
        for (var /** @type {?} */ i = this.entries.length - 1; i >= 0; i--) {
            this.entries[i].instance.context.idx = i;
        }
        component.destroy();
    };
    /**
     * @param {?} form
     * @return {?}
     */
    GridComponent.prototype.build = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        this.context.labelDisplay = 'none';
        form.getChildren().forEach(function (obj) {
            if (isFormObject(obj)) {
                _this.header.push(obj.label);
            }
        });
        var /** @type {?} */ dataEntries = this.elem.getBinding().get(this.data.instance);
        var /** @type {?} */ c = this.addRow();
        return [c];
    };
    GridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xgrid',
                    templateUrl: './grid.component.html',
                },] },
    ];
    GridComponent = tslib_1.__decorate([
        ViewComponent('grid')
    ], GridComponent);
    return GridComponent;
}(AbstractFormComponent));
export { GridComponent };
function GridComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridComponent.ctorParameters;
    /** @type {?} */
    GridComponent.prototype.entries;
    /** @type {?} */
    GridComponent.prototype.header;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJtb2R1bGVzL3hzZm9ybS9ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRzlFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7SUFNbkMseUNBQTJCOzs7d0JBR2hCLEVBQUU7dUJBRTVCLEVBQUU7Ozs7OztJQUdwQixnQ0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFHRCw4QkFBTTs7OztJQUFOLFVBQU8sS0FBa0I7UUFBbEIsc0JBQUEsRUFBQSxTQUFpQixDQUFDO1FBQ3ZCLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0QscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4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QUFNLENBQUM7UUFHbkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDNUIsSUFBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUdILHFCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWpFLHFCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1o7O2dCQW5GRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3JDOztJQUNZLGFBQWE7UUFMekIsYUFBYSxDQUFDLE1BQU0sQ0FBQztPQUtULGFBQWEsRUFpRnpCO3dCQS9GRDtFQWNtQyxxQkFBcUI7U0FBM0MsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRSb3dDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1yb3cuY29tcG9uZW50JztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuQFZpZXdDb21wb25lbnQoJ2dyaWQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8R3JpZD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgZW50cmllczogQ29tcG9uZW50UmVmPEdyaWRSb3dDb21wb25lbnQ+W10gPSBbXTtcblxuICBoZWFkZXI6c3RyaW5nW10gPSBbXTtcblxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cblxuICBhZGRSb3coaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3JpZFJvd0NvbXBvbmVudCk7XG4gICAgbGV0IGNHcmlkUm93ID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBjR3JpZFJvdy5pbnN0YW5jZS5zZXRHcmlkQ29tcG9uZW50KHRoaXMpO1xuICAgIGNHcmlkUm93Lmluc3RhbmNlLnNldERhdGEodGhpcy5lbGVtLCB0aGlzLmNvbnRleHQsIHRoaXMuZW50cmllcy5sZW5ndGgpO1xuICAgIHRoaXMuZW50cmllcy5wdXNoKGNHcmlkUm93KTtcblxuICAgIGxldCBvYmplY3QgPSBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLmVsZW0uZ2V0QmluZGluZygpLnRhcmdldFJlZi5nZXRDbGFzcygpLCBbXSk7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIGlmICh0aGlzLmVsZW0uZ2V0QmluZGluZygpLmlzQ29sbGVjdGlvbigpKSB7XG4gICAgICBsZXQgYXJyYXlTZXR0ZWQgPSBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICAgICAgaWYgKCFhcnJheVNldHRlZCkge1xuICAgICAgICBhcnJheVNldHRlZCA9IFtdO1xuICAgICAgfVxuICAgICAgYXJyYXlTZXR0ZWRbY0dyaWRSb3cuaW5zdGFuY2UuY29udGV4dC5pZHhdID0gb2JqZWN0O1xuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgb2JqZWN0KTtcbiAgICB9XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuYnVpbGQodGhpcy5lbGVtKTtcbiAgICByZXR1cm4gY0dyaWRSb3cuaW5zdGFuY2U7XG4gIH1cblxuXG4gIHJlbW92ZVJvdyhpZHg6IG51bWJlcikge1xuICAgIC8vIFRPRE8gY2hlY2sgaWYgZXhpc3RzXG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuXG4gICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLmVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHMuc2hpZnQoKTtcblxuICAgIHRoaXMudmMucmVtb3ZlKGlkeCk7XG4gICAgaWYgKHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCkpIHtcbiAgICAgIGxldCBhcnJheVNldHRlZCA9IF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgICBpZiAoIWFycmF5U2V0dGVkKSB7XG4gICAgICAgIGFycmF5U2V0dGVkID0gW107XG4gICAgICB9XG4gICAgICBhcnJheVNldHRlZC5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5lbnRyaWVzW2ldLmluc3RhbmNlLmNvbnRleHQuaWR4ID0gaTtcbiAgICB9XG4gICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCk6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdIHtcbiAgICB0aGlzLmNvbnRleHQubGFiZWxEaXNwbGF5ID0gJ25vbmUnO1xuXG5cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgaWYoaXNGb3JtT2JqZWN0KG9iaikpe1xuICAgICAgICB0aGlzLmhlYWRlci5wdXNoKG9iai5sYWJlbCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGxldCBkYXRhRW50cmllcyA9IHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSk7XG5cbiAgICBsZXQgYyA9IHRoaXMuYWRkUm93KCk7XG4gICAgcmV0dXJuIFtjXTtcbiAgfVxuXG59XG4iXX0=