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
let GridComponent = class GridComponent extends AbstractFormComponent {
    constructor() {
        super(...arguments);
        this.entries = [];
        this.header = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    addRow(index = -1) {
        let /** @type {?} */ factory = this.r.resolveComponentFactory(GridRowComponent);
        let /** @type {?} */ cGridRow = this.vc.createComponent(factory);
        cGridRow.instance.data = this.data;
        cGridRow.instance.setGridComponent(this);
        cGridRow.instance.setData(this.elem, this.context, this.entries.length);
        this.entries.push(cGridRow);
        let /** @type {?} */ object = Reflect.construct(this.elem.getBinding().targetRef.getClass(), []);
        let /** @type {?} */ path = this.context.path();
        if (this.elem.getBinding().isCollection()) {
            let /** @type {?} */ arraySetted = _.get(this.data.instance, path, null);
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
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeRow(idx) {
        // TODO check if exists
        let /** @type {?} */ path = this.context.path();
        let /** @type {?} */ components = this.entries.splice(idx, 1);
        let /** @type {?} */ component = components.shift();
        this.vc.remove(idx);
        if (this.elem.getBinding().isCollection()) {
            let /** @type {?} */ arraySetted = _.get(this.data.instance, path, null);
            if (!arraySetted) {
                arraySetted = [];
            }
            arraySetted.splice(idx, 1);
            _.set(this.data.instance, path, arraySetted);
        }
        else {
            _.set(this.data.instance, path, null);
        }
        for (let /** @type {?} */ i = this.entries.length - 1; i >= 0; i--) {
            this.entries[i].instance.context.idx = i;
        }
        component.destroy();
    }
    /**
     * @param {?} form
     * @return {?}
     */
    build(form) {
        this.context.labelDisplay = 'none';
        form.getChildren().forEach(obj => {
            if (isFormObject(obj)) {
                this.header.push(obj.label);
            }
        });
        let /** @type {?} */ dataEntries = this.elem.getBinding().get(this.data.instance);
        let /** @type {?} */ c = this.addRow();
        return [c];
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJtb2R1bGVzL3hzZm9ybS9ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRzlFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RSxJQUthLGFBQWEsR0FMMUIsbUJBSzJCLFNBQVEscUJBQTJCOzs7dUJBR2hCLEVBQUU7c0JBRTVCLEVBQUU7Ozs7O0lBR3BCLFFBQVE7S0FDUDs7Ozs7SUFHRCxNQUFNLENBQUMsUUFBZ0IsQ0FBQyxDQUFDO1FBQ3ZCLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0QscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxJQUFJLENB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QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsSUFBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUdILHFCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWpFLHFCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1o7Q0FFRixDQUFBOztZQXJGQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFdBQVcsRUFBRSx1QkFBdUI7YUFDckM7O0FBQ1ksYUFBYTtJQUx6QixhQUFhLENBQUMsTUFBTSxDQUFDO0dBS1QsYUFBYSxFQWlGekI7U0FqRlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRSb3dDb21wb25lbnR9IGZyb20gJy4vZ3JpZC1yb3cuY29tcG9uZW50JztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvQWJzdHJhY3RDb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtT2JqZWN0LCBpc0Zvcm1PYmplY3R9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Zvcm1PYmplY3QnO1xuQFZpZXdDb21wb25lbnQoJ2dyaWQnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8R3JpZD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgZW50cmllczogQ29tcG9uZW50UmVmPEdyaWRSb3dDb21wb25lbnQ+W10gPSBbXTtcblxuICBoZWFkZXI6c3RyaW5nW10gPSBbXTtcblxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cblxuICBhZGRSb3coaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3JpZFJvd0NvbXBvbmVudCk7XG4gICAgbGV0IGNHcmlkUm93ID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBjR3JpZFJvdy5pbnN0YW5jZS5zZXRHcmlkQ29tcG9uZW50KHRoaXMpO1xuICAgIGNHcmlkUm93Lmluc3RhbmNlLnNldERhdGEodGhpcy5lbGVtLCB0aGlzLmNvbnRleHQsIHRoaXMuZW50cmllcy5sZW5ndGgpO1xuICAgIHRoaXMuZW50cmllcy5wdXNoKGNHcmlkUm93KTtcblxuICAgIGxldCBvYmplY3QgPSBSZWZsZWN0LmNvbnN0cnVjdCh0aGlzLmVsZW0uZ2V0QmluZGluZygpLnRhcmdldFJlZi5nZXRDbGFzcygpLCBbXSk7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIGlmICh0aGlzLmVsZW0uZ2V0QmluZGluZygpLmlzQ29sbGVjdGlvbigpKSB7XG4gICAgICBsZXQgYXJyYXlTZXR0ZWQgPSBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICAgICAgaWYgKCFhcnJheVNldHRlZCkge1xuICAgICAgICBhcnJheVNldHRlZCA9IFtdO1xuICAgICAgfVxuICAgICAgYXJyYXlTZXR0ZWRbY0dyaWRSb3cuaW5zdGFuY2UuY29udGV4dC5pZHhdID0gb2JqZWN0O1xuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgb2JqZWN0KTtcbiAgICB9XG4gICAgY0dyaWRSb3cuaW5zdGFuY2UuYnVpbGQodGhpcy5lbGVtKTtcbiAgICByZXR1cm4gY0dyaWRSb3cuaW5zdGFuY2U7XG4gIH1cblxuXG4gIHJlbW92ZVJvdyhpZHg6IG51bWJlcikge1xuICAgIC8vIFRPRE8gY2hlY2sgaWYgZXhpc3RzXG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuXG4gICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLmVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHMuc2hpZnQoKTtcblxuICAgIHRoaXMudmMucmVtb3ZlKGlkeCk7XG4gICAgaWYgKHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuaXNDb2xsZWN0aW9uKCkpIHtcbiAgICAgIGxldCBhcnJheVNldHRlZCA9IF8uZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgICBpZiAoIWFycmF5U2V0dGVkKSB7XG4gICAgICAgIGFycmF5U2V0dGVkID0gW107XG4gICAgICB9XG4gICAgICBhcnJheVNldHRlZC5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgXy5zZXQodGhpcy5kYXRhLmluc3RhbmNlLCBwYXRoLCBhcnJheVNldHRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5lbnRyaWVzW2ldLmluc3RhbmNlLmNvbnRleHQuaWR4ID0gaTtcbiAgICB9XG4gICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG5cbiAgYnVpbGQoZm9ybTogRm9ybU9iamVjdCk6QWJzdHJhY3RDb21wb25lbnQ8YW55PltdIHtcbiAgICB0aGlzLmNvbnRleHQubGFiZWxEaXNwbGF5ID0gJ25vbmUnO1xuXG5cbiAgICBmb3JtLmdldENoaWxkcmVuKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgaWYoaXNGb3JtT2JqZWN0KG9iaikpe1xuICAgICAgICB0aGlzLmhlYWRlci5wdXNoKG9iai5sYWJlbCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGxldCBkYXRhRW50cmllcyA9IHRoaXMuZWxlbS5nZXRCaW5kaW5nKCkuZ2V0KHRoaXMuZGF0YS5pbnN0YW5jZSk7XG5cbiAgICBsZXQgYyA9IHRoaXMuYWRkUm93KCk7XG4gICAgcmV0dXJuIFtjXTtcbiAgfVxuXG59XG4iXX0=