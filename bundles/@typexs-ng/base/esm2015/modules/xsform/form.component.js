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
let FormComponent = class FormComponent extends AbstractFormComponent {
    /**
     * @param {?} formService
     * @param {?} injector
     * @param {?} r
     */
    constructor(formService, injector, r) {
        super(injector, r);
        this.formService = formService;
        this.injector = injector;
        this.r = r;
        this.ngSubmit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // TODO instance must be present
        this.data = new DataContainer(this.instance);
        this.elem = this.formService.get(this.formName, this.instance);
        // TODO restructure form
        this.build(this.elem);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSubmit($event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.data.validate();
            this.ngSubmit.emit({ event: $event, data: this.data });
            return false;
        });
    }
};
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'xform',
                templateUrl: './form.component.html',
            },] },
];
/** @nocollapse */
FormComponent.ctorParameters = () => [
    { type: FormService, decorators: [{ type: Inject, args: [FormService,] },] },
    { type: Injector, decorators: [{ type: Inject, args: [Injector,] },] },
    { type: ComponentFactoryResolver, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] },] },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHlwZXhzLW5nL2Jhc2UvIiwic291cmNlcyI6WyJtb2R1bGVzL3hzZm9ybS9mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUksT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDekUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFHOUUsSUFPYSxhQUFhLEdBUDFCLG1CQU8yQixTQUFRLHFCQUEyQjs7Ozs7O0lBWTVELFlBQXlDLGFBQ0osVUFDZ0I7UUFDbkQsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUhvQixnQkFBVyxHQUFYLFdBQVc7UUFDZixhQUFRLEdBQVIsUUFBUTtRQUNRLE1BQUMsR0FBRCxDQUFDO3dCQVgzQyxJQUFJLFlBQVksRUFBRTtLQWE1Qjs7OztJQUdELFFBQVE7O1FBR04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHL0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7Ozs7O0lBR0ssUUFBUSxDQUFDLE1BQWE7O1lBQzFCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sS0FBSyxDQUFDOztLQUNkO0NBR0YsQ0FBQTs7WUEzQ0EsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2dCQUNqQixXQUFXLEVBQUUsdUJBQXVCO2FBR3JDOzs7O1lBWE8sV0FBVyx1QkF3QkosTUFBTSxTQUFDLFdBQVc7WUExQnFELFFBQVEsdUJBMkIvRSxNQUFNLFNBQUMsUUFBUTtZQTNCUSx3QkFBd0IsdUJBNEIvQyxNQUFNLFNBQUMsd0JBQXdCOzs7eUJBWjNDLE1BQU07eUJBR04sS0FBSzt5QkFHTCxLQUFLOztBQVJLLGFBQWE7SUFQekIsYUFBYSxDQUFDLE1BQU0sQ0FBQzs2Q0FtQmtDLFdBQVc7UUFDbEIsUUFBUTtRQUNDLHdCQUF3QjtHQWRyRSxhQUFhLEVBcUN6QjtTQXJDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RvciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0YUNvbnRhaW5lcn0gZnJvbSAndHlwZXhzLXNjaGVtYS9saWJzL0RhdGFDb250YWluZXInO1xuaW1wb3J0IHtGb3JtU2VydmljZX0gZnJvbSAnLi9mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL2VsZW1lbnRzJztcblxuQFZpZXdDb21wb25lbnQoJ2Zvcm0nKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneGZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gIC8vaG9zdDogeycoc3VibWl0KSc6ICdvblN1Ym1pdCgkZXZlbnQpJywgJyhyZXNldCknOiAnb25SZXNldCgpJ30sXG4gIC8vb3V0cHV0czogWyduZ1N1Ym1pdCddLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtQ29tcG9uZW50PEZvcm0+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAT3V0cHV0KClcbiAgbmdTdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgZm9ybU5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBpbnN0YW5jZTogYW55O1xuXG5cbiAgY29uc3RydWN0b3IoQEluamVjdChGb3JtU2VydmljZSkgcHJpdmF0ZSBmb3JtU2VydmljZTogRm9ybVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoSW5qZWN0b3IpIHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBwdWJsaWMgcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgc3VwZXIoaW5qZWN0b3IsIHIpO1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIC8vIFRPRE8gaW5zdGFuY2UgbXVzdCBiZSBwcmVzZW50XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFDb250YWluZXIodGhpcy5pbnN0YW5jZSk7XG4gICAgdGhpcy5lbGVtID0gdGhpcy5mb3JtU2VydmljZS5nZXQodGhpcy5mb3JtTmFtZSwgdGhpcy5pbnN0YW5jZSk7XG5cbiAgICAvLyBUT0RPIHJlc3RydWN0dXJlIGZvcm1cbiAgICB0aGlzLmJ1aWxkKHRoaXMuZWxlbSk7XG4gIH1cblxuXG4gIGFzeW5jIG9uU3VibWl0KCRldmVudDogRXZlbnQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBhd2FpdCB0aGlzLmRhdGEudmFsaWRhdGUoKTtcbiAgICB0aGlzLm5nU3VibWl0LmVtaXQoe2V2ZW50OiRldmVudCwgZGF0YTp0aGlzLmRhdGF9KTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG59XG5cbiJdfQ==