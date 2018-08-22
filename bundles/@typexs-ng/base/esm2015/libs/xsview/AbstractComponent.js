/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from '../../libs/LoDash';
import { ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { ContentComponentRegistry } from './ContentComponentRegistry';
const /** @type {?} */ PROP_METADATA = '__prop__metadata__';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
export class AbstractComponent {
    /**
     * @param {?} injector
     * @param {?} r
     */
    constructor(injector, r) {
        this.injector = injector;
        this.r = r;
        this.construct();
    }
    /**
     * @return {?}
     */
    construct() {
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    setElem(elem) {
        this.elem = elem;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    buildSingle(content) {
        const /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
        if (handle && handle.component) {
            if (this.vc) {
                const /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                const /** @type {?} */ compRef = this.vc.createComponent(factory);
                const /** @type {?} */ instance = /** @type {?} */ (compRef.instance);
                let /** @type {?} */ metadata = null;
                if (instance.constructor.hasOwnProperty(PROP_METADATA)) {
                    metadata = instance.constructor[PROP_METADATA];
                }
                instance.setElem(content);
                if (instance.build) {
                    let /** @type {?} */ refs = instance.build(content);
                    if (metadata) {
                        Object.keys(metadata).forEach(key => {
                            let /** @type {?} */ v = metadata[key];
                            if (!_.isEmpty(v)) {
                                if (_.isArray(v) && v.length === 1) {
                                    let /** @type {?} */ propDecorator = _.first(v);
                                    if (_.isFunction(propDecorator.selector)) {
                                        if (propDecorator.first) {
                                            // simple ViewChild
                                            instance[key] = _.find(refs, ref => ref.constructor == propDecorator.selector);
                                            instance[key + '2'] = _.find(refs, ref => ref.constructor == propDecorator.selector);
                                        }
                                        else {
                                            // simple ViewChildren
                                            instance[key] = _.filter(refs, ref => ref.constructor == propDecorator.selector);
                                            instance[key + '2'] = _.filter(refs, ref => ref.constructor == propDecorator.selector);
                                        }
                                    }
                                }
                                else {
                                    console.error('can\'t resolve metadata', instance.constructor, key, v);
                                }
                            }
                        });
                    }
                }
                return instance;
            }
            else {
                console.error('No view content setted');
            }
        }
        else {
            throw new NoFormTypeDefinedError(content.type);
        }
        return null;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    build(content) {
        let /** @type {?} */ refs = [];
        content.getChildren().forEach(contentObject => {
            let /** @type {?} */ ref = this.buildSingle(/** @type {?} */ (contentObject));
            refs.push(ref);
        });
        return refs;
    }
}
/** @nocollapse */
AbstractComponent.ctorParameters = () => [
    { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
    { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
];
AbstractComponent.propDecorators = {
    "vc": [{ type: ViewChild, args: ['content', { read: ViewContainerRef },] },],
};
function AbstractComponent_tsickle_Closure_declarations() {
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AbstractComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AbstractComponent.propDecorators;
    /** @type {?} */
    AbstractComponent.prototype.context;
    /** @type {?} */
    AbstractComponent.prototype.elem;
    /** @type {?} */
    AbstractComponent.prototype.vc;
    /** @type {?} */
    AbstractComponent.prototype.injector;
    /** @type {?} */
    AbstractComponent.prototype.r;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJsaWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFFcEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFcEUsdUJBQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDOzs7Ozs7QUFFM0MsTUFBTTs7Ozs7SUFTSixZQUFxQyxVQUNnQjtRQURoQixhQUFRLEdBQVIsUUFBUTtRQUNRLE1BQUMsR0FBRCxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNsQjs7OztJQUVELFNBQVM7S0FDUjs7Ozs7SUFFUyxPQUFPLENBQUMsSUFBTztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNsQjs7Ozs7SUFHRCxXQUFXLENBQUMsT0FBVTtRQUdwQix1QkFBTSxNQUFNLEdBQUcsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1lBRzlCLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFFWCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsbUJBQU0sTUFBTSxDQUFDLFNBQVMsRUFBQyxDQUFDO2dCQUN0RSx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FB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LENBQUM7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztLQUNiOzs7O1lBakd1QyxRQUFRLHVCQWlCbkMsTUFBTSxTQUFDLFFBQVE7WUFqQnRCLHdCQUF3Qix1QkFrQmpCLE1BQU0sU0FBQyx3QkFBd0I7OzttQkFKM0MsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQge05vRm9ybVR5cGVEZWZpbmVkRXJyb3J9IGZyb20gJy4uLy4uL2xpYnMvZXhjZXB0aW9ucy9Ob0Zvcm1UeXBlRGVmaW5lZEVycm9yJztcbmltcG9ydCB7VHJlZU9iamVjdH0gZnJvbSAnLi9UcmVlT2JqZWN0JztcbmltcG9ydCB7Q29udGVudENvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICcuL0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeSc7XG5cbmNvbnN0IFBST1BfTUVUQURBVEEgPSAnX19wcm9wX19tZXRhZGF0YV9fJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29tcG9uZW50PFQgZXh0ZW5kcyBUcmVlT2JqZWN0PiB7XG5cbiAgY29udGV4dDogQ29udGV4dDtcblxuICBlbGVtOiBUO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHZjOiBWaWV3Q29udGFpbmVyUmVmO1xuXG5cbiAgY29uc3RydWN0b3IoQEluamVjdChJbmplY3RvcikgcHVibGljIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHB1YmxpYyByOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB0aGlzLmNvbnN0cnVjdCgpO1xuICB9XG5cbiAgY29uc3RydWN0KCkge1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldEVsZW0oZWxlbTogVCkge1xuICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gIH1cblxuXG4gIGJ1aWxkU2luZ2xlKGNvbnRlbnQ6IFQpOiBBYnN0cmFjdENvbXBvbmVudDxUPiB7XG5cblxuICAgIGNvbnN0IGhhbmRsZSA9IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeS4kKCkuZ2V0T3JDcmVhdGVEZWYoY29udGVudC50eXBlKTtcbiAgICBpZiAoaGFuZGxlICYmIGhhbmRsZS5jb21wb25lbnQpIHtcblxuXG4gICAgICBpZiAodGhpcy52Yykge1xuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoPGFueT5oYW5kbGUuY29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY29tcFJlZiA9IHRoaXMudmMuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IDxBYnN0cmFjdENvbXBvbmVudDxUPj5jb21wUmVmLmluc3RhbmNlO1xuXG4gICAgICAgIGxldCBtZXRhZGF0YTogeyBbazogc3RyaW5nXTogYW55IH0gPSBudWxsO1xuICAgICAgICBpZiAoaW5zdGFuY2UuY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoUFJPUF9NRVRBREFUQSkpIHtcbiAgICAgICAgICBtZXRhZGF0YSA9IGluc3RhbmNlLmNvbnN0cnVjdG9yW1BST1BfTUVUQURBVEFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5zdGFuY2Uuc2V0RWxlbShjb250ZW50KTtcblxuICAgICAgICBpZiAoaW5zdGFuY2UuYnVpbGQpIHtcbiAgICAgICAgICBsZXQgcmVmcyA9IGluc3RhbmNlLmJ1aWxkKGNvbnRlbnQpO1xuXG4gICAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtZXRhZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICBsZXQgdiA9IG1ldGFkYXRhW2tleV07XG4gICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHYpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KHYpICYmIHYubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgcHJvcERlY29yYXRvciA9IF8uZmlyc3Qodik7XG4gICAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wRGVjb3JhdG9yLmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gc2ltcGxlIFZpZXdDaGlsZFxuICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW2tleV0gPSBfLmZpbmQocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXkgKyAnMiddID0gXy5maW5kKHJlZnMsIHJlZiA9PiByZWYuY29uc3RydWN0b3IgPT0gcHJvcERlY29yYXRvci5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gc2ltcGxlIFZpZXdDaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW2tleV0gPSBfLmZpbHRlcihyZWZzLCByZWYgPT4gcmVmLmNvbnN0cnVjdG9yID09IHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW2tleSArICcyJ10gPSBfLmZpbHRlcihyZWZzLCByZWYgPT4gcmVmLmNvbnN0cnVjdG9yID09IHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NhblxcJ3QgcmVzb2x2ZSBtZXRhZGF0YScsIGluc3RhbmNlLmNvbnN0cnVjdG9yLCBrZXksIHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHZpZXcgY29udGVudCBzZXR0ZWQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IE5vRm9ybVR5cGVEZWZpbmVkRXJyb3IoY29udGVudC50eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG5cbiAgfVxuXG5cbiAgYnVpbGQoY29udGVudDogVCk6IEFic3RyYWN0Q29tcG9uZW50PFQ+W10ge1xuICAgIGxldCByZWZzOiBBYnN0cmFjdENvbXBvbmVudDxUPltdID0gW107XG4gICAgY29udGVudC5nZXRDaGlsZHJlbigpLmZvckVhY2goY29udGVudE9iamVjdCA9PiB7XG4gICAgICBsZXQgcmVmID0gdGhpcy5idWlsZFNpbmdsZSg8VD5jb250ZW50T2JqZWN0KTtcbiAgICAgIHJlZnMucHVzaChyZWYpO1xuICAgIH0pO1xuICAgIHJldHVybiByZWZzO1xuICB9XG5cbn1cbiJdfQ==