/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NavEntry } from "./NavEntry";
var NavigatorComponent = /** @class */ (function () {
    function NavigatorComponent(router) {
        this.routes = [];
        try {
            for (var _a = tslib_1.__values(router.config), _b = _a.next(); !_b.done; _b = _a.next()) {
                var route = _b.value;
                var /** @type {?} */ entry = new NavEntry();
                entry.label = route.data["label"];
                entry.path = route.path;
                this.routes.push(entry);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // console.log(this.routes)
        var e_1, _c;
    }
    NavigatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nav-root',
                    templateUrl: './navigator.component.html',
                },] },
    ];
    /** @nocollapse */
    NavigatorComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return NavigatorComponent;
}());
export { NavigatorComponent };
function NavigatorComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NavigatorComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NavigatorComponent.ctorParameters;
    /** @type {?} */
    NavigatorComponent.prototype.routes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmF2aWdhdG9yL25hdmlnYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFDOztJQVVsQyw0QkFBWSxNQUFjO3NCQUZMLEVBQUU7O1lBSXJCLEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsTUFBTSxDQUFBLGdCQUFBO2dCQUExQixJQUFJLEtBQUssV0FBQTtnQkFDWixxQkFBSSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxTQUFNLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7Ozs7Ozs7Ozs7O0tBRUY7O2dCQWpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFdBQVcsRUFBRSw0QkFBNEI7aUJBQzFDOzs7O2dCQVBPLE1BQU07OzZCQURkOztTQVNhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7TmF2RW50cnl9IGZyb20gXCIuL05hdkVudHJ5XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25hdi1yb290JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvckNvbXBvbmVudCB7XG5cbiAgcm91dGVzOiBOYXZFbnRyeVtdID0gW11cblxuICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgZm9yIChsZXQgcm91dGUgb2Ygcm91dGVyLmNvbmZpZykge1xuICAgICAgbGV0IGVudHJ5ID0gbmV3IE5hdkVudHJ5KCk7XG4gICAgICBlbnRyeS5sYWJlbCA9IHJvdXRlLmRhdGEubGFiZWw7XG4gICAgICBlbnRyeS5wYXRoID0gcm91dGUucGF0aDtcbiAgICAgIHRoaXMucm91dGVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvdXRlcylcbiAgfVxufVxuIl19