/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding } from '@angular/core';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
export class GridCellComponent extends AbstractFormComponent {
    /**
     * @return {?}
     */
    get hostClasses() {
        return [
            'col'
        ].join(' ');
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    setGridComponent(grid) {
        this.grid = grid;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMveHNmb3JtL2dyaWQtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBTzlFLE1BQU0sd0JBQXlCLFNBQVEscUJBQTBCOzs7O1FBSzVELFdBQVc7UUFDZCxPQUFPO1lBQ0wsS0FBSztTQUNOLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFHWixnQkFBZ0IsQ0FBQyxJQUFtQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNsQjs7O1lBakJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsV0FBVyxFQUFFLDRCQUE0QjthQUMxQzs7Ozs0QkFLRSxXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZ30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRDb21wb25lbnR9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWRjZWxsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtY2VsbC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDZWxsQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4ge1xuXG4gIHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcblx0Z2V0IGhvc3RDbGFzc2VzKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIFtcblx0XHQgICdjb2wnXG5cdFx0XS5qb2luKCcgJyk7XG5cdH1cblxuICBzZXRHcmlkQ29tcG9uZW50KGdyaWQ6IEdyaWRDb21wb25lbnQpIHtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cblxuXG5cbn1cbiJdfQ==