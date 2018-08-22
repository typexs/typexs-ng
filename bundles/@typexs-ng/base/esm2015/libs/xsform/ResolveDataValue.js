/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class ResolveDataValue {
    /**
     * @param {?} value
     * @param {?} object
     * @param {?} property
     */
    constructor(value, object, property) {
        this.path = [];
        this.fetchKey = null;
        this.property = null;
        this.object = null;
        this.property = property;
        this.object = object;
        this.orgValue = value.replace(/^\$/, '');
        this.path = this.orgValue.split('.');
        this.fetchKey = this.path.pop();
    }
    /**
     * @return {?}
     */
    get() {
        return this.orgValue;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    resolve(form) {
        let /** @type {?} */ elem = form.get(this.path.join('.'));
        if (elem) {
            this.object[this.property] = elem[this.fetchKey];
            return elem[this.fetchKey];
        }
        else {
            throw new Error('cant resolve data');
        }
    }
}
function ResolveDataValue_tsickle_Closure_declarations() {
    /** @type {?} */
    ResolveDataValue.prototype.orgValue;
    /** @type {?} */
    ResolveDataValue.prototype.path;
    /** @type {?} */
    ResolveDataValue.prototype.fetchKey;
    /** @type {?} */
    ResolveDataValue.prototype.property;
    /** @type {?} */
    ResolveDataValue.prototype.object;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZURhdGFWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHNmb3JtL1Jlc29sdmVEYXRhVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE1BQU07Ozs7OztJQVlKLFlBQVksS0FBYSxFQUFFLE1BQWtCLEVBQUUsUUFBZ0I7b0JBUnRDLEVBQUU7d0JBRUEsSUFBSTt3QkFFSixJQUFJO3NCQUVGLElBQUk7UUFHL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNqQzs7OztJQUVELEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7O0lBR0QsT0FBTyxDQUFDLElBQVU7UUFDaEIscUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEM7S0FFRjtDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGb3JtT2JqZWN0fSBmcm9tICcuL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL2VsZW1lbnRzL0Zvcm0nO1xuaW1wb3J0IHtJUmVzb2x2ZXJ9IGZyb20gJy4vSVJlc29sdmVyJztcblxuZXhwb3J0IGNsYXNzIFJlc29sdmVEYXRhVmFsdWUgaW1wbGVtZW50cyBJUmVzb2x2ZXIge1xuXG4gIHByaXZhdGUgb3JnVmFsdWU6IHN0cmluZztcblxuICBwcml2YXRlIHBhdGg6IHN0cmluZ1tdID0gW107XG5cbiAgcHJpdmF0ZSBmZXRjaEtleTogc3RyaW5nID0gbnVsbDtcblxuICBwcml2YXRlIHByb3BlcnR5OiBzdHJpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgb2JqZWN0OiBGb3JtT2JqZWN0ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCBvYmplY3Q6IEZvcm1PYmplY3QsIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgdGhpcy5vcmdWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL15cXCQvLCAnJyk7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5vcmdWYWx1ZS5zcGxpdCgnLicpO1xuICAgIHRoaXMuZmV0Y2hLZXkgPSB0aGlzLnBhdGgucG9wKCk7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3JnVmFsdWU7XG4gIH1cblxuXG4gIHJlc29sdmUoZm9ybTogRm9ybSkge1xuICAgIGxldCBlbGVtID0gZm9ybS5nZXQodGhpcy5wYXRoLmpvaW4oJy4nKSk7XG4gICAgaWYgKGVsZW0pIHtcbiAgICAgIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldID0gZWxlbVt0aGlzLmZldGNoS2V5XTtcbiAgICAgIHJldHVybiBlbGVtW3RoaXMuZmV0Y2hLZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbnQgcmVzb2x2ZSBkYXRhJyk7XG4gICAgfVxuXG4gIH1cblxufVxuXG4iXX0=