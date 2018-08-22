/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from '../../libs/LoDash';
import { ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFormTypeDefinedError } from '../../libs/exceptions/NoFormTypeDefinedError';
import { ContentComponentRegistry } from './ContentComponentRegistry';
var /** @type {?} */ PROP_METADATA = '__prop__metadata__';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var AbstractComponent = /** @class */ (function () {
    function AbstractComponent(injector, r) {
        this.injector = injector;
        this.r = r;
        this.construct();
    }
    /**
     * @return {?}
     */
    AbstractComponent.prototype.construct = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    AbstractComponent.prototype.setElem = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        this.elem = elem;
    };
    /**
     * @param {?} content
     * @return {?}
     */
    AbstractComponent.prototype.buildSingle = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        var /** @type {?} */ handle = ContentComponentRegistry.$().getOrCreateDef(content.type);
        if (handle && handle.component) {
            if (this.vc) {
                var /** @type {?} */ factory = this.r.resolveComponentFactory(/** @type {?} */ (handle.component));
                var /** @type {?} */ compRef = this.vc.createComponent(factory);
                var /** @type {?} */ instance_1 = /** @type {?} */ (compRef.instance);
                var /** @type {?} */ metadata_1 = null;
                if (instance_1.constructor.hasOwnProperty(PROP_METADATA)) {
                    metadata_1 = instance_1.constructor[PROP_METADATA];
                }
                instance_1.setElem(content);
                if (instance_1.build) {
                    var /** @type {?} */ refs_1 = instance_1.build(content);
                    if (metadata_1) {
                        Object.keys(metadata_1).forEach(function (key) {
                            var /** @type {?} */ v = metadata_1[key];
                            if (!_.isEmpty(v)) {
                                if (_.isArray(v) && v.length === 1) {
                                    var /** @type {?} */ propDecorator_1 = _.first(v);
                                    if (_.isFunction(propDecorator_1.selector)) {
                                        if (propDecorator_1.first) {
                                            // simple ViewChild
                                            // simple ViewChild
                                            instance_1[key] = _.find(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                            instance_1[key + '2'] = _.find(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                        }
                                        else {
                                            // simple ViewChildren
                                            // simple ViewChildren
                                            instance_1[key] = _.filter(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                            instance_1[key + '2'] = _.filter(refs_1, function (ref) { return ref.constructor == propDecorator_1.selector; });
                                        }
                                    }
                                }
                                else {
                                    console.error('can\'t resolve metadata', instance_1.constructor, key, v);
                                }
                            }
                        });
                    }
                }
                return instance_1;
            }
            else {
                console.error('No view content setted');
            }
        }
        else {
            throw new NoFormTypeDefinedError(content.type);
        }
        return null;
    };
    /**
     * @param {?} content
     * @return {?}
     */
    AbstractComponent.prototype.build = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        var _this = this;
        var /** @type {?} */ refs = [];
        content.getChildren().forEach(function (contentObject) {
            var /** @type {?} */ ref = _this.buildSingle(/** @type {?} */ (contentObject));
            refs.push(ref);
        });
        return refs;
    };
    /** @nocollapse */
    AbstractComponent.ctorParameters = function () { return [
        { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
        { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
    ]; };
    AbstractComponent.propDecorators = {
        "vc": [{ type: ViewChild, args: ['content', { read: ViewContainerRef },] },],
    };
    return AbstractComponent;
}());
export { AbstractComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJsaWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFFcEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFcEUscUJBQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDOzs7Ozs7O0lBV3pDLDJCQUFxQyxVQUNnQjtRQURoQixhQUFRLEdBQVIsUUFBUTtRQUNRLE1BQUMsR0FBRCxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNsQjs7OztJQUVELHFDQUFTOzs7SUFBVDtLQUNDOzs7OztJQUVTLG1DQUFPOzs7O0lBQWpCLFVBQWtCLElBQU87UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDbEI7Ozs7O0lBR0QsdUNBQVc7Ozs7SUFBWCxVQUFZLE9BQVU7UUFHcEIscUJBQU0sTUFBTSxHQUFHLHdCQUF3QixDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUc5QixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBRVgscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQXVCLG1CQUFNLE1BQU0sQ0FBQyxTQUFTLEVBQUMsQ0FBQztnQkFDdEUscUJBQU0sT0FBTyxHQUFHLElB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RUFBRSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxhQUFhO1lBQ3pDLHFCQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsV0FBVyxtQkFBSSxhQUFhLEVBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0tBQ2I7OztnQkFqR3VDLFFBQVEsdUJBaUJuQyxNQUFNLFNBQUMsUUFBUTtnQkFqQnRCLHdCQUF3Qix1QkFrQmpCLE1BQU0sU0FBQyx3QkFBd0I7Ozt1QkFKM0MsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs7NEJBZmhEOztTQVNzQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIEluamVjdG9yLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHtOb0Zvcm1UeXBlRGVmaW5lZEVycm9yfSBmcm9tICcuLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtVHlwZURlZmluZWRFcnJvcic7XG5pbXBvcnQge1RyZWVPYmplY3R9IGZyb20gJy4vVHJlZU9iamVjdCc7XG5pbXBvcnQge0NvbnRlbnRDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi9Db250ZW50Q29tcG9uZW50UmVnaXN0cnknO1xuXG5jb25zdCBQUk9QX01FVEFEQVRBID0gJ19fcHJvcF9fbWV0YWRhdGFfXyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4ge1xuXG4gIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgZWxlbTogVDtcblxuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSB2YzogVmlld0NvbnRhaW5lclJlZjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSW5qZWN0b3IpIHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBwdWJsaWMgcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3QoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdCgpIHtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRFbGVtKGVsZW06IFQpIHtcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICB9XG5cblxuICBidWlsZFNpbmdsZShjb250ZW50OiBUKTogQWJzdHJhY3RDb21wb25lbnQ8VD4ge1xuXG5cbiAgICBjb25zdCBoYW5kbGUgPSBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkuJCgpLmdldE9yQ3JlYXRlRGVmKGNvbnRlbnQudHlwZSk7XG4gICAgaWYgKGhhbmRsZSAmJiBoYW5kbGUuY29tcG9uZW50KSB7XG5cblxuICAgICAgaWYgKHRoaXMudmMpIHtcblxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KDxhbnk+aGFuZGxlLmNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBSZWYgPSB0aGlzLnZjLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSA8QWJzdHJhY3RDb21wb25lbnQ8VD4+Y29tcFJlZi5pbnN0YW5jZTtcblxuICAgICAgICBsZXQgbWV0YWRhdGE6IHsgW2s6IHN0cmluZ106IGFueSB9ID0gbnVsbDtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KFBST1BfTUVUQURBVEEpKSB7XG4gICAgICAgICAgbWV0YWRhdGEgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcltQUk9QX01FVEFEQVRBXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3RhbmNlLnNldEVsZW0oY29udGVudCk7XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLmJ1aWxkKSB7XG4gICAgICAgICAgbGV0IHJlZnMgPSBpbnN0YW5jZS5idWlsZChjb250ZW50KTtcblxuICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgbGV0IHYgPSBtZXRhZGF0YVtrZXldO1xuICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eSh2KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheSh2KSAmJiB2Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZWNvcmF0b3IgPSBfLmZpcnN0KHYpO1xuICAgICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcERlY29yYXRvci5maXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maW5kKHJlZnMsIHJlZiA9PiByZWYuY29uc3RydWN0b3IgPT0gcHJvcERlY29yYXRvci5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5ICsgJzInXSA9IF8uZmluZChyZWZzLCByZWYgPT4gcmVmLmNvbnN0cnVjdG9yID09IHByb3BEZWNvcmF0b3Iuc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBWaWV3Q2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXkgKyAnMiddID0gXy5maWx0ZXIocmVmcywgcmVmID0+IHJlZi5jb25zdHJ1Y3RvciA9PSBwcm9wRGVjb3JhdG9yLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5cXCd0IHJlc29sdmUgbWV0YWRhdGEnLCBpbnN0YW5jZS5jb25zdHJ1Y3Rvciwga2V5LCB2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyB2aWV3IGNvbnRlbnQgc2V0dGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb0Zvcm1UeXBlRGVmaW5lZEVycm9yKGNvbnRlbnQudHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuXG4gIH1cblxuXG4gIGJ1aWxkKGNvbnRlbnQ6IFQpOiBBYnN0cmFjdENvbXBvbmVudDxUPltdIHtcbiAgICBsZXQgcmVmczogQWJzdHJhY3RDb21wb25lbnQ8VD5bXSA9IFtdO1xuICAgIGNvbnRlbnQuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGNvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgbGV0IHJlZiA9IHRoaXMuYnVpbGRTaW5nbGUoPFQ+Y29udGVudE9iamVjdCk7XG4gICAgICByZWZzLnB1c2gocmVmKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVmcztcbiAgfVxuXG59XG4iXX0=