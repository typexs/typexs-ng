export interface IInstanceableComponent<T> {

  getViewContext?(): string;

  setViewContext?(context: string): void;

  getInstance(): any;

  setInstance(instance: T): void;

  // getViewContainerRef(): ViewContainerRef;

}
