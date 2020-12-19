import {ViewContainerRef} from '@angular/core';

export interface IInstanceableComponent<T> {

  getViewContext?(): string;

  getInstance(): any;

  setInstance(instance: T): void;

  // getViewContainerRef(): ViewContainerRef;

}
