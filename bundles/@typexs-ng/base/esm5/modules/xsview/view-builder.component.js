/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { AbstractComponent } from '../../libs/xsview/AbstractComponent';
// unsupported: template constraints.
/**
 * @template T
 */
var ViewBuilderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewBuilderComponent, _super);
    function ViewBuilderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._build = false;
        return _this;
    }
    Object.defineProperty(ViewBuilderComponent.prototype, "instance", {
        get: /**
         * @return {?}
         */
        function () {
            return this._instance;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._instance = value;
            this._build = false;
            this.__build();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewBuilderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.__build();
    };
    /**
     * @return {?}
     */
    ViewBuilderComponent.prototype.__build = /**
     * @return {?}
     */
    function () {
        if (!this._build) {
            this.vc.clear();
            this.buildSingle(this._instance);
            this._build = true;
        }
    };
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
    return ViewBuilderComponent;
}(AbstractComponent));
export { ViewBuilderComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1idWlsZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMveHN2aWV3L3ZpZXctYnVpbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7O0lBV04sZ0RBQW9COzs7dUJBRXpELEtBQUs7OzswQkFLakIsMENBQVE7Ozs7UUFNckI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O2tCQVJxQixLQUFVO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFPakIsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzs7O0lBRU8sc0NBQU87Ozs7UUFDYixJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDcEI7OztnQkFoQ0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixXQUFXLEVBQUUsK0JBQStCO2lCQUc3Qzs7Ozs2QkFRRSxLQUFLOzsrQkFwQlI7RUFhZ0UsaUJBQWlCO1NBQXBFLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJlZU9iamVjdH0gZnJvbSAnLi4vLi4vbGlicy94c3ZpZXcvVHJlZU9iamVjdCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9BYnN0cmFjdENvbXBvbmVudCc7XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZpZXctYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy8gb3V0cHV0czogWyduZ1N1Ym1pdCddLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3QnVpbGRlckNvbXBvbmVudDxUIGV4dGVuZHMgVHJlZU9iamVjdD4gZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBfYnVpbGQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgX2luc3RhbmNlOiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IHZhbHVlO1xuICAgIHRoaXMuX2J1aWxkID0gZmFsc2U7XG4gICAgdGhpcy5fX2J1aWxkKCk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9fYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX19idWlsZCgpe1xuICAgIGlmKCF0aGlzLl9idWlsZCl7XG4gICAgICB0aGlzLnZjLmNsZWFyKCk7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlKHRoaXMuX2luc3RhbmNlKTtcbiAgICAgIHRoaXMuX2J1aWxkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuIl19