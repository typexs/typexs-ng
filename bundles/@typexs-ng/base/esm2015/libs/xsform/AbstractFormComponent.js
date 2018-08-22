/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class AbstractFormComponent extends AbstractComponent {
    constructor() {
        super(...arguments);
        this.inc = 0;
    }
    /**
     * @return {?}
     */
    construct() {
        this.inc = AbstractFormComponent._inc++;
    }
    /**
     * @return {?}
     */
    get id() {
        return this.elem.id;
    }
    /**
     * @return {?}
     */
    get name() {
        return this.elem.name;
    }
    /**
     * @return {?}
     */
    get label() {
        return this.elem.label;
    }
    /**
     * @return {?}
     */
    get labelDisplay() {
        return this.context.get('labelDisplay', 'top');
    }
    /**
     * @return {?}
     */
    get help() {
        return this.elem.help;
    }
    /**
     * @return {?}
     */
    get isReadOnly() {
        return this.elem.readonly;
    }
    /**
     * @return {?}
     */
    get isValid() {
        return this.data.checked(this.name) && this.data.valid(this.name);
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    setFormObject(elem) {
        this.setElem(elem);
    }
    /**
     * @param {?} elem
     * @param {?} parent
     * @param {?=} idx
     * @return {?}
     */
    setData(elem, parent, idx = -1) {
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
    }
    /**
     * @return {?}
     */
    get value() {
        let /** @type {?} */ path = this.context.path();
        return _.get(this.data.instance, path, null);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        let /** @type {?} */ path = this.context.path();
        _.set(this.data.instance, path, v);
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
                    if (this.vc) {
                        let /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                        let /** @type {?} */ ref = this.vc.createComponent(factory);
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
AbstractFormComponent._inc = 0;
function AbstractFormComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractFormComponent._inc;
    /** @type {?} */
    AbstractFormComponent.prototype.data;
    /** @type {?} */
    AbstractFormComponent.prototype.inc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RGb3JtQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7O0FBRzFDLE1BQU0sNEJBQTRELFNBQVEsaUJBQW9COzs7bUJBTzlFLENBQUM7Ozs7O0lBSWYsU0FBUztRQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekM7Ozs7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ3JCOzs7O0lBR0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUN2Qjs7OztJQUdELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDeEI7Ozs7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoRDs7OztJQUdELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFD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QUMsd0JBQXdCLENBQUMsQ0FBQztxQkFDekM7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkQ7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0tBQ2I7OzZCQXZHcUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGF0YUNvbnRhaW5lcn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL0RhdGFDb250YWluZXInO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7UHJvcGVydHlEZWZ9IGZyb20gJ3R5cGV4cy1zY2hlbWEvbGlicy9Qcm9wZXJ0eURlZic7XG5cbmltcG9ydCB7Tm9Gb3JtVHlwZURlZmluZWRFcnJvcn0gZnJvbSAnLi4vLi4vbGlicy9leGNlcHRpb25zL05vRm9ybVR5cGVEZWZpbmVkRXJyb3InO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvbmVudH0gZnJvbSAnLi4veHN2aWV3L0Fic3RyYWN0Q29tcG9uZW50JztcbmltcG9ydCB7Rm9ybU9iamVjdCwgaXNGb3JtT2JqZWN0fSBmcm9tICcuL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtDb250ZW50Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uL3hzdmlldy9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi94c3ZpZXcvQ29udGV4dCc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Rm9ybUNvbXBvbmVudDxUIGV4dGVuZHMgRm9ybU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiB7XG5cbiAgc3RhdGljIF9pbmM6IG51bWJlciA9IDA7XG5cblxuICBkYXRhOiBEYXRhQ29udGFpbmVyPGFueT47XG5cbiAgaW5jOiBudW1iZXIgPSAwO1xuXG5cblxuICBjb25zdHJ1Y3QoKXtcbiAgICB0aGlzLmluYyA9IEFic3RyYWN0Rm9ybUNvbXBvbmVudC5faW5jKys7XG4gIH1cblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5pZDtcbiAgfVxuXG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5uYW1lO1xuICB9XG5cblxuICBnZXQgbGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5sYWJlbDtcbiAgfVxuXG5cbiAgZ2V0IGxhYmVsRGlzcGxheSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldCgnbGFiZWxEaXNwbGF5JywgJ3RvcCcpO1xuICB9XG5cblxuICBnZXQgaGVscCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLmhlbHA7XG4gIH1cblxuXG4gIGdldCBpc1JlYWRPbmx5KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0ucmVhZG9ubHk7XG4gIH1cblxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuY2hlY2tlZCh0aGlzLm5hbWUpICYmIHRoaXMuZGF0YS52YWxpZCh0aGlzLm5hbWUpO1xuICB9XG5cblxuICBwcm90ZWN0ZWQgc2V0Rm9ybU9iamVjdChlbGVtOiBUKSB7XG4gICAgdGhpcy5zZXRFbGVtKGVsZW0pO1xuICB9XG5cblxuICBzZXREYXRhKGVsZW06IFQsIHBhcmVudDogQ29udGV4dCwgaWR4OiBudW1iZXIgPSAtMSkge1xuICAgIHRoaXMuc2V0Rm9ybU9iamVjdChlbGVtKTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBwYXJlbnQuY2hpbGQoZWxlbS5uYW1lLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuICAgICAgaWYgKGVsZW0uZ2V0QmluZGluZygpIGluc3RhbmNlb2YgUHJvcGVydHlEZWYpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5hbWUgPSBlbGVtLm5hbWU7XG4gICAgICAgIHRoaXMuY29udGV4dC5pZHggPSBpZHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIHJldHVybiBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIHBhdGgsIG51bGwpO1xuICB9XG5cblxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgbGV0IHBhdGggPSB0aGlzLmNvbnRleHQucGF0aCgpO1xuICAgIF8uc2V0KHRoaXMuZGF0YS5pbnN0YW5jZSwgcGF0aCwgdik7XG4gIH1cblxuXG4gIGJ1aWxkKGZvcm06IEZvcm1PYmplY3QpIDogQWJzdHJhY3RDb21wb25lbnQ8VD5bXSB7XG4gICAgbGV0IGNvbXA6QWJzdHJhY3RDb21wb25lbnQ8VD5bXSA9IFtdXG4gICAgZm9ybS5nZXRDaGlsZHJlbigpLmZvckVhY2goZm9ybU9iamVjdCA9PiB7XG4gICAgICBpZiAoaXNGb3JtT2JqZWN0KGZvcm1PYmplY3QpKSB7XG5cbiAgICAgICAgbGV0IGhhbmRsZSA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS4kKCkuZ2V0T3JDcmVhdGVEZWYoZm9ybU9iamVjdC50eXBlKTtcbiAgICAgICAgaWYgKGhhbmRsZSAmJiBoYW5kbGUuY29tcG9uZW50KSB7XG4gICAgICAgICAgaWYgKHRoaXMudmMpIHtcbiAgICAgICAgICAgIGxldCBmYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxhbnk+aGFuZGxlLmNvbXBvbmVudCk7XG4gICAgICAgICAgICBsZXQgcmVmID0gdGhpcy52Yy5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSA8QWJzdHJhY3RGb3JtQ29tcG9uZW50PGFueT4+cmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGluc3RhbmNlLnNldERhdGEoZm9ybU9iamVjdCwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIGluc3RhbmNlLmJ1aWxkKGZvcm1PYmplY3QpO1xuICAgICAgICAgICAgY29tcC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdmlldyBjb250ZW50IHNldHRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTm9Gb3JtVHlwZURlZmluZWRFcnJvcihmb3JtT2JqZWN0LnR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxufVxuIl19