/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResolveDataValue = /** @class */ (function () {
    function ResolveDataValue(value, object, property) {
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
    ResolveDataValue.prototype.get = /**
     * @return {?}
     */
    function () {
        return this.orgValue;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    ResolveDataValue.prototype.resolve = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var /** @type {?} */ elem = form.get(this.path.join('.'));
        if (elem) {
            this.object[this.property] = elem[this.fetchKey];
            return elem[this.fetchKey];
        }
        else {
            throw new Error('cant resolve data');
        }
    };
    return ResolveDataValue;
}());
export { ResolveDataValue };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZURhdGFWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHNmb3JtL1Jlc29sdmVEYXRhVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLElBQUE7SUFZRSwwQkFBWSxLQUFhLEVBQUUsTUFBa0IsRUFBRSxRQUFnQjtvQkFSdEMsRUFBRTt3QkFFQSxJQUFJO3dCQUVKLElBQUk7c0JBRUYsSUFBSTtRQUcvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2pDOzs7O0lBRUQsOEJBQUc7OztJQUFIO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7OztJQUdELGtDQUFPOzs7O0lBQVAsVUFBUSxJQUFVO1FBQ2hCLHFCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO0tBRUY7MkJBdENIO0lBd0NDLENBQUE7QUFwQ0QsNEJBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGb3JtT2JqZWN0fSBmcm9tICcuL0Zvcm1PYmplY3QnO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL2VsZW1lbnRzL0Zvcm0nO1xuaW1wb3J0IHtJUmVzb2x2ZXJ9IGZyb20gJy4vSVJlc29sdmVyJztcblxuZXhwb3J0IGNsYXNzIFJlc29sdmVEYXRhVmFsdWUgaW1wbGVtZW50cyBJUmVzb2x2ZXIge1xuXG4gIHByaXZhdGUgb3JnVmFsdWU6IHN0cmluZztcblxuICBwcml2YXRlIHBhdGg6IHN0cmluZ1tdID0gW107XG5cbiAgcHJpdmF0ZSBmZXRjaEtleTogc3RyaW5nID0gbnVsbDtcblxuICBwcml2YXRlIHByb3BlcnR5OiBzdHJpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgb2JqZWN0OiBGb3JtT2JqZWN0ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCBvYmplY3Q6IEZvcm1PYmplY3QsIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgdGhpcy5vcmdWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL15cXCQvLCAnJyk7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5vcmdWYWx1ZS5zcGxpdCgnLicpO1xuICAgIHRoaXMuZmV0Y2hLZXkgPSB0aGlzLnBhdGgucG9wKCk7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3JnVmFsdWU7XG4gIH1cblxuXG4gIHJlc29sdmUoZm9ybTogRm9ybSkge1xuICAgIGxldCBlbGVtID0gZm9ybS5nZXQodGhpcy5wYXRoLmpvaW4oJy4nKSk7XG4gICAgaWYgKGVsZW0pIHtcbiAgICAgIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldID0gZWxlbVt0aGlzLmZldGNoS2V5XTtcbiAgICAgIHJldHVybiBlbGVtW3RoaXMuZmV0Y2hLZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbnQgcmVzb2x2ZSBkYXRhJyk7XG4gICAgfVxuXG4gIH1cblxufVxuXG4iXX0=