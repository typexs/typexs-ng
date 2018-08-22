/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
TreeObject = /** @class */ (function () {
    function TreeObject() {
        this.parent = null;
        this.children = [];
    }
    /**
     * @param {?} object
     * @return {?}
     */
    TreeObject.prototype.insert = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        object.parent = this;
        object.index = this.children.length;
        this.children.push(object);
    };
    /**
     * @return {?}
     */
    TreeObject.prototype.getParent = /**
     * @return {?}
     */
    function () {
        return this.parent;
    };
    /**
     * @param {?} parent
     * @return {?}
     */
    TreeObject.prototype.setParent = /**
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        if (parent) {
            this.parent = parent;
            this.index = this.parent.children.indexOf(this);
        }
    };
    /**
     * @return {?}
     */
    TreeObject.prototype.getChildren = /**
     * @return {?}
     */
    function () {
        return this.children;
    };
    return TreeObject;
}());
/**
 * @abstract
 */
export { TreeObject };
function TreeObject_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeObject.prototype.type;
    /** @type {?} */
    TreeObject.prototype.context;
    /** @type {?} */
    TreeObject.prototype.index;
    /** @type {?} */
    TreeObject.prototype.parent;
    /** @type {?} */
    TreeObject.prototype.children;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHN2aWV3L1RyZWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7QUFBQTs7c0JBUXVCLElBQUk7d0JBRUEsRUFBRTs7Ozs7O0lBRTNCLDJCQUFNOzs7O0lBQU4sVUFBTyxNQUFrQjtRQUN2QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCOzs7O0lBRUQsOEJBQVM7OztJQUFUO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7OztJQUVELDhCQUFTOzs7O0lBQVQsVUFBVSxNQUFrQjtRQUMxQixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO0tBQ0Y7Ozs7SUFFRCxnQ0FBVzs7O0lBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7cUJBbENIO0lBbUNDLENBQUE7Ozs7QUFoQ0Qsc0JBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmVlT2JqZWN0IHtcblxuICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogQ29udGV4dDtcblxuICBpbmRleDogbnVtYmVyO1xuXG4gIHBhcmVudDogVHJlZU9iamVjdCA9IG51bGw7XG5cbiAgY2hpbGRyZW46IFRyZWVPYmplY3RbXSA9IFtdO1xuXG4gIGluc2VydChvYmplY3Q6IFRyZWVPYmplY3QpIHtcbiAgICBvYmplY3QucGFyZW50ID0gdGhpcztcbiAgICBvYmplY3QuaW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcbiAgfVxuXG4gIGdldFBhcmVudCgpOiBUcmVlT2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICBzZXRQYXJlbnQocGFyZW50OiBUcmVlT2JqZWN0KSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgfVxufVxuIl19