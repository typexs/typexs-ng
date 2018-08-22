/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NoFormHandlerDefinedForTypeError } from './../../libs/exceptions/NoFormHandlerDefinedForTypeError';
import * as _ from '../../libs/LoDash';
var ContentComponentRegistry = /** @class */ (function () {
    function ContentComponentRegistry() {
        this.formHandler = [];
    }
    /**
     * @return {?}
     */
    ContentComponentRegistry.$ = /**
     * @return {?}
     */
    function () {
        if (!this.$self) {
            this.$self = new ContentComponentRegistry();
        }
        return this.$self;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.prototype.getOrCreateDef = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        var /** @type {?} */ exists = _.find(this.formHandler, { type: typeName });
        if (!exists) {
            exists = { type: typeName };
            this.formHandler.push(exists);
        }
        return exists;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.prototype.getDef = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        return _.find(this.formHandler, { type: typeName });
    };
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    ContentComponentRegistry.addHandler = /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    function (typeName, klass) {
        var /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.handler = klass;
        return def;
    };
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    ContentComponentRegistry.addComponent = /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    function (typeName, klass) {
        var /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.component = klass;
        return def;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.createHandler = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        var /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.handler) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        var /** @type {?} */ obj = Reflect.construct(handler.handler, []);
        obj.type = typeName;
        return obj;
    };
    /**
     * @param {?} typeName
     * @return {?}
     */
    ContentComponentRegistry.createComponent = /**
     * @param {?} typeName
     * @return {?}
     */
    function (typeName) {
        var /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.component) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        var /** @type {?} */ obj = Reflect.construct(handler.component, []);
        obj.type = typeName;
        return obj;
    };
    ContentComponentRegistry.$self = null;
    return ContentComponentRegistry;
}());
export { ContentComponentRegistry };
function ContentComponentRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    ContentComponentRegistry.$self;
    /** @type {?} */
    ContentComponentRegistry.prototype.formHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibGlicy94c3ZpZXcvQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUUxRyxPQUFPLEtBQUssQ0FBQyxNQUFNLG1CQUFtQixDQUFDOzs7MkJBTUEsRUFBRTs7Ozs7SUFLaEMsMEJBQUM7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0JBQXdCLEVBQUUsQ0FBQztTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7Ozs7SUFFRCxpREFBYzs7OztJQUFkLFVBQWUsUUFBZ0I7UUFDN0IscUJBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNmOzs7OztJQUVELHlDQUFNOzs7O0lBQU4sVUFBTyxRQUFnQjtRQUNyQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7Ozs7SUFFTSxtQ0FBVTs7Ozs7SUFBakIsVUFBa0IsUUFBZ0IsRUFBRSxLQUFlO1FBQ2pELHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7Ozs7OztJQUdNLHFDQUFZOzs7OztJQUFuQixVQUFvQixRQUFnQixFQUFFLEtBQWU7UUFDbkQscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFTSxzQ0FBYTs7OztJQUFwQixVQUFxQixRQUFnQjtRQUNuQyxxQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNoQyxNQUFNLElBQUksZ0NBQWdDLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxxQkFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7Ozs7O0lBRU0sd0NBQWU7Ozs7SUFBdEIsVUFBdUIsUUFBZ0I7UUFDckMscUJBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDbEMsTUFBTSxJQUFJLGdDQUFnQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QscUJBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNwQixPQUFPLEdBQUcsQ0FBQztLQUNaO3FDQTFEZ0QsSUFBSTttQ0FOdkQ7O1NBSWEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcn0gZnJvbSAnLi8uLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3InO1xuaW1wb3J0IHtJRWxlbWVudERlZn0gZnJvbSAnLi9JRWxlbWVudERlZic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgJHNlbGY6IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JtSGFuZGxlcjogSUVsZW1lbnREZWZbXSA9IFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBzdGF0aWMgJCgpOiBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkge1xuICAgIGlmICghdGhpcy4kc2VsZikge1xuICAgICAgdGhpcy4kc2VsZiA9IG5ldyBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHNlbGY7XG4gIH1cblxuICBnZXRPckNyZWF0ZURlZih0eXBlTmFtZTogc3RyaW5nKTogSUVsZW1lbnREZWYge1xuICAgIGxldCBleGlzdHMgPSBfLmZpbmQodGhpcy5mb3JtSGFuZGxlciwge3R5cGU6IHR5cGVOYW1lfSk7XG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIGV4aXN0cyA9IHt0eXBlOiB0eXBlTmFtZX07XG4gICAgICB0aGlzLmZvcm1IYW5kbGVyLnB1c2goZXhpc3RzKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0cztcbiAgfVxuXG4gIGdldERlZih0eXBlTmFtZTogc3RyaW5nKTogSUVsZW1lbnREZWYge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5mb3JtSGFuZGxlciwge3R5cGU6IHR5cGVOYW1lfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkSGFuZGxlcih0eXBlTmFtZTogc3RyaW5nLCBrbGFzczogRnVuY3Rpb24pIHtcbiAgICBsZXQgZGVmID0gdGhpcy4kKCkuZ2V0T3JDcmVhdGVEZWYodHlwZU5hbWUpO1xuICAgIGRlZi5oYW5kbGVyID0ga2xhc3M7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG5cbiAgc3RhdGljIGFkZENvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nLCBrbGFzczogRnVuY3Rpb24pIHtcbiAgICBsZXQgZGVmID0gdGhpcy4kKCkuZ2V0T3JDcmVhdGVEZWYodHlwZU5hbWUpO1xuICAgIGRlZi5jb21wb25lbnQgPSBrbGFzcztcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUhhbmRsZXIodHlwZU5hbWU6IHN0cmluZykge1xuICAgIGxldCBoYW5kbGVyID0gdGhpcy4kKCkuZ2V0T3JDcmVhdGVEZWYodHlwZU5hbWUpO1xuICAgIGlmICghaGFuZGxlciB8fCAhaGFuZGxlci5oYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3IodHlwZU5hbWUpO1xuICAgIH1cbiAgICBsZXQgb2JqID0gUmVmbGVjdC5jb25zdHJ1Y3QoaGFuZGxlci5oYW5kbGVyLCBbXSk7XG4gICAgb2JqLnR5cGUgPSB0eXBlTmFtZTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUNvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgaWYgKCFoYW5kbGVyIHx8ICFoYW5kbGVyLmNvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IE5vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yKHR5cGVOYW1lKTtcbiAgICB9XG4gICAgbGV0IG9iaiA9IFJlZmxlY3QuY29uc3RydWN0KGhhbmRsZXIuY29tcG9uZW50LCBbXSk7XG4gICAgb2JqLnR5cGUgPSB0eXBlTmFtZTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbn1cblxuIl19