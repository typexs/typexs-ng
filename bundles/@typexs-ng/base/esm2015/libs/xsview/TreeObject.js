/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
export class TreeObject {
    constructor() {
        this.parent = null;
        this.children = [];
    }
    /**
     * @param {?} object
     * @return {?}
     */
    insert(object) {
        object.parent = this;
        object.index = this.children.length;
        this.children.push(object);
    }
    /**
     * @return {?}
     */
    getParent() {
        return this.parent;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    setParent(parent) {
        if (parent) {
            this.parent = parent;
            this.index = this.parent.children.indexOf(this);
        }
    }
    /**
     * @return {?}
     */
    getChildren() {
        return this.children;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0eXBleHMtbmcvYmFzZS8iLCJzb3VyY2VzIjpbImxpYnMveHN2aWV3L1RyZWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE1BQU07O3NCQVFpQixJQUFJO3dCQUVBLEVBQUU7Ozs7OztJQUUzQixNQUFNLENBQUMsTUFBa0I7UUFDdkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQWtCO1FBQzFCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGV4dH0gZnJvbSAnLi9Db250ZXh0JztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJlZU9iamVjdCB7XG5cbiAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgaW5kZXg6IG51bWJlcjtcblxuICBwYXJlbnQ6IFRyZWVPYmplY3QgPSBudWxsO1xuXG4gIGNoaWxkcmVuOiBUcmVlT2JqZWN0W10gPSBbXTtcblxuICBpbnNlcnQob2JqZWN0OiBUcmVlT2JqZWN0KSB7XG4gICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG4gICAgb2JqZWN0LmluZGV4ID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKG9iamVjdCk7XG4gIH1cblxuICBnZXRQYXJlbnQoKTogVHJlZU9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICB9XG5cbiAgc2V0UGFyZW50KHBhcmVudDogVHJlZU9iamVjdCkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgdGhpcy5pbmRleCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gIH1cbn1cbiJdfQ==