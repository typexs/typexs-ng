/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, Output } from '@angular/core';
import { DataContainer } from 'typexs-schema/libs/DataContainer';
import { FormService } from './form.service';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
var FormComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormComponent, _super);
    function FormComponent(formService, injector, r) {
        var _this = _super.call(this, injector, r) || this;
        _this.formService = formService;
        _this.injector = injector;
        _this.r = r;
        _this.ngSubmit = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    FormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // TODO instance must be present
        this.data = new DataContainer(this.instance);
        this.elem = this.formService.get(this.formName, this.instance);
        // TODO restructure form
        this.build(this.elem);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormComponent.prototype.onSubmit = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.validate()];
                    case 1:
                        _a.sent();
                        this.ngSubmit.emit({ event: $event, data: this.data });
                        return [2 /*return*/, false];
                }
            });
        });
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xform',
                    templateUrl: './form.component.html',
                },] },
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = function () { return [
        { type: FormService, decorators: [{ type: Inject, args: [FormService,] },] },
        { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
        { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
    ]; };
    FormComponent.propDecorators = {
        "ngSubmit": [{ type: Output },],
        "formName": [{ type: Input },],
        "instance": [{ type: Input },],
    };
    FormComponent = tslib_1.__decorate([
        ViewComponent('form'),
        tslib_1.__metadata("design:paramtypes", [FormService,
            Injector,
            ComponentFactoryResolver])
    ], FormComponent);
    return FormComponent;
}(AbstractFormComponent));
export { FormComponent };
function FormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormComponent.propDecorators;
    /** @type {?} */
    FormComponent.prototype.ngSubmit;
    /** @type {?} */
    FormComponent.prototype.formName;
    /** @type {?} */
    FormComponent.prototype.instance;
    /** @type {?} */
    FormComponent.prototype.formService;
    /** @type {?} */
    FormComponent.prototype.injector;
    /** @type {?} */
    FormComponent.prototype.r;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJtb2R1bGVzL3hzZm9ybS9mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUksT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7O0lBVTNDLHlDQUEyQjtJQVk1RCx1QkFBeUMsYUFDSixVQUNnQjtRQUZyRCxZQUdFLGtCQUFNLFFBQVEsRUFBRSxDQUFDLENBQUMsU0FDbkI7UUFKd0MsaUJBQVcsR0FBWCxXQUFXO1FBQ2YsY0FBUSxHQUFSLFFBQVE7UUFDUSxPQUFDLEdBQUQsQ0FBQzt5QkFYM0MsSUFBSSxZQUFZLEVBQUU7O0tBYTVCOzs7O0lBR0QsZ0NBQVE7OztJQUFSOztRQUdFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBRy9ELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCOzs7OztJQUdLLGdDQUFROzs7O0lBQWQsVUFBZSxNQUFhOzs7OzRCQUMxQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBMUIsU0FBMEIsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQzt3QkFDbkQsc0JBQU8sS0FBSyxFQUFDOzs7O0tBQ2Q7O2dCQXhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLFdBQVcsRUFBRSx1QkFBdUI7aUJBR3JDOzs7O2dCQVhPLFdBQVcsdUJBd0JKLE1BQU0sU0FBQyxXQUFXO2dCQTFCcUQsUUFBUSx1QkEyQi9FLE1BQU0sU0FBQyxRQUFRO2dCQTNCUSx3QkFBd0IsdUJBNEIvQyxNQUFNLFNBQUMsd0JBQXdCOzs7NkJBWjNDLE1BQU07NkJBR04sS0FBSzs2QkFHTCxLQUFLOztJQVJLLGFBQWE7UUFQekIsYUFBYSxDQUFDLE1BQU0sQ0FBQztpREFtQmtDLFdBQVc7WUFDbEIsUUFBUTtZQUNDLHdCQUF3QjtPQWRyRSxhQUFhLEVBcUN6Qjt3QkFuREQ7RUFjbUMscUJBQXFCO1NBQTNDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdG9yLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhQ29udGFpbmVyfSBmcm9tICd0eXBleHMtc2NoZW1hL2xpYnMvRGF0YUNvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tICcuL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQge1ZpZXdDb21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHN2aWV3L2RlY29yYXRvcnMvVmlld0NvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vQWJzdHJhY3RGb3JtQ29tcG9uZW50JztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuXG5AVmlld0NvbXBvbmVudCgnZm9ybScpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd4Zm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgLy9ob3N0OiB7JyhzdWJtaXQpJzogJ29uU3VibWl0KCRldmVudCknLCAnKHJlc2V0KSc6ICdvblJlc2V0KCknfSxcbiAgLy9vdXRwdXRzOiBbJ25nU3VibWl0J10sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8Rm9ybT4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBPdXRwdXQoKVxuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBmb3JtTmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGluc3RhbmNlOiBhbnk7XG5cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1TZXJ2aWNlKSBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChJbmplY3RvcikgcHVibGljIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHB1YmxpYyByOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgLy8gVE9ETyBpbnN0YW5jZSBtdXN0IGJlIHByZXNlbnRcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YUNvbnRhaW5lcih0aGlzLmluc3RhbmNlKTtcbiAgICB0aGlzLmVsZW0gPSB0aGlzLmZvcm1TZXJ2aWNlLmdldCh0aGlzLmZvcm1OYW1lLCB0aGlzLmluc3RhbmNlKTtcblxuICAgIC8vIFRPRE8gcmVzdHJ1Y3R1cmUgZm9ybVxuICAgIHRoaXMuYnVpbGQodGhpcy5lbGVtKTtcbiAgfVxuXG5cbiAgYXN5bmMgb25TdWJtaXQoJGV2ZW50OiBFdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuZGF0YS52YWxpZGF0ZSgpO1xuICAgIHRoaXMubmdTdWJtaXQuZW1pdCh7ZXZlbnQ6JGV2ZW50LCBkYXRhOnRoaXMuZGF0YX0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbn1cblxuIl19