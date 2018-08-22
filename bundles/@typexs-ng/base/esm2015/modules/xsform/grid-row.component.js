/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding } from '@angular/core';
import { GridCellComponent } from './grid-cell.component';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { isFormObject } from '../../libs/xsform/FormObject';
import { ContentComponentRegistry } from '../../libs/xsview/ContentComponentRegistry';
export class GridRowComponent extends AbstractFormComponent {
    /**
     * @param {?} grid
     * @return {?}
     */
    setGridComponent(grid) {
        this.grid = grid;
    }
    /**
     * @return {?}
     */
    get hostClasses() {
        return [
            'form-row'
        ].join(' ');
    }
    /**
     * @return {?}
     */
    get idx() {
        return this.context.idx;
    }
    /**
     * @return {?}
     */
    removeRow() {
        this.grid.removeRow(this.context.idx);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    build(form) {
        let /** @type {?} */ comp = [];
        form.getChildren().forEach(formObject => {
            if (isFormObject(formObject)) {
                let /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(formObject.type);
                if (handle && handle.component) {
                    let /** @type {?} */ cGridCellFactory = this.r.resolveComponentFactory(GridCellComponent);
                    let /** @type {?} */ cGridCell = this.vc.createComponent(cGridCellFactory);
                    cGridCell.instance.data = this.data;
                    cGridCell.instance.setGridComponent(this.grid);
                    cGridCell.instance.setData(formObject, this.context);
                    if (cGridCell.instance.vc) {
                        let /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        let /** @type {?} */ ref = cGridCell.instance.vc.createComponent(factory);
                        let /** @type {?} */ instance = /** @type {?} */ (ref.instance);
                        instance.data = this.data;
                        instance.setData(formObject, this.context);
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
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibW9kdWxlcy94c2Zvcm0vZ3JpZC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVyRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFdEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFPcEYsTUFBTSx1QkFBd0IsU0FBUSxxQkFBMEI7Ozs7O0lBSTlELGdCQUFnQixDQUFDLElBQW1CO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOzs7O1FBR0csV0FBVztRQUNiLE9BQU87WUFDTCxVQUFVO1NBQ1gsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O0lBSWQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztLQUN6Qjs7OztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZDOzs7OztJQUVELEtBQUssQ0FBQyxJQUFnQjtRQUNwQixxQkFBSSxJQUFJLEdBQTRCLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBRXRDLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QixxQkFBSSxNQUFNLEdBQUcsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtvQkFFOUIscUJBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUN6RSxxQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDMUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9DLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRXJELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7d0JBQ3pCLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixtQkFBTSxNQUFNLENBQUMsU0FBUyxFQUFDLENBQUM7d0JBQ3BFLHFCQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pELHFCQUFJLFFBQVEscUJBQStCLEdBQUcsQ0FBQyxRQUFRLENBQUEsQ0FBQzt3QkFDeEQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUMxQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzNDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztxQkFDekM7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkQ7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0tBQ2I7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFdBQVcsRUFBRSwyQkFBMkI7YUFDekM7Ozs7NEJBU0UsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmd9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkQ29tcG9uZW50fSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7R3JpZENlbGxDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQge05vRm9ybVR5cGVEZWZpbmVkRXJyb3J9IGZyb20gJy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzZm9ybS9BYnN0cmFjdEZvcm1Db21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWRyb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4ge1xuXG4gIHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudDtcblxuICBzZXRHcmlkQ29tcG9uZW50KGdyaWQ6IEdyaWRDb21wb25lbnQpIHtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBob3N0Q2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnZm9ybS1yb3cnXG4gICAgXS5qb2luKCcgJyk7XG4gIH1cblxuXG4gIGdldCBpZHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZHg7XG4gIH1cblxuICByZW1vdmVSb3coKSB7XG4gICAgdGhpcy5ncmlkLnJlbW92ZVJvdyh0aGlzLmNvbnRleHQuaWR4KTtcbiAgfVxuXG4gIGJ1aWxkKGZvcm06IEZvcm1PYmplY3QpOkFic3RyYWN0Q29tcG9uZW50PGFueT5bXSB7XG4gICAgbGV0IGNvbXA6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdID0gW11cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChmb3JtT2JqZWN0ID0+IHtcblxuICAgICAgaWYgKGlzRm9ybU9iamVjdChmb3JtT2JqZWN0KSkge1xuICAgICAgICBsZXQgaGFuZGxlID0gQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LiQoKS5nZXRPckNyZWF0ZURlZihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcblxuICAgICAgICAgIGxldCBjR3JpZENlbGxGYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEdyaWRDZWxsQ29tcG9uZW50KTtcbiAgICAgICAgICBsZXQgY0dyaWRDZWxsID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoY0dyaWRDZWxsRmFjdG9yeSk7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgY0dyaWRDZWxsLmluc3RhbmNlLnNldEdyaWRDb21wb25lbnQodGhpcy5ncmlkKTtcbiAgICAgICAgICBjR3JpZENlbGwuaW5zdGFuY2Uuc2V0RGF0YShmb3JtT2JqZWN0LCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNHcmlkQ2VsbC5pbnN0YW5jZS52Yykge1xuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCByZWYgPSBjR3JpZENlbGwuaW5zdGFuY2UudmMuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gPEFic3RyYWN0Rm9ybUNvbXBvbmVudDxhbnk+PnJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXREYXRhKGZvcm1PYmplY3QsIHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICBpbnN0YW5jZS5idWlsZChmb3JtT2JqZWN0KTtcbiAgICAgICAgICAgIGNvbXAucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHZpZXcgY29udGVudCBzZXR0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoZm9ybU9iamVjdC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wO1xuICB9XG5cbn1cbiJdfQ==