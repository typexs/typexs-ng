/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormObject, isFormObject } from '../FormObject';
import * as _ from '../../../libs/LoDash';
import { ViewContent } from '../../xsview/decorators/ViewContent';
let Ref = class Ref extends FormObject {
    /**
     * @return {?}
     */
    postProcess() {
        this.getForm()['resolver'].push(this);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    resolve(form) {
        let /** @type {?} */ elem = form.get(this.use);
        if (isFormObject(elem)) {
            let /** @type {?} */ e = _.clone(elem);
            this.replace(e);
            // copy properties
            this.getUsedKeys().forEach(k => {
                e.handle(k, this[k]);
            });
        }
    }
};
Ref = tslib_1.__decorate([
    ViewContent('ref')
], Ref);
export { Ref };
function Ref_tsickle_Closure_declarations() {
    /** @type {?} */
    Ref.prototype.use;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibGlicy94c2Zvcm0vZWxlbWVudHMvUmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJdkQsT0FBTyxLQUFLLENBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFFaEUsSUFDYSxHQUFHLEdBRGhCLFNBQ2lCLFNBQVEsVUFBVTs7OztJQUlqQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2Qzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBVTtRQUNoQixxQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDcEIscUJBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDN0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1NBRUo7S0FFRjtDQUNGLENBQUE7QUF0QlksR0FBRztJQURmLFdBQVcsQ0FBQyxLQUFLLENBQUM7R0FDTixHQUFHLEVBc0JmO1NBdEJZLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zvcm1PYmplY3QsIGlzRm9ybU9iamVjdH0gZnJvbSAnLi4vRm9ybU9iamVjdCc7XG5pbXBvcnQge0lSZXNvbHZlcn0gZnJvbSAnLi4vSVJlc29sdmVyJztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9Gb3JtJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi8uLi8uLi9saWJzL0xvRGFzaCc7XG5pbXBvcnQge1ZpZXdDb250ZW50fSBmcm9tICcuLi8uLi94c3ZpZXcvZGVjb3JhdG9ycy9WaWV3Q29udGVudCc7XG5cbkBWaWV3Q29udGVudCgncmVmJylcbmV4cG9ydCBjbGFzcyBSZWYgZXh0ZW5kcyBGb3JtT2JqZWN0IGltcGxlbWVudHMgSVJlc29sdmVyIHtcblxuICB1c2U6IHN0cmluZztcblxuICBwb3N0UHJvY2VzcygpIHtcbiAgICB0aGlzLmdldEZvcm0oKVsncmVzb2x2ZXInXS5wdXNoKHRoaXMpO1xuICB9XG5cbiAgcmVzb2x2ZShmb3JtOiBGb3JtKSB7XG4gICAgbGV0IGVsZW0gPSBmb3JtLmdldCh0aGlzLnVzZSk7XG4gICAgaWYoaXNGb3JtT2JqZWN0KGVsZW0pKXtcbiAgICAgIGxldCBlID0gXy5jbG9uZShlbGVtKTtcbiAgICAgIHRoaXMucmVwbGFjZShlKTtcblxuICAgICAgLy8gY29weSBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLmdldFVzZWRLZXlzKCkuZm9yRWFjaChrID0+IHtcbiAgICAgICAgZS5oYW5kbGUoaywgdGhpc1trXSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG59XG5cblxuXG5cbiJdfQ==