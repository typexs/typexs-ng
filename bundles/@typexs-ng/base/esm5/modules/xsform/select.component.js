/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as _ from '../../libs/LoDash';
import { Observable } from 'rxjs/Observable';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { ViewComponent } from '../../libs/xsview/decorators/ViewComponent';
var Option = /** @class */ (function () {
    function Option() {
        this.value = '';
        this.label = '---';
    }
    return Option;
}());
export { Option };
function Option_tsickle_Closure_declarations() {
    /** @type {?} */
    Option.prototype.value;
    /** @type {?} */
    Option.prototype.label;
    /** @type {?} */
    Option.prototype.default;
}
var SelectComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SelectComponent, _super);
    function SelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cachedOptions = [];
        return _this;
    }
    Object.defineProperty(SelectComponent.prototype, "supportsMultiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elem.getBinding().isCollection();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.cachedOptions = [];
        this.loadOptions();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.loadOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ enums = this.retrieveEnum();
        if (enums) {
            if (enums instanceof Observable) {
                enums.subscribe(function (e) {
                    var /** @type {?} */ o = new Option();
                    if (_.isString(e)) {
                        o.label = o.value = e;
                    }
                    else if (_.has(e, 'label') || _.has(e, 'value')) {
                        o.label = _.get(e, 'label', _.get(e, 'value'));
                        o.value = _.get(e, 'value', _.get(e, 'label'));
                    }
                    else {
                        throw new Error('not found');
                    }
                    _this.cachedOptions.push(o);
                });
            }
            else {
                enums.forEach(function (e) {
                    var /** @type {?} */ o = new Option();
                    if (_.isString(e)) {
                        o.label = o.value = e;
                    }
                    else if (_.has(e, 'label') || _.has(e, 'value')) {
                        o.label = _.get(e, 'label', _.get(e, 'value'));
                        o.value = _.get(e, 'value', _.get(e, 'label'));
                    }
                    else {
                        throw new Error('not found');
                    }
                    _this.cachedOptions.push(o);
                });
            }
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.retrieveEnum = /**
     * @return {?}
     */
    function () {
        if (_.isArray(this.elem.enum)) {
            return this.elem.enum;
        }
        else if (_.isFunction(this.elem.enum)) {
            return this.injector.get(this.elem.enum).get(this.name);
        }
        else if (_.isString(this.elem.enum)) {
            // check if an entry with the propertyname exists
            var /** @type {?} */ lookupPath = [];
            if (this.context.parent) {
                lookupPath.push(this.context.parent.path());
            }
            lookupPath.push(this.elem.enum);
            lookupPath = (/** @type {?} */ (lookupPath)).join('.');
            if (_.has(this.data.instance, lookupPath)) {
                // TODO observe if property is changed, if it does then reset enum
                return _.get(this.data.instance, lookupPath, []);
            }
            else {
                throw new Error('not found enum reference');
            }
        }
        return [];
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'xselect',
                    templateUrl: './select.component.html',
                },] },
    ];
    SelectComponent = tslib_1.__decorate([
        ViewComponent('select')
    ], SelectComponent);
    return SelectComponent;
}(AbstractFormComponent));
export { SelectComponent };
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectComponent.ctorParameters;
    /** @type {?} */
    SelectComponent.prototype.cachedOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMveHNmb3JtL3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRTlFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUV6RSxJQUFBOztxQkFDa0IsRUFBRTtxQkFDRixLQUFLOztpQkFWdkI7SUFZQyxDQUFBO0FBSkQsa0JBSUM7Ozs7Ozs7Ozs7SUFPb0MsMkNBQTZCOzs7OEJBRXRDLEVBQUU7OztJQUc1QixzQkFBSSw2Q0FBZ0I7Ozs7UUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDOUM7OztPQUFBOzs7O0lBRUQsa0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BCOzs7O0lBRUQscUNBQVc7OztJQUFYO1FBQUEsaUJBZ0NDO1FBL0JDLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFaEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7Z0JBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO29CQUNmLHFCQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsQ0FBQyxRQUFRLENB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QUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQixVQUFVLEdBQUcsbUJBQVcsVUFBVSxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBRTs7Z0JBRXpDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztLQUNYOztnQkEzRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixXQUFXLEVBQUUseUJBQXlCO2lCQUN2Qzs7SUFDWSxlQUFlO1FBTDNCLGFBQWEsQ0FBQyxRQUFRLENBQUM7T0FLWCxlQUFlLEVBd0UzQjswQkEzRkQ7RUFtQnFDLHFCQUFxQjtTQUE3QyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtBYnN0cmFjdEZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2xpYnMveHNmb3JtL0Fic3RyYWN0Rm9ybUNvbXBvbmVudCc7XG5pbXBvcnQge1NlbGVjdH0gZnJvbSAnLi4vLi4vbGlicy94c2Zvcm0vZWxlbWVudHMnO1xuaW1wb3J0IHtWaWV3Q29tcG9uZW50fSBmcm9tICcuLi8uLi9saWJzL3hzdmlldy9kZWNvcmF0b3JzL1ZpZXdDb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgT3B0aW9uIHtcbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuICBsYWJlbDogc3RyaW5nID0gJy0tLSc7XG4gIGRlZmF1bHQ6IGJvb2xlYW47XG59XG5cbkBWaWV3Q29tcG9uZW50KCdzZWxlY3QnKVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneHNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1Db21wb25lbnQ8U2VsZWN0PiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY2FjaGVkT3B0aW9uczogT3B0aW9uW10gPSBbXTtcblxuXG4gIGdldCBzdXBwb3J0c011bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVsZW0uZ2V0QmluZGluZygpLmlzQ29sbGVjdGlvbigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jYWNoZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5sb2FkT3B0aW9ucygpO1xuICB9XG5cbiAgbG9hZE9wdGlvbnMoKSB7XG4gICAgbGV0IGVudW1zID0gdGhpcy5yZXRyaWV2ZUVudW0oKTtcblxuICAgIGlmIChlbnVtcykge1xuICAgICAgaWYgKGVudW1zIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICBlbnVtcy5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgbGV0IG8gPSBuZXcgT3B0aW9uKCk7XG4gICAgICAgICAgaWYgKF8uaXNTdHJpbmcoZSkpIHtcbiAgICAgICAgICAgIG8ubGFiZWwgPSBvLnZhbHVlID0gZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKF8uaGFzKGUsICdsYWJlbCcpIHx8IF8uaGFzKGUsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBvLmxhYmVsID0gXy5nZXQoZSwgJ2xhYmVsJywgXy5nZXQoZSwgJ3ZhbHVlJykpO1xuICAgICAgICAgICAgby52YWx1ZSA9IF8uZ2V0KGUsICd2YWx1ZScsIF8uZ2V0KGUsICdsYWJlbCcpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZm91bmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYWNoZWRPcHRpb25zLnB1c2gobyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW51bXMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24oKTtcbiAgICAgICAgICBpZiAoXy5pc1N0cmluZyhlKSkge1xuICAgICAgICAgICAgby5sYWJlbCA9IG8udmFsdWUgPSBlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXy5oYXMoZSwgJ2xhYmVsJykgfHwgXy5oYXMoZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIG8ubGFiZWwgPSBfLmdldChlLCAnbGFiZWwnLCBfLmdldChlLCAndmFsdWUnKSk7XG4gICAgICAgICAgICBvLnZhbHVlID0gXy5nZXQoZSwgJ3ZhbHVlJywgXy5nZXQoZSwgJ2xhYmVsJykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhY2hlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICByZXRyaWV2ZUVudW0oKTogYW55W10ge1xuICAgIGlmIChfLmlzQXJyYXkodGhpcy5lbGVtLmVudW0pKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtLmVudW07XG4gICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24odGhpcy5lbGVtLmVudW0pKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQodGhpcy5lbGVtLmVudW0pLmdldCh0aGlzLm5hbWUpO1xuICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyh0aGlzLmVsZW0uZW51bSkpIHtcbiAgICAgIC8vIGNoZWNrIGlmIGFuIGVudHJ5IHdpdGggdGhlIHByb3BlcnR5bmFtZSBleGlzdHNcbiAgICAgIGxldCBsb29rdXBQYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xuICAgICAgaWYgKHRoaXMuY29udGV4dC5wYXJlbnQpIHtcbiAgICAgICAgbG9va3VwUGF0aC5wdXNoKHRoaXMuY29udGV4dC5wYXJlbnQucGF0aCgpKTtcbiAgICAgIH1cbiAgICAgIGxvb2t1cFBhdGgucHVzaCh0aGlzLmVsZW0uZW51bSlcbiAgICAgIGxvb2t1cFBhdGggPSAoPHN0cmluZ1tdPmxvb2t1cFBhdGgpLmpvaW4oJy4nKTtcblxuICAgICAgaWYgKF8uaGFzKHRoaXMuZGF0YS5pbnN0YW5jZSwgbG9va3VwUGF0aCkpIHtcbiAgICAgICAgLy8gVE9ETyBvYnNlcnZlIGlmIHByb3BlcnR5IGlzIGNoYW5nZWQsIGlmIGl0IGRvZXMgdGhlbiByZXNldCBlbnVtXG4gICAgICAgIHJldHVybiBfLmdldCh0aGlzLmRhdGEuaW5zdGFuY2UsIGxvb2t1cFBhdGgsIFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGZvdW5kIGVudW0gcmVmZXJlbmNlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19