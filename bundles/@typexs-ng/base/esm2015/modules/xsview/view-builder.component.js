/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AbstractComponent } from '../../libs/xsview/AbstractComponent';
// unsupported: template constraints.
/**
 * @template T
 */
export class ViewBuilderComponent extends AbstractComponent {
    constructor() {
        super(...arguments);
        this._build = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set instance(value) {
        this._instance = value;
        this._build = false;
        this.__build();
    }
    /**
     * @return {?}
     */
    get instance() {
        return this._instance;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.__build();
    }
    /**
     * @return {?}
     */
    __build() {
        if (!this._build) {
            this.vc.clear();
            this.buildSingle(this._instance);
            this._build = true;
        }
    }
}
ViewBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'view-builder',
                templateUrl: './view-builder.component.html',
            },] },
];
/** @nocollapse */
ViewBuilderComponent.propDecorators = {
    "instance": [{ type: Input },],
};
function ViewBuilderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ViewBuilderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ViewBuilderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ViewBuilderComponent.propDecorators;
    /** @type {?} */
    ViewBuilderComponent.prototype._build;
    /** @type {?} */
    ViewBuilderComponent.prototype._instance;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1idWlsZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMveHN2aWV3L3ZpZXctYnVpbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOzs7OztBQVd0RSxNQUFNLDJCQUFrRCxTQUFRLGlCQUFvQjs7O3NCQUV6RCxLQUFLOzs7Ozs7UUFLakIsUUFBUSxDQUFDLEtBQVU7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7OztJQUdqQixJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzs7O0lBRU8sT0FBTztRQUNiLElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNwQjs7OztZQWhDSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7YUFHN0M7Ozs7eUJBUUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZU9iamVjdH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvVHJlZU9iamVjdCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudCc7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZpZXctYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy8gb3V0cHV0czogWyduZ1N1Ym1pdCddLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3QnVpbGRlckNvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBfYnVpbGQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgX2luc3RhbmNlOiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IHZhbHVlO1xuICAgIHRoaXMuX2J1aWxkID0gZmFsc2U7XG4gICAgdGhpcy5fX2J1aWxkKCk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9fYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19idWlsZCgpe1xuICAgIGlmKCF0aGlzLl9idWlsZCl7XG4gICAgICB0aGlzLnZjLmNsZWFyKCk7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlKHRoaXMuX2luc3RhbmNlKTtcbiAgICAgIHRoaXMuX2J1aWxkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuIl19