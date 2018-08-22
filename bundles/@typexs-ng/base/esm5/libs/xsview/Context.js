/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from '../../libs/LoDash';
var Context = /** @class */ (function () {
    function Context() {
        this.idx = -1;
    }
    // alignment:
    /**
     * @param {?=} _name
     * @param {?=} idx
     * @return {?}
     */
    Context.prototype.child = /**
     * @param {?=} _name
     * @param {?=} idx
     * @return {?}
     */
    function (_name, idx) {
        if (_name === void 0) { _name = null; }
        if (idx === void 0) { idx = -1; }
        var /** @type {?} */ name = new Context();
        name.parent = this;
        name.name = _name;
        name.idx = idx;
        return name;
    };
    /**
     * @return {?}
     */
    Context.prototype.path = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = [];
        if (this.parent) {
            arr = this.parent.path().split('.');
        }
        if (this.idx > -1) {
            arr[arr.length - 1] = arr[arr.length - 1] + '[' + this.idx + ']';
            // arr.push(this.name + '[' + this.idx + ']');
        }
        else {
            arr.push(this.name);
        }
        //  console.log(arr);
        return _.filter(arr, function (x) { return !_.isEmpty(x); }).join('.');
    };
    /**
     * @param {?} key
     * @param {?=} _default
     * @return {?}
     */
    Context.prototype.get = /**
     * @param {?} key
     * @param {?=} _default
     * @return {?}
     */
    function (key, _default) {
        if (_default === void 0) { _default = null; }
        if (_.has(this, key)) {
            return _.get(this, key, _default);
        }
        else if (this.parent) {
            return this.parent.get(key);
        }
        return _default;
    };
    return Context;
}());
export { Context };
function Context_tsickle_Closure_declarations() {
    /** @type {?} */
    Context.prototype.name;
    /** @type {?} */
    Context.prototype.idx;
    /** @type {?} */
    Context.prototype.parent;
    /** @type {?} */
    Context.prototype.labelDisplay;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHN2aWV3L0NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLdkMsSUFBQTs7bUJBSWdCLENBQUMsQ0FBQzs7SUFNaEIsYUFBYTs7Ozs7O0lBRWIsdUJBQUs7Ozs7O0lBQUwsVUFBTSxLQUFvQixFQUFFLEdBQWdCO1FBQXRDLHNCQUFBLEVBQUEsWUFBb0I7UUFBRSxvQkFBQSxFQUFBLE9BQWUsQ0FBQztRQUMxQyxxQkFBSSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7SUFHRCxzQkFBSTs7O0lBQUo7UUFDRSxxQkFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7O1NBRWxFO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjs7UUFFRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5RDs7Ozs7O0lBR0QscUJBQUc7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsUUFBb0I7UUFBcEIseUJBQUEsRUFBQSxlQUFvQjtRQUNuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtrQkFuREg7SUFxREMsQ0FBQTtBQS9DRCxtQkErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuZXhwb3J0IHR5cGUgQUxJR05NRU5UID0gJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJ1xuXG5leHBvcnQgdHlwZSBMQUJFTF9ESVNQTEFZID0gJ3RvcCcgfCAnaW5saW5lJyB8ICdub25lJ1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGlkeDogbnVtYmVyID0gLTE7XG5cbiAgcGFyZW50OiBDb250ZXh0O1xuXG4gIGxhYmVsRGlzcGxheTogTEFCRUxfRElTUExBWTtcblxuICAvLyBhbGlnbm1lbnQ6XG5cbiAgY2hpbGQoX25hbWU6IHN0cmluZyA9IG51bGwsIGlkeDogbnVtYmVyID0gLTEpIHtcbiAgICBsZXQgbmFtZSA9IG5ldyBDb250ZXh0KCk7XG4gICAgbmFtZS5wYXJlbnQgPSB0aGlzO1xuICAgIG5hbWUubmFtZSA9IF9uYW1lO1xuICAgIG5hbWUuaWR4ID0gaWR4O1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cblxuICBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFycjogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGFyciA9IHRoaXMucGFyZW50LnBhdGgoKS5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlkeCA+IC0xKSB7XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gYXJyW2Fyci5sZW5ndGggLSAxXSArICdbJyArIHRoaXMuaWR4ICsgJ10nO1xuICAgICAgLy8gYXJyLnB1c2godGhpcy5uYW1lICsgJ1snICsgdGhpcy5pZHggKyAnXScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvLyAgY29uc29sZS5sb2coYXJyKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiAhXy5pc0VtcHR5KHgpKS5qb2luKCcuJyk7XG4gIH1cblxuXG4gIGdldChrZXk6IHN0cmluZywgX2RlZmF1bHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XG4gICAgICByZXR1cm4gXy5nZXQodGhpcywga2V5LCBfZGVmYXVsdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHQ7XG4gIH1cblxufVxuIl19