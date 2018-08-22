/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
var GridCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GridCellComponent, _super);
    function GridCellComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GridCellComponent.prototype, "hostClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return [
                'col'
            ].join(' ');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grid
     * @return {?}
     */
    GridCellComponent.prototype.setGridComponent = /**
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        this.grid = grid;
    };
    GridCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xgridcell',
                    templateUrl: './grid-cell.component.html',
                },] },
    ];
    /** @nocollapse */
    GridCellComponent.propDecorators = {
        "hostClasses": [{ type: HostBinding, args: ['class',] },],
    };
    return GridCellComponent;
}(AbstractFormComponent));
export { GridCellComponent };
function GridCellComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridCellComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridCellComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    GridCellComponent.propDecorators;
    /** @type {?} */
    GridCellComponent.prototype.grid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMveHNmb3JtL2dyaWQtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7SUFPdkMsNkNBQTBCOzs7OzBCQUs1RCwwQ0FBVzs7Ozs7WUFDZCxPQUFPO2dCQUNMLEtBQUs7YUFDTixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBR1osNENBQWdCOzs7O0lBQWhCLFVBQWlCLElBQW1CO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOztnQkFqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixXQUFXLEVBQUUsNEJBQTRCO2lCQUMxQzs7OztnQ0FLRSxXQUFXLFNBQUMsT0FBTzs7NEJBYnRCO0VBU3VDLHFCQUFxQjtTQUEvQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3hncmlkY2VsbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLWNlbGwuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ2VsbENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+IHtcblxuICBwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG5cdGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBbXG5cdFx0ICAnY29sJ1xuXHRcdF0uam9pbignICcpO1xuXHR9XG5cbiAgc2V0R3JpZENvbXBvbmVudChncmlkOiBHcmlkQ29tcG9uZW50KSB7XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG5cblxuXG59XG4iXX0=