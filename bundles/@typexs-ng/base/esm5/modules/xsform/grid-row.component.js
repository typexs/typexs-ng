/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { GridCellComponent } from './grid-cell.component';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { isFormObject } from '../../libs/xsform/FormObject';
import { ContentComponentRegistry } from '../../libs/xsview/ContentComponentRegistry';
var GridRowComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GridRowComponent, _super);
    function GridRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    GridRowComponent.prototype.setGridComponent = /**
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        this.grid = grid;
    };
    Object.defineProperty(GridRowComponent.prototype, "hostClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return [
                'form-row'
            ].join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridRowComponent.prototype, "idx", {
        get: /**
         * @return {?}
         */
        function () {
            return this.context.idx;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GridRowComponent.prototype.removeRow = /**
     * @return {?}
     */
    function () {
        this.grid.removeRow(this.context.idx);
    };
    /**
     * @param {?} form
     * @return {?}
     */
    GridRowComponent.prototype.build = /**
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
                    var /** @type {?} */ cGridCellFactory = _this.r.resolveComponentFactory(GridCellComponent);
                    var /** @type {?} */ cGridCell = _this.vc.createComponent(cGridCellFactory);
                    cGridCell.instance.data = _this.data;
                    cGridCell.instance.setGridComponent(_this.grid);
                    cGridCell.instance.setData(formObject, _this.context);
                    if (cGridCell.instance.vc) {
                        var /** @type {?} */ factory = _this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        var /** @type {?} */ ref = cGridCell.instance.vc.createComponent(factory);
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
    GridRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xgridrow',
                    templateUrl: './grid-row.component.html',
                },] },
    ];
    /** @nocollapse */
    GridRowComponent.propDecorators = {
        "hostClasses": [{ type: HostBinding, args: ['class',] },],
    };
    return GridRowComponent;
}(AbstractFormComponent));
export { GridRowComponent };
function GridRowComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridRowComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridRowComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    GridRowComponent.propDecorators;
    /** @type {?} */
    GridRowComponent.prototype.grid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vZ3JpZC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDcEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDRDQUE0QyxDQUFDOztJQU85Qyw0Q0FBMEI7Ozs7Ozs7O0lBSTlELDJDQUFnQjs7OztJQUFoQixVQUFpQixJQUFtQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNsQjswQkFHRyx5Q0FBVzs7Ozs7WUFDYixPQUFPO2dCQUNMLFVBQVU7YUFDWCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFJZCxzQkFBSSxpQ0FBRzs7OztRQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUN6Qjs7O09BQUE7Ozs7SUFFRCxvQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZDOzs7OztJQUVELGdDQUFLOzs7O0lBQUwsVUFBTSxJQUFnQjtRQUF0QixpQkErQkM7UUE5QkMscUJBQUksSUFBSSxHQUE0QixFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7WUFFbkMsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVCLHFCQUFJLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUU5QixxQkFBSSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3pFLHFCQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMxRCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFckQsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTt3QkFDekIscUJBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxDQUFDLENBQUMsdUJBQXVCLG1CQUFNLE1BQU0sQ0FBQyxTQUFTLEVBQUMsQ0FBQzt3QkFDcEUscUJBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekQscUJBQUksUUFBUSxxQkFBK0IsR0FBRyxDQUFDLFFBQVEsQ0FBQSxDQUFDO3dCQUN4RCxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzFCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDM0MsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDckI7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3FCQUN6QztpQkFDRjtxQkFBTTtvQkFDTCxNQUFNLElBQUksc0JBQXNCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuRDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7S0FDYjs7Z0JBM0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsV0FBVyxFQUFFLDJCQUEyQjtpQkFDekM7Ozs7Z0NBU0UsV0FBVyxTQUFDLE9BQU87OzJCQXRCdEI7RUFjc0MscUJBQXFCO1NBQTlDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZ30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRDb21wb25lbnR9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtHcmlkQ2VsbENvbXBvbmVudH0gZnJvbSAnLi9ncmlkLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7Tm9Gb3JtVHlwZURlZmluZWRFcnJvcn0gZnJvbSAnLi4vLi4vbGlicy9leGNlcHRpb25zL05vRm9ybVR5cGVEZWZpbmVkRXJyb3InO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1PYmplY3QsIGlzRm9ybU9iamVjdH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vRm9ybU9iamVjdCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Z3JpZHJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXJvdy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRSb3dDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8YW55PiB7XG5cbiAgcHJpdmF0ZSBncmlkOiBHcmlkQ29tcG9uZW50O1xuXG4gIHNldEdyaWRDb21wb25lbnQoZ3JpZDogR3JpZENvbXBvbmVudCkge1xuICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhvc3RDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdmb3JtLXJvdydcbiAgICBdLmpvaW4oJyAnKTtcbiAgfVxuXG5cbiAgZ2V0IGlkeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmlkeDtcbiAgfVxuXG4gIHJlbW92ZVJvdygpIHtcbiAgICB0aGlzLmdyaWQucmVtb3ZlUm93KHRoaXMuY29udGV4dC5pZHgpO1xuICB9XG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCk6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdIHtcbiAgICBsZXQgY29tcDpBYnN0cmFjdENvbXBvbmVudDxhbnk+W10gPSBbXVxuICAgIGZvcm0uZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGZvcm1PYmplY3QgPT4ge1xuXG4gICAgICBpZiAoaXNGb3JtT2JqZWN0KGZvcm1PYmplY3QpKSB7XG4gICAgICAgIGxldCBoYW5kbGUgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuJCgpLmdldE9yQ3JlYXRlRGVmKGZvcm1PYmplY3QudHlwZSk7XG4gICAgICAgIGlmIChoYW5kbGUgJiYgaGFuZGxlLmNvbXBvbmVudCkge1xuXG4gICAgICAgICAgbGV0IGNHcmlkQ2VsbEZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3JpZENlbGxDb21wb25lbnQpO1xuICAgICAgICAgIGxldCBjR3JpZENlbGwgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChjR3JpZENlbGxGYWN0b3J5KTtcbiAgICAgICAgICBjR3JpZENlbGwuaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICBjR3JpZENlbGwuaW5zdGFuY2Uuc2V0R3JpZENvbXBvbmVudCh0aGlzLmdyaWQpO1xuICAgICAgICAgIGNHcmlkQ2VsbC5pbnN0YW5jZS5zZXREYXRhKGZvcm1PYmplY3QsIHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY0dyaWRDZWxsLmluc3RhbmNlLnZjKSB7XG4gICAgICAgICAgICBsZXQgZmFjdG9yeSA9IHRoaXMuci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSg8YW55PmhhbmRsZS5jb21wb25lbnQpO1xuICAgICAgICAgICAgbGV0IHJlZiA9IGNHcmlkQ2VsbC5pbnN0YW5jZS52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSA8QWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4+cmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGluc3RhbmNlLnNldERhdGEoZm9ybU9iamVjdCwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIGluc3RhbmNlLmJ1aWxkKGZvcm1PYmplY3QpO1xuICAgICAgICAgICAgY29tcC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdmlldyBjb250ZW50IHNldHRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxufVxuIl19