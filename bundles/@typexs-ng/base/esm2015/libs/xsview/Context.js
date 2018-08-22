/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from '../../libs/LoDash';
export class Context {
    constructor() {
        this.idx = -1;
    }
    /**
     * @param {?=} _name
     * @param {?=} idx
     * @return {?}
     */
    child(_name = null, idx = -1) {
        let /** @type {?} */ name = new Context();
        name.parent = this;
        name.name = _name;
        name.idx = idx;
        return name;
    }
    /**
     * @return {?}
     */
    path() {
        let /** @type {?} */ arr = [];
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
        return _.filter(arr, (x) => !_.isEmpty(x)).join('.');
    }
    /**
     * @param {?} key
     * @param {?=} _default
     * @return {?}
     */
    get(key, _default = null) {
        if (_.has(this, key)) {
            return _.get(this, key, _default);
        }
        else if (this.parent) {
            return this.parent.get(key);
        }
        return _default;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHN2aWV3L0NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLdkMsTUFBTTs7bUJBSVUsQ0FBQyxDQUFDOzs7Ozs7O0lBUWhCLEtBQUssQ0FBQyxRQUFnQixJQUFJLEVBQUUsTUFBYyxDQUFDLENBQUM7UUFDMUMscUJBQUksSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQztLQUNiOzs7O0lBR0QsSUFBSTtRQUNGLHFCQUFJLEdBQUcsR0FBYSxFQUFFLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7U0FFbEU7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCOztRQUVELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5RDs7Ozs7O0lBR0QsR0FBRyxDQUFDLEdBQVcsRUFBRSxXQUFnQixJQUFJO1FBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vLi4vbGlicy9Mb0Rhc2gnO1xuZXhwb3J0IHR5cGUgQUxJR05NRU5UID0gJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJ1xuXG5leHBvcnQgdHlwZSBMQUJFTF9ESVNQTEFZID0gJ3RvcCcgfCAnaW5saW5lJyB8ICdub25lJ1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGlkeDogbnVtYmVyID0gLTE7XG5cbiAgcGFyZW50OiBDb250ZXh0O1xuXG4gIGxhYmVsRGlzcGxheTogTEFCRUxfRElTUExBWTtcblxuICAvLyBhbGlnbm1lbnQ6XG5cbiAgY2hpbGQoX25hbWU6IHN0cmluZyA9IG51bGwsIGlkeDogbnVtYmVyID0gLTEpIHtcbiAgICBsZXQgbmFtZSA9IG5ldyBDb250ZXh0KCk7XG4gICAgbmFtZS5wYXJlbnQgPSB0aGlzO1xuICAgIG5hbWUubmFtZSA9IF9uYW1lO1xuICAgIG5hbWUuaWR4ID0gaWR4O1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cblxuICBwYXRoKCk6IHN0cmluZyB7XG4gICAgbGV0IGFycjogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGFyciA9IHRoaXMucGFyZW50LnBhdGgoKS5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlkeCA+IC0xKSB7XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gYXJyW2Fyci5sZW5ndGggLSAxXSArICdbJyArIHRoaXMuaWR4ICsgJ10nO1xuICAgICAgLy8gYXJyLnB1c2godGhpcy5uYW1lICsgJ1snICsgdGhpcy5pZHggKyAnXScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvLyAgY29uc29sZS5sb2coYXJyKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyLCAoeDogc3RyaW5nKSA9PiAhXy5pc0VtcHR5KHgpKS5qb2luKCcuJyk7XG4gIH1cblxuXG4gIGdldChrZXk6IHN0cmluZywgX2RlZmF1bHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XG4gICAgICByZXR1cm4gXy5nZXQodGhpcywga2V5LCBfZGVmYXVsdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHQ7XG4gIH1cblxufVxuIl19