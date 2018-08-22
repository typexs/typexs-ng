/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NoFormHandlerDefinedForTypeError } from './../../libs/exceptions/NoFormHandlerDefinedForTypeError';
import * as _ from '../../libs/LoDash';
export class ContentComponentRegistry {
    constructor() {
        this.formHandler = [];
    }
    /**
     * @return {?}
     */
    static $() {
        if (!this.$self) {
            this.$self = new ContentComponentRegistry();
        }
        return this.$self;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    getOrCreateDef(typeName) {
        let /** @type {?} */ exists = _.find(this.formHandler, { type: typeName });
        if (!exists) {
            exists = { type: typeName };
            this.formHandler.push(exists);
        }
        return exists;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    getDef(typeName) {
        return _.find(this.formHandler, { type: typeName });
    }
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    static addHandler(typeName, klass) {
        let /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.handler = klass;
        return def;
    }
    /**
     * @param {?} typeName
     * @param {?} klass
     * @return {?}
     */
    static addComponent(typeName, klass) {
        let /** @type {?} */ def = this.$().getOrCreateDef(typeName);
        def.component = klass;
        return def;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    static createHandler(typeName) {
        let /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.handler) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        let /** @type {?} */ obj = Reflect.construct(handler.handler, []);
        obj.type = typeName;
        return obj;
    }
    /**
     * @param {?} typeName
     * @return {?}
     */
    static createComponent(typeName) {
        let /** @type {?} */ handler = this.$().getOrCreateDef(typeName);
        if (!handler || !handler.component) {
            throw new NoFormHandlerDefinedForTypeError(typeName);
        }
        let /** @type {?} */ obj = Reflect.construct(handler.component, []);
        obj.type = typeName;
        return obj;
    }
}
ContentComponentRegistry.$self = null;
function ContentComponentRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    ContentComponentRegistry.$self;
    /** @type {?} */
    ContentComponentRegistry.prototype.formHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR5cGV4cy1uZy9iYXNlLyIsInNvdXJjZXMiOlsibGlicy94c3ZpZXcvQ29udGVudENvbXBvbmVudFJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUUxRyxPQUFPLEtBQUssQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXZDLE1BQU07OzJCQUlpQyxFQUFFOzs7OztJQUt2QyxNQUFNLENBQUMsQ0FBQztRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQWdCO1FBQzdCLHFCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDZjs7Ozs7SUFFRCxNQUFNLENBQUMsUUFBZ0I7UUFDckIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztLQUNuRDs7Ozs7O0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFnQixFQUFFLEtBQWU7UUFDakQscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7O0lBR0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFnQixFQUFFLEtBQWU7UUFDbkQscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQWdCO1FBQ25DLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxnQ0FBZ0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0RDtRQUNELHFCQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWdCO1FBQ3JDLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxnQ0FBZ0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0RDtRQUNELHFCQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUM7S0FDWjs7aUNBMURnRCxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOb0Zvcm1IYW5kbGVyRGVmaW5lZEZvclR5cGVFcnJvcn0gZnJvbSAnLi8uLi8uLi9saWJzL2V4Y2VwdGlvbnMvTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3InO1xuaW1wb3J0IHtJRWxlbWVudERlZn0gZnJvbSAnLi9JRWxlbWVudERlZic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uLy4uL2xpYnMvTG9EYXNoJztcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgJHNlbGY6IENvbnRlbnRDb21wb25lbnRSZWdpc3RyeSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JtSGFuZGxlcjogSUVsZW1lbnREZWZbXSA9IFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBzdGF0aWMgJCgpOiBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkge1xuICAgIGlmICghdGhpcy4kc2VsZikge1xuICAgICAgdGhpcy4kc2VsZiA9IG5ldyBDb250ZW50Q29tcG9uZW50UmVnaXN0cnkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHNlbGY7XG4gIH1cblxuICBnZXRPckNyZWF0ZURlZih0eXBlTmFtZTogc3RyaW5nKTogSUVsZW1lbnREZWYge1xuICAgIGxldCBleGlzdHMgPSBfLmZpbmQodGhpcy5mb3JtSGFuZGxlciwge3R5cGU6IHR5cGVOYW1lfSk7XG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIGV4aXN0cyA9IHt0eXBlOiB0eXBlTmFtZX07XG4gICAgICB0aGlzLmZvcm1IYW5kbGVyLnB1c2goZXhpc3RzKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0cztcbiAgfVxuXG4gIGdldERlZih0eXBlTmFtZTogc3RyaW5nKTogSUVsZW1lbnREZWYge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5mb3JtSGFuZGxlciwge3R5cGU6IHR5cGVOYW1lfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkSGFuZGxlcih0eXBlTmFtZTogc3RyaW5nLCBrbGFzczogRnVuY3Rpb24pIHtcbiAgICBsZXQgZGVmID0gdGhpcy4kKCkuZ2V0T3JDcmVhdGVEZWYodHlwZU5hbWUpO1xuICAgIGRlZi5oYW5kbGVyID0ga2xhc3M7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG5cbiAgc3RhdGljIGFkZENvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nLCBrbGFzczogRnVuY3Rpb24pIHtcbiAgICBsZXQgZGVmID0gdGhpcy4kKCkuZ2V0T3JDcmVhdGVEZWYodHlwZU5hbWUpO1xuICAgIGRlZi5jb21wb25lbnQgPSBrbGFzcztcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUhhbmRsZXIodHlwZU5hbWU6IHN0cmluZykge1xuICAgIGxldCBoYW5kbGVyID0gdGhpcy4kKCkuZ2V0T3JDcmVhdGVEZWYodHlwZU5hbWUpO1xuICAgIGlmICghaGFuZGxlciB8fCAhaGFuZGxlci5oYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgTm9Gb3JtSGFuZGxlckRlZmluZWRGb3JUeXBlRXJyb3IodHlwZU5hbWUpO1xuICAgIH1cbiAgICBsZXQgb2JqID0gUmVmbGVjdC5jb25zdHJ1Y3QoaGFuZGxlci5oYW5kbGVyLCBbXSk7XG4gICAgb2JqLnR5cGUgPSB0eXBlTmFtZTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUNvbXBvbmVudCh0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLiQoKS5nZXRPckNyZWF0ZURlZih0eXBlTmFtZSk7XG4gICAgaWYgKCFoYW5kbGVyIHx8ICFoYW5kbGVyLmNvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IE5vRm9ybUhhbmRsZXJEZWZpbmVkRm9yVHlwZUVycm9yKHR5cGVOYW1lKTtcbiAgICB9XG4gICAgbGV0IG9iaiA9IFJlZmxlY3QuY29uc3RydWN0KGhhbmRsZXIuY29tcG9uZW50LCBbXSk7XG4gICAgb2JqLnR5cGUgPSB0eXBlTmFtZTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbn1cblxuIl19